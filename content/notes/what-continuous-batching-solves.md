---
title: "What Continuous Batching Actually Solves"
description: "How continuous batching improves LLM serving throughput and the engineering trade-offs involved."
date: "2026-03-02"
readTime: "6 min read"
category: "Serving Systems"
---

## The Problem with Static Batching

Traditional deep learning serving systems rely on static batching. When requests arrive, the engine gathers a batch of $B$ requests, pads them to the length of the longest request in the batch, and executes forward passes until every sequence in the batch finishes generating its `<eos>` token.

This pattern suffers from two major inefficiencies in LLM inference:
1. **Padded Inefficiency:** Shorter requests waste execution cycles processing useless pad tokens.
2. **Early Completion Bubbles:** If one sequence finishes in 50 tokens and another takes 800 tokens, the completed slot sits idle for 750 generation steps, starving GPU compute.

## Iteration-Level Scheduling (Continuous Batching)

Continuous batching (popularized by Orca and vLLM) moves scheduling decisions from the request level to the **iteration (token) level**.

Rather than waiting for an entire batch of sequences to finish:
- At every single decode step, the scheduler inspects the running batch.
- If a sequence produces an `<eos>` token or hits its limit, it is immediately evicted.
- Its allocated KV cache blocks are returned to the pool.
- A newly arriving request's prefill phase can be scheduled right into the vacated slot.

## Engineering Trade-offs

1. **Preemptions and Memory Pressure:** When incoming arrival rates spike, available KV cache blocks may be exhausted before all active streams finish. The engine must support sequence swapping (offloading KV blocks to host CPU memory) or recomputation.
2. **Mixed Prefill and Decode Passes:** Prefill iterations are compute-bound (GEMM), while decode iterations are memory-bandwidth-bound (GEMV). Running them together introduces kernel scheduling complexity.

## Benchmark Results

In production workloads with varying input/output lengths, iteration-level continuous batching typically delivers a 3x to 5x throughput improvement over naive static batching.
