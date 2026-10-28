---
title: "DDPM Experiments: Forward Diffusion and Reverse Transition Kernel"
description: "Mathematical formulations, code explanations, and visual experiments exploring forward stochastic corruption and the reverse Gaussian posterior transition kernel in DDPMs."
date: "2026-03-24"
readTime: "9 min read"
category: "Diffusion Models"
---

These notes document two foundational experiments exploring the mechanics of Denoising Diffusion Probabilistic Models (DDPMs). Each section walks through the complete implementation code, the underlying probability theory, and the visual state transitions produced by the experiment.

> **Scope:** These are mathematical and implementation experiments. The reverse transition experiment uses the original clean image $x_0$ to calculate the tractable Gaussian posterior $q(x_{t-1} \mid x_t, x_0)$, rather than a trained neural network predicting noise $\epsilon_\theta(x_t, t)$.

---

## Experiment 1 — Forward Diffusion Process

The forward diffusion process progressively transforms a clean data sample into isotropic Gaussian noise through a discrete Markov chain.

### 1. Imports

```python
import numpy as np
import matplotlib.pyplot as plt
```

- `numpy` creates and updates the image arrays and samples Gaussian noise perturbations.
- `matplotlib.pyplot` visualizes the image states at designated diffusion steps.

**Concept:** In this experiment, an image is represented as a 2D array of pixel values. Independent identically distributed (i.i.d.) Gaussian noise is sampled for each pixel at every discrete transition.

### 2. Create a Synthetic Image

```python
# Image dimensions
H, W = 64, 64

# Background = -1 (black), foreground = +1 (white)
x0 = -np.ones((H, W), dtype=np.float32)

# Draw a high-contrast letter "T"
x0[10:54, 30:34] = 1.0  # Vertical stroke
x0[10:14, 18:46] = 1.0  # Top horizontal bar
```

- `H, W = 64, 64` defines a compact $64 \times 64$ single-channel canvas.
- `-np.ones(...)` initializes every pixel to $-1$, establishing a uniform dark background under the chosen display dynamic range.
- Array slicing sets the intersecting vertical and horizontal strokes to $+1.0$ (white).
- `float32` provides floating-point numerical stability across repeated multiplications.

**Concept:** A synthetic binary image with sharp, recognizable geometric boundaries allows us to inspect precisely how noise corruption degrades structural spatial coherence across timesteps.

### 3. Define the Noise Schedule

```python
T = 100  # Total diffusion steps

# Variance parameter beta_i in (0, 1)
beta = np.linspace(0.01, 0.30, T).astype(np.float32)

# Signal retention coefficient
alpha = np.sqrt(1.0 - beta**2).astype(np.float32)
```

- `T = 100` establishes a 100-step discretization of the diffusion trajectory.
- `beta` linearly scales from $0.01$ up to $0.30$, so later transitions inject progressively larger perturbations.
- `alpha` determines the scaling factor applied to the previous image state $x_{t-1}$.

**Signal vs. Noise Trade-off:** At each step, the existing state contributes scaled signal, while an independent Gaussian term contributes noise. As $\beta_t$ increases, later transitions destroy residual high-frequency features more aggressively.

**Parameterization Note:** In standard DDPM literature (Ho et al., 2020), $\beta_t$ represents the variance schedule directly with $\alpha_t = 1 - \beta_t$, yielding the forward transition:

$$q(x_t \mid x_{t-1}) = \mathcal{N}\left(\sqrt{\alpha_t} x_{t-1}, \, \beta_t I\right)$$

This notebook experiment parameterizes $\alpha_t = \sqrt{1 - \beta_t^2}$ such that $\alpha_t^2 + \beta_t^2 = 1$, preserving variance under independent addition: $x_t = \alpha_t x_{t-1} + \beta_t z_t$.

### 4. Apply the Forward Markov Transitions

```python
xt = x0.copy()
snapshot = {0: xt.copy()}

keep_steps = [1, 5, 10, 20, 40, 60, 80, 100]

for i in range(1, T + 1):
    b = beta[i - 1]
    a = alpha[i - 1]

    z = np.random.randn(H, W).astype(np.float32)  # z_i ~ N(0, I)
    xt = a * xt + b * z  # Forward Markov step

    if i in keep_steps:
        snapshot[i] = xt.copy()
```

- `snapshot[0]` records the pristine ground truth prior to corruption.
- `keep_steps` selects logarithmically spaced checkpoints across the trajectory.
- `np.random.randn(H, W)` samples an independent standard normal tensor $z_t \sim \mathcal{N}(0, I)$.
- `xt = a * xt + b * z` computes the forward Markov transition:

$$x_t = a_t x_{t-1} + b_t z_t, \qquad z_t \sim \mathcal{N}(0, I)$$

**Markov Property:** The state $x_t$ depends exclusively on the immediately preceding state $x_{t-1}$ and fresh stochastic noise $z_t$, requiring no memory of earlier states $x_{0}, \dots, x_{t-2}$.

### 5. Visualize the Snapshots

```python
steps = sorted(snapshot.keys())

plt.figure(figsize=(2.2 * len(steps), 2.2))
for k, t in enumerate(steps):
    ax = plt.subplot(1, len(steps), k + 1)
    ax.imshow(np.clip(snapshot[t], -1, 1), cmap="gray", vmin=-1, vmax=1)
    ax.set_title(f"t={t}")
    ax.axis("off")

plt.tight_layout()
plt.show()
```

![Forward diffusion snapshots](/images/notes/ddpm/forward_diffusion_snapshots.png)

**Key Observations:**
- **$t = 0$ to $t = 5$:** High-contrast shape contours remain intact; minor Gaussian grain emerges in background pixels.
- **$t = 10$ to $t = 40$:** Edge definitions dissolve as signal-to-noise ratio drops; the topological presence of the "T" degrades into a diffuse cloud.
- **$t = 80$ to $t = 100$:** All structural semantics are completely erased; the field converges to isotropic Gaussian noise.

---

## Experiment 2 — Reverse Transition Kernel

While the forward process unconditionally adds noise, the reverse process seeks to reconstruct earlier states. When the clean image $x_0$ is known, Bayes' rule yields a closed-form Gaussian posterior $q(x_{t-1} \mid x_t, x_0)$.

### 1. Imports and Load an MNIST Digit

```python
import torch
import torch.nn.functional as F
from torchvision import datasets, transforms
import matplotlib.pyplot as plt
import numpy as np

device = "cpu"

transform = transforms.Compose([transforms.ToTensor()])
dataset = datasets.MNIST(root="./data", train=True, download=True, transform=transform)

# Select a single handwritten digit
x_0, _ = dataset[0]
x_0 = x_0.to(device)

def show_image(tensor, title=""):
    img = tensor.cpu().squeeze().numpy()
    plt.imshow(img, cmap="gray")
    plt.title(title)
    plt.axis("off")
```

- PyTorch manages tensors, automatic broadcasting, and sampling.
- `torchvision.datasets.MNIST` provides real handwritten digit images normalized to $[0, 1]$.
- A real continuous grayscale image demonstrates how diffusion operates over continuous multi-tonal features.

### 2. Define the Standard DDPM Schedule

```python
TIMESTEPS = 200

# Linear variance schedule
beta = torch.linspace(0.0001, 0.02, TIMESTEPS).to(device)

# alpha_t = 1 - beta_t
alpha = 1.0 - beta

# Cumulative product: alpha_bar_t
alpha_bar = torch.cumprod(alpha, dim=0)
```

The cumulative product defines how much initial signal survives after $t$ consecutive Markov steps:

$$\bar{\alpha}_t = \prod_{s=1}^{t} \alpha_s$$

As $t \to T$, $\bar{\alpha}_t \to 0$, indicating that the contribution of the original data point decays toward zero.

### 3. Closed-Form Jump to Timestep $t$

A key property of Gaussian Markov chains is that we do not need to iterate through $t$ discrete transitions to sample $x_t$. The repeated convolution of Gaussians permits jumping directly from $x_0$ to any arbitrary timestep $t$:

$$x_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1 - \bar{\alpha}_t} \, \epsilon, \qquad \epsilon \sim \mathcal{N}(0, I)$$

```python
def forward_diffusion(x_0, t):
    noise = torch.randn_like(x_0)
    sqrt_alpha_bar_t = torch.sqrt(alpha_bar[t])
    sqrt_one_minus_alpha_bar_t = torch.sqrt(1 - alpha_bar[t])

    x_t = (
        sqrt_alpha_bar_t * x_0
        + sqrt_one_minus_alpha_bar_t * noise
    )
    return x_t

i_step = 100
x_i = forward_diffusion(x_0, i_step)
```

![MNIST forward noising result](/images/notes/ddpm/mnist_forward_noising.png)

This closed-form property is what makes DDPM training efficient: an optimization step can sample a random batch of arbitrary timesteps $t \sim \mathcal{U}(1, T)$ in $O(1)$ time without unrolling earlier transitions.

### 4. Reverse Posterior Mean and Variance

The reverse conditional distribution $q(x_{t-1} \mid x_t)$ is intractable because it depends on the entire data distribution $q(x_0)$. However, conditioning on the known clean image $x_0$ makes the posterior tractable via Bayes' rule:

$$q(x_{t-1} \mid x_t, x_0) = \mathcal{N}\left(x_{t-1}; \, \tilde{\mu}_t(x_t, x_0), \, \tilde{\beta}_t I\right)$$

Applying Gaussian conditioning algebra yields the analytical posterior mean:

$$\tilde{\mu}_t(x_t, x_0) = \frac{\sqrt{\bar{\alpha}_{t-1}}\beta_t}{1 - \bar{\alpha}_t} x_0 + \frac{\sqrt{\alpha_t}(1 - \bar{\alpha}_{t-1})}{1 - \bar{\alpha}_t} x_t$$

and posterior variance:

$$\tilde{\beta}_t = \frac{1 - \bar{\alpha}_{t-1}}{1 - \bar{\alpha}_t} \beta_t$$

```python
def get_posterior_mean_variance(x_i, x_0, t):
    alpha_t = alpha[t]
    alpha_bar_t = alpha_bar[t]
    alpha_bar_prev = alpha_bar[t - 1] if t > 0 else torch.tensor(1.0).to(device)
    beta_t = beta[t]

    # Weighted coefficient for x_0
    coeff_1 = (torch.sqrt(alpha_bar_prev) * beta_t) / (1 - alpha_bar_t)

    # Weighted coefficient for x_t
    coeff_2 = (torch.sqrt(alpha_t) * (1 - alpha_bar_prev)) / (1 - alpha_bar_t)

    # Posterior mean
    mu = (coeff_1 * x_0) + (coeff_2 * x_i)

    # Posterior variance
    posterior_variance = ((1 - alpha_bar_prev) / (1 - alpha_bar_t)) * beta_t

    return mu, posterior_variance
```

### 5. Repeated Reverse Transitions

Given a noisy image initialized at $t = 50$, we iteratively step backward toward $t = 0$:

$$x_{t-1} = \tilde{\mu}_t(x_t, x_0) + \sqrt{\tilde{\beta}_t} \, z, \qquad z \sim \mathcal{N}(0, I)$$

```python
start_step = 50
x_current = forward_diffusion(x_0, start_step)
x_start_img = x_current.clone()

# Reverse denoising trajectory from t=50 down to t=1
for t in range(start_step, 0, -1):
    mu, var = get_posterior_mean_variance(x_current, x_0, t)
    noise = torch.randn_like(x_0) if t > 1 else torch.zeros_like(x_0)
    x_current = mu + (torch.sqrt(var) * noise)
```

At $t = 1$, noise is zeroed out to yield the deterministic expectation at $x_0$.

### 6. Reverse Transition Visualization

![Reverse transition visualization](/images/notes/ddpm/reverse_transition_visualization.png)

**Interpreting the Four Panels:**
1. **Clean Original ($x_0$):** The ground-truth input digit from the dataset.
2. **Noisy Start ($x_{50}$):** The sample corrupted by forward diffusion at $t = 50$.
3. **Reverse Sampled ($x_0^*$):** The sample reconstructed by unrolling 50 discrete posterior Gaussian transitions.
4. **Difference ($x_{\text{start}} - x_{\text{final}}$):** The net pixel-wise residual removed during the reverse trajectory.

---

## What the Two Experiments Teach

| Concept | Forward Experiment | Reverse Experiment |
|---|---|---|
| **Input Data** | Synthetic $64 \times 64$ Binary "T" | Grayscale Handwritten Digit ($28 \times 28$) |
| **Primary Goal** | Visualize progressive structural entropy | Verify analytical Gaussian posterior transitions |
| **Noise Parameterization** | $100$ steps; custom $\alpha_t^2 + \beta_t^2 = 1$ | $200$ steps; standard linear DDPM $\beta_t \in [10^{-4}, 0.02]$ |
| **Core Operation** | $x_t = a_t x_{t-1} + b_t z$ | $x_{t-1} = \tilde{\mu}_t + \sqrt{\tilde{\beta}_t} z$ |
| **Key Insight** | Noise steadily erases spatial frequencies | Conditioning on $x_0$ renders the reverse step Gaussian and exact |

---

## Important Implementation Notes

1. **Zero-Based Tensor Indexing:** PyTorch schedules use 0-indexed tensors. Position `alpha_bar[t]` corresponds to the $(t + 1)$-th mathematical diffusion step. When $t = 0$, $\bar{\alpha}_0 = 1.0$ represents uncorrupted data.
2. **The Role of $x_0$:** The reverse equations here rely on having the true $x_0$ available at every step. This makes it an analytical verification of posterior math, not yet an unguided generative model.
3. **From Ground Truth to Neural Approximations:** In a complete generative DDPM, $x_0$ is unknown at inference time. Instead, a U-Net is trained with parameter weights $\theta$ to predict the injected noise $\epsilon_\theta(x_t, t)$. The estimated clean image is then approximated via:
   $$\hat{x}_0 = \frac{x_t - \sqrt{1 - \bar{\alpha}_t} \, \epsilon_\theta(x_t, t)}{\sqrt{\bar{\alpha}_t}}$$
   and substituted into $\tilde{\mu}_t$ to sample unconditionally from random noise.
4. **Pixel Dynamic Ranges:** Image tensors must maintain consistent clipping boundaries ($[-1, 1]$ or $[0, 1]$) during display to avoid artificial contrast artifacts introduced by floating-point Gaussian tails.

## Final Takeaway

Diffusion models split generative modeling into two halves:
- A **fixed forward process** that systematically destroys data distribution structure according to a known Gaussian noise schedule.
- A **parameterized reverse process** that learns to invert each step of corruption.

Understanding the exact analytical posterior $q(x_{t-1} \mid x_t, x_0)$ is the essential prerequisite to understanding how neural noise predictors optimize the variational lower bound (ELBO) in generative diffusion architectures.
