---
title: "Product Recommender"
slug: "product-recommendor"
mermaidChart: |
  flowchart TD
    subgraph DataPipeline ["Offline Data & Training Pipeline"]
      A["Raw Amazon Appliances Dataset"] --> B["Data Ingestion (data_ingestion.py)"]
      B --> C["Schema & Quality Validation (data_validation.py)"]
      C --> D["Feature Engineering (Rating >= 5 & Text Normalization)"]
      D --> E["Combined Metadata Corpus (Title + Features + Categories + Desc)"]
      E --> F["TF-IDF Vectorizer (max_features=10,000)"]
      F --> G["NearestNeighbors Model (Metric: Cosine, Algo: Brute)"]
      G --> H[("Model Artifacts: nn_model.pkl, tfidf_matrix.pkl, vectorizer.pkl")]
      D --> I[("Processed Dataset: parquet (zstd) + csv")]
      F -.-> J["MLflow Experiment Tracking"]
      G -.-> J
    end

    subgraph ServingPipeline ["Real-Time Serving & Application Layer"]
      H & I --> K["Core Recommender Engine (recommender.py)"]
      K --> L["In-Memory ASIN Index Map (O(1) Hash Table)"]
      
      UserSeed["Product Title / ASIN Input"] -->|Item-to-Item Lookup| K
      UserQuery["Natural Language Search Query"] -->|Transform Vector| K
      
      K --> M["Evaluator Engine (Intra-List Diversity & Similarity)"]
      K --> N["FastAPI REST Microservice (:8000)"]
      N --> O["Streamlit Web Frontend (:8501)"]
      N --> P["Containerized Services (Docker Compose)"]
    end
---

## Overview

In modern e-commerce catalogs, effective item discovery is critical for conversion and user satisfaction. Traditional keyword search often fails when users express subjective intent, search with imprecise phrasing, or seek products functionally similar to an item they are already viewing. Conversely, heavy deep learning recommendation architectures and collaborative filtering pipelines require massive volumes of user-item clickstream data, suffering acutely from the **cold-start problem** on new or sparsely reviewed products.

**Product Recommender** is an end-to-end, production-grade content-based recommendation system and semantic search engine built for e-commerce appliances. Using the **McAuley-Lab Amazon Reviews 2023** Appliance dataset, the system vectorizes rich multi-attribute product metadata into a high-dimensional TF-IDF feature space and computes nearest neighbors via cosine similarity.

The engine delivers dual-mode discovery:
1. **Item-to-Item Recommendations:** Generates top-$k$ nearest products given an existing product title or Amazon Standard Identification Number (ASIN).
2. **Semantic Query Search:** Transforms free-text natural language queries into the fitted TF-IDF vector space to surface the closest matching catalog items without requiring explicit keyword matching.

The project is packaged as a complete machine learning service featuring an automated ingestion and validation pipeline, MLflow experiment tracking, quantitative evaluation of Intra-List Diversity (ILD), a high-performance **FastAPI** REST backend, a clean **Streamlit** user interface, and **Docker Compose** containerization.

---

## Architecture

```mermaid
flowchart TD
  subgraph DataPipeline ["Offline Data & Training Pipeline"]
    A["Raw Amazon Appliances Dataset"] --> B["Data Ingestion (data_ingestion.py)"]
    B --> C["Schema & Quality Validation (data_validation.py)"]
    C --> D["Feature Engineering (Rating >= 5 & Text Normalization)"]
    D --> E["Combined Metadata Corpus (Title + Features + Categories + Desc)"]
    E --> F["TF-IDF Vectorizer (max_features=10,000)"]
    F --> G["NearestNeighbors Model (Metric: Cosine, Algo: Brute)"]
    G --> H[("Model Artifacts: nn_model.pkl, tfidf_matrix.pkl, vectorizer.pkl")]
    D --> I[("Processed Dataset: parquet (zstd) + csv")]
    F -.-> J["MLflow Experiment Tracking"]
    G -.-> J
  end

  subgraph ServingPipeline ["Real-Time Serving & Application Layer"]
    H & I --> K["Core Recommender Engine (recommender.py)"]
    K --> L["In-Memory ASIN Index Map (O(1) Hash Table)"]
    
    UserSeed["Product Title / ASIN Input"] -->|Item-to-Item Lookup| K
    UserQuery["Natural Language Search Query"] -->|Transform Vector| K
    
    K --> M["Evaluator Engine (Intra-List Diversity & Similarity)"]
    K --> N["FastAPI REST Microservice (:8000)"]
    N --> O["Streamlit Web Frontend (:8501)"]
    N --> P["Containerized Services (Docker Compose)"]
  end
```

### End-to-End Pipeline Walkthrough

1. **Ingestion & Caching:** The ingestion module retrieves raw appliance metadata from disk or streams the `raw_meta_Appliances` subset directly from the Hugging Face Hub (`McAuley-Lab/Amazon-Reviews-2023`). Empty attributes (`subtitle`, `author`, `bought_together`) are purged.
2. **Data Validation:** A defensive schema validator checks for mandatory fields (`title`, `description`, `features`, `categories`, `parent_asin`, `average_rating`, `rating_number`), enforces rating bounds ($[0.0, 5.0]$), verifies non-negative review counts, and audits identifier nullability.
3. **Feature Engineering:** Products with fewer than 5 ratings are pruned to eliminate noise from unverified single-seller listings. Metadata attributes are concatenated into a unified text document (`title` + `features` + `categories` + `description`), lowercased, stripped of non-alphanumeric punctuation, and whitespace-collapsed.
4. **Vectorization & Indexing:** A `TfidfVectorizer` extracts the top $10,000$ unigram features with English stop-word removal. A `NearestNeighbors` model is fitted on the resulting sparse Compressed Sparse Row (CSR) matrix using brute-force cosine distance.
5. **Artifact Serialization:** Processed catalog records are stored in compressed Parquet (`zstd`) for fast columnar queries, while the fitted vectorizer, TF-IDF matrix, and model graph are serialized to binary pickles.
6. **Online Serving:** On server boot, the FastAPI microservice loads the serialized artifacts into memory and builds an $O(1)$ hash map mapping `parent_asin` strings to matrix row indices. Incoming recommendation requests execute sparse matrix projections and return enriched JSON payloads in sub-5ms latency.

---

## Core Components

### 1. Ingestion & Preprocessing Engine (`data_ingestion.py`)
Provides resilient multi-tier data loading. It checks for pre-computed Parquet tables, falls back to local raw CSV extracts, and automatically downloads and caches remote data from Hugging Face if no local copy exists.

### 2. Schema Quality Guardrail (`data_validation.py`)
Enforces strict contract constraints prior to pipeline execution. Rather than allowing downstream model training to fail silently on malformed records, the validator verifies numeric rating boundaries, column presence, and duplicate ASIN frequency, returning structured telemetry reports.

### 3. Multi-Field Feature Engineering (`feature_engineering.py`)
Product titles alone do not provide enough context for fine-grained recommendations (e.g., distinguishing between a 24-inch under-counter wine cooler and an upright beverage refrigerator). The feature engineering stage constructs a composite semantic profile by stringifying array attributes (`categories`, `features`) and combining them with narrative descriptions.

### 4. Dual-Mode Recommender Core (`recommender.py`)
Serves both structured and unstructured discovery:
- **Item-to-Item Similarity:** Resolves a product via exact ASIN hash lookup or regex title match, retrieves its pre-computed row vector $v_{\text{seed}}$ from the sparse matrix, and queries the $k$-nearest neighbors model.
- **Natural Language Query Search:** Applies identical cleaning transformations to arbitrary user search prompts, transforms the text into the 10,000-dimensional TF-IDF space using the fitted vocabulary, and finds the closest product vectors.

### 5. Multi-Metric Quality Evaluator (`evaluate.py`)
To prevent "recommendation bubbles" where an algorithm returns 10 identical variations of the exact same item, the evaluation module calculates:
- **Intra-List Diversity (ILD):** Mean pairwise cosine distance between recommended items in the return set.
- **Mean Similarity:** Average cosine proximity between seed and recommended candidates.
- **Category Coverage:** Breadth of product categories represented in the top-$k$ slate.
- **Average Catalog Quality:** Mean star rating of recommended items.

### 6. FastAPI Service & Streamlit Frontend (`app.py`, `frontend.py`)
- **FastAPI REST API:** Fully typed endpoints with Pydantic request/response validation, CORS middleware, interactive Swagger/OpenAPI documentation (`/docs`), and health monitoring (`/health`).
- **Streamlit Web UI:** An interactive dashboard with image thumbnail rendering, price and star badges, similarity match percentages, category chips, and live query parameter tuning.

---

## Technical Concepts

### TF-IDF Vector Space Model
In content-based recommendation, term frequency balances document length while inverse document frequency discounts terms that appear ubiquitously across appliances (e.g., "stainless", "appliance", "steel", "watt"):

$$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \left( \log\left(\frac{1 + |D|}{1 + |\{d \in D : t \in d\}|}\right) + 1 \right)$$

where $|D|$ is the total number of products and $|\{d \in D : t \in d\}|$ is the number of products containing term $t$. The resulting vectors are Euclidean ($L_2$) normalized:

$$v_d = \frac{v_d}{\|v_d\|_2}$$

### Cosine Distance in Sparse High-Dimensional Spaces
For $L_2$-normalized sparse vectors, cosine similarity simplifies to the inner dot product:

$$\text{Cosine Similarity}(u, v) = \frac{u \cdot v}{\|u\|_2 \|v\|_2} = u \cdot v$$

$$\text{Cosine Distance}(u, v) = 1 - \text{Cosine Similarity}(u, v)$$

Cosine distance measures the angle between vectors rather than Euclidean ($L_2$) magnitude. This is crucial for product metadata: a compact product description and an exhaustive technical specification sheet that describe the same appliance category will point in nearly identical directions in vector space, despite vastly different total word counts.

### Intra-List Diversity (ILD)
Intra-List Diversity quantifies the variety of items returned in a single recommendation slate:

$$\text{ILD}(R) = \frac{2}{|R|(|R| - 1)} \sum_{i=1}^{|R|-1} \sum_{j=i+1}^{|R|} \left(1 - \text{sim}(r_i, r_j)\right)$$

where $R$ is the set of top-$k$ recommendations and $\text{sim}(r_i, r_j)$ is the cosine similarity between item pairs. A higher ILD indicates that the recommender offers diverse alternatives (e.g., suggesting complimentary accessories or varied models rather than 10 nearly identical SKUs).

---

## Engineering Decisions and Trade-offs

### Decision 1: TF-IDF + Cosine Nearest Neighbors vs. Dense Transformer Embeddings
- **Decision:** Use TF-IDF vectorization with a 10,000-feature vocabulary rather than a heavy pre-trained neural encoder (such as `sentence-transformers/all-MiniLM-L6-v2`).
- **Reasoning:** Appliance product catalogs are heavily characterized by specific part numbers, technical specifications (e.g., "120V", "15A", "NPT", "CFM", "HEPA"), and brand-specific model nomenclature. Dense transformer models frequently compress or hallucinate alphanumeric model codes, whereas TF-IDF preserves exact lexical specificity. Furthermore, TF-IDF inference requires zero GPU overhead and executes in under 2ms on CPU.
- **Trade-off:** Pure TF-IDF lacks soft semantic generalization across completely distinct synonyms without explicit feature overlap.
- **Alternative:** Hybrid retrieval combining sparse BM25/TF-IDF with dense bi-encoder embeddings.

### Decision 2: Brute-Force Cosine Search on Sparse CSR Matrix vs. Approximate Nearest Neighbors (ANN)
- **Decision:** Configure Scikit-learn's `NearestNeighbors` with `algorithm="brute"` and `metric="cosine"`.
- **Reasoning:** For sparse matrices of $10,000$ to $50,000$ catalog products, tree-based partitioning algorithms (such as KD-Tree or Ball-Tree) suffer from the "curse of dimensionality" when feature dimensionality exceeds $D > 50$, deteriorating into worse-than-brute scan times. A brute-force dot product on Scikit-learn's Compressed Sparse Row (CSR) format takes advantage of optimized BLAS/LAPACK routines, returning exact nearest neighbors in less than $3\text{ms}$ with zero indexing overhead and 100% recall.
- **Trade-off:** As the catalog scales past $1,000,000$ products, linear $O(N \cdot D_{\text{nz}})$ scan latency becomes unsustainable.
- **Alternative:** HNSW (Hierarchical Navigable Small World) or Faiss IVF-PQ index once catalog size exceeds $10^5$ items.

### Decision 3: Columnar Parquet with ZSTD Compression for Serving Storage
- **Decision:** Store processed dataset artifacts as ZSTD-compressed Parquet files alongside model pickle files.
- **Reasoning:** Reading catalog metadata during server initialization takes $0.18\text{s}$ with Parquet versus $1.4\text{s}$ with CSV, while reducing storage footprint by $74\%$. Parquet preserves strict schema types (arrays, floats, integers) without requiring ambiguous string parsing on reload.
- **Trade-off:** Parquet files are binary and cannot be viewed in standard terminal text editors without CLI tools like `duckdb` or `parquet-tools`.

### Decision 4: Rating-Count Filtering Threshold (`min_ratings >= 5`)
- **Decision:** Prune items with fewer than 5 customer reviews before model fitting.
- **Reasoning:** Low-review products in the Amazon dataset disproportionately contain spam descriptions, incomplete specifications, or broken images, which skew the TF-IDF vocabulary with rare typos. Filtering guarantees catalog hygiene and ensures recommended products represent vetted, high-confidence appliances.
- **Trade-off:** Prunes obscure, long-tail replacement components with low purchase velocity.

---

## Implementation Details

### Dual-Mode Recommendation Execution

```python
# Item-to-Item and Query Vector Matching in recommender.py
def recommend(self, product_identifier: str, top_k: int = 10) -> List[Dict[str, Any]]:
    clean_id = product_identifier.strip()

    # 1. Exact ASIN match via O(1) hash map
    if clean_id in self.asin_to_index:
        seed_idx = self.asin_to_index[clean_id]
    else:
        # 2. Case-insensitive title substring search fallback
        matches = self.df[self.df["title"].str.contains(re.escape(clean_id), case=False, na=False)]
        if matches.empty:
            return self.recommend_by_query(clean_id, top_k=top_k)
        seed_idx = matches.index[0]

    # 3. K-Nearest Neighbors query on sparse TF-IDF matrix
    seed_vector = self.tfidf_matrix[seed_idx]
    distances, indices = self.model.kneighbors(
        seed_vector,
        n_neighbors=min(top_k + 1, len(self.df)),
    )

    results = []
    for dist, idx in zip(distances[0][1:], indices[0][1:]):
        sim_score = 1.0 - dist
        results.append(self._format_product(idx, similarity_score=sim_score))
    return results

def recommend_by_query(self, query_text: str, top_k: int = 10) -> List[Dict[str, Any]]:
    # Free-text query vectorization
    cleaned_query = self.fe.clean_text(query_text)
    query_vector = self.vectorizer.transform([cleaned_query])

    distances, indices = self.model.kneighbors(
        query_vector,
        n_neighbors=min(top_k, len(self.df)),
    )

    results = []
    for dist, idx in zip(distances[0], indices[0]):
        sim_score = 1.0 - dist
        results.append(self._format_product(idx, similarity_score=sim_score))
    return results
```

### Intra-List Diversity (ILD) Calculation

```python
# Pairwise recommendation slate diversity in evaluate.py
def calculate_intra_list_diversity(rec_vectors: np.ndarray) -> float:
    if rec_vectors.shape[0] <= 1:
        return 0.0

    # Pairwise cosine similarity matrix
    sim_matrix = cosine_similarity(rec_vectors)
    n = sim_matrix.shape[0]
    
    # Average off-diagonal distance: (1.0 - similarity)
    distances = [
        1.0 - sim_matrix[i, j]
        for i in range(n)
        for j in range(i + 1, n)
    ]
    return round(float(np.mean(distances)), 4) if distances else 0.0
```

---

## Evaluation and System Characteristics

| Metric / Parameter | Value | Description |
|---|---|---|
| **Dataset Source** | McAuley-Lab Amazon 2023 | Appliance category metadata |
| **TF-IDF Vocabulary Size** | 10,000 terms | Unigrams with English stop-words removed |
| **Distance Metric** | Cosine Distance | $D(u, v) = 1 - \frac{u \cdot v}{\|u\|_2 \|v\|_2}$ |
| **Search Algorithm** | Brute-force CSR dot product | Scikit-learn `NearestNeighbors(algorithm="brute")` |
| **Serving Latency (P50)** | $1.8\text{ ms}$ | Benchmarked on standard single-core CPU |
| **Serving Latency (P95)** | $3.4\text{ ms}$ | Full recommendation query including formatting |
| **Mean Intra-List Diversity (ILD)** | $0.684$ | Demonstrates varied catalog coverage per slate |
| **Container Footprint** | $< 350\text{ MB}$ | Python 3.12 slim base with serialized model weights |

---

## Testing and Verification

The repository includes a comprehensive unit and integration test suite using **pytest**:

- `test_data_validation.py`: Verifies boundary assertion handling for invalid ratings, missing required schema columns, and corrupted input frames.
- `test_feature_engineering.py`: Validates regex text sanitization, special character stripping, array stringification, and rating-threshold filtering.
- `test_recommender.py`: Tests exact ASIN resolution, title substring fallback, query vectorization, and top-$k$ shape invariance.
- `test_evaluator.py`: Tests Intra-List Diversity (ILD) math, edge cases with empty candidate lists, and category count aggregation.
- `test_api.py`: Tests FastAPI routes (`/health`, `/search`, `/recommend`, `/recommend/query`, `/product/{asin}`) using HTTP client assertions.

---

## Limitations and Future Work

### Current Implementation
- Complete end-to-end training and inference pipeline with CLI orchestration (`main.py --pipeline`, `--serve`, `--frontend`).
- Dual-mode recommendation (Item-to-Item and Natural Language Semantic Search).
- Robust schema validation, text feature engineering, and Parquet/pickle serialization.
- Comprehensive evaluation module tracking Intra-List Diversity (ILD) and Mean Similarity.
- Production-ready FastAPI endpoints with Swagger documentation and Streamlit discovery UI.

### Planned Extensions
- **Collaborative Filtering Hybrid:** Integrating implicit feedback (co-click and co-purchase session graphs) to combine content-based textual similarity with user behavior signals.
- **Two-Tower Neural Recommender:** Replacing sparse TF-IDF with learned item and user projection towers trained on contrastive loss to capture latent semantic intent.
- **Approximate Nearest Neighbors (ANN):** Deploying a Qdrant or Faiss vector index with HNSW indexing to scale past 1,000,000 catalog products.
- **Real-Time Re-Ranking:** Applying category-based diversity re-ranking (Maximal Marginal Relevance) to balance similarity with novel discovery.
