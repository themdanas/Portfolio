---
title: "Understanding KV Caching in Autoregressive Generation"
description: "Intuition, implementation details, and how KV caching reduces redundant computation during inference."
date: "2026-02-15"
readTime: "8 min read"
category: "LLM Inference"
---

## Introduction

In standard autoregressive language generation, tokens are produced one-by-one. Each newly generated token is appended to the context sequence and fed back into the model to predict the subsequent token.

Without optimization, computing the self-attention of the sequence at step $t$ requires recalculating the Key ($K$) and Value ($V$) tensors for all prior $t-1$ tokens. Because the representation of past tokens does not change, this constitutes redundant $O(N^2)$ computation.

## The Attention Computation

Recall the standard scaled dot-product attention equation:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

At step $t$:
- Query $Q_t$ corresponds only to the newest single token at position $t$.
- Keys $K_{1:t}$ and Values $V_{1:t}$ encompass all positions from $1$ to $t$.

Instead of recomputing $K_{1:t-1}$ and $V_{1:t-1}$ through the model's linear projections across all layers, we can store them in a persistent GPU tensor cache—the **KV Cache**.

## Memory Footprint of the KV Cache

While KV caching eliminates recomputation, it shifts the serving bottleneck from compute to GPU memory capacity.

For a model with:
- $L$ layers
- $H$ attention heads
- $D$ head dimension ($d_{model} / H$)
- Precision $P$ (bytes per element, e.g., 2 bytes for FP16/BF16)
- Sequence length $S$

The memory consumption for a single sequence is:

$$\text{Memory}_{\text{KV}} = 2 \times L \times H \times D \times S \times P$$

For a 7B parameter model ($L=32, H=32, D=128$) with a context length of 4096 tokens in FP16:

$$\text{Memory}_{\text{KV}} = 2 \times 32 \times 32 \times 128 \times 4096 \times 2 \approx 2.14 \text{ GB per request}$$

## Practical Implementation Considerations

1. **Pre-allocated vs. Paged Allocation:** Naive static allocation reserves the maximum context length up front, causing severe internal memory fragmentation. Techniques such as PagedAttention divide KV caches into non-contiguous physical memory blocks.
2. **Multi-Query (MQA) & Grouped-Query Attention (GQA):** Sharing key-value heads across multiple query heads reduces the memory footprint of the KV cache by factors of 4x to 8x.
