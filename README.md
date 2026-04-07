<div align="center">

<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
  <rect width="72" height="72" rx="8" fill="#0A0A0A"/>
  <polygon points="36,10 58,22 58,46 36,62 14,46 14,22" fill="none" stroke="#E8E8E8" stroke-width="1.5"/>
  <polygon points="36,20 50,28 50,44 36,52 22,44 22,28" fill="none" stroke="#E8E8E8" stroke-width="0.75" opacity="0.5"/>
  <circle cx="36" cy="36" r="4" fill="#E8E8E8"/>
  <line x1="36" y1="10" x2="36" y2="22" stroke="#E8E8E8" stroke-width="1"/>
  <line x1="36" y1="50" x2="36" y2="62" stroke="#E8E8E8" stroke-width="1"/>
  <line x1="14" y1="22" x2="22" y2="28" stroke="#E8E8E8" stroke-width="1"/>
  <line x1="50" y1="44" x2="58" y2="50" stroke="#E8E8E8" stroke-width="1"/>
  <line x1="58" y1="22" x2="50" y2="28" stroke="#E8E8E8" stroke-width="1"/>
  <line x1="22" y1="44" x2="14" y2="50" stroke="#E8E8E8" stroke-width="1"/>
</svg>

# VEKTOR Slipstream

**The associative memory layer for AI agents.**

Local-first. No cloud. One-time payment.

[![npm version](https://img.shields.io/npm/v/vektor-slipstream?style=flat-square&color=0A0A0A&labelColor=E8E8E8)](https://www.npmjs.com/package/vektor-slipstream)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A518.0.0-0A0A0A?style=flat-square&labelColor=E8E8E8)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-Commercial-0A0A0A?style=flat-square&labelColor=E8E8E8)](https://vektormemory.com/product#pricing)
[![Version](https://img.shields.io/badge/SDK-v1.4.6-0A0A0A?style=flat-square&labelColor=E8E8E8)](https://vektormemory.com/downloads)

[Documentation](https://vektormemory.com/docs) · [Downloads](https://vektormemory.com/downloads) · [Pricing](https://vektormemory.com/product#pricing) · [Support](mailto:hello@vektormemory.com)

</div>

---

## Overview

VEKTOR Slipstream replaces flat vector storage with a structured, multi-layered memory architecture. Standard RAG systems retrieve the past — VEKTOR reasons about it. Every memory is curated, compressed, and graph-indexed across four associative layers, giving AI agents context that persists, evolves, and improves over time.

Memory stores what you put in. VEKTOR understands why it matters.

---

## Architecture

```
Raw Input → AUDN Curation → MAGMA Graph → Indexed Recall
```

### MAGMA — Multi-Graph Agentic Memory Architecture

Four associative graph layers persist in local SQLite across all session resets:

| Layer | Type | Function |
|---|---|---|
| Semantic | Similarity | Finds related concepts across full context history |
| Causal | Cause → Effect | Understands why things happened, not just what |
| Temporal | Before → After | Tracks how knowledge evolves and decays over time |
| Entity | Co-occurrence | Connects people, projects, and events automatically |

### AUDN — Autonomous Curation Loop

Every memory is evaluated before storage. Four possible outcomes:

- **ADD** — New information stored as a graph node
- **UPDATE** — Existing memory updated with new context
- **DELETE** — Contradictions removed from the graph
- **NO_OP** — Information already known; no duplicate created

Zero contradictions. Zero duplicates. The graph stays consistent without manual management.

### REM Dream Cycle

A 7-phase background compression process that runs while your agent is idle. Synthesises up to 50 raw memory fragments into a single core insight per cluster. Core signal retained. Noise eliminated.

```
50 raw fragments → 7-phase REM cycle → 1 core insight (~98% noise reduction)
```

---

## Performance

| Metric | Value |
|---|---|
| Recall latency | ~8ms average (local SQLite + HNSW index) |
| Embedding cost | $0 — fully local ONNX model |
| Embedding latency | ~10ms GPU / ~25ms CPU |
| First run | ~2 minutes (downloads ~25MB model once) |
| Subsequent boots | <100ms |
| Bundle size | ~23MB (ONNX bundled) |

---

## Hardware Acceleration

Zero configuration. VEKTOR auto-detects and uses the best available accelerator:

```
NVIDIA CUDA      →  GPU acceleration
Apple Silicon    →  CoreML acceleration
CPU              →  Optimised fallback — works everywhere
```

---

## Installation

**Requirements:** Node.js ≥ 18.0.0

```bash
npm install vektor-slipstream
```

A licence key is required. Purchase at [vektormemory.com/product#pricing](https://vektormemory.com/product#pricing).

---

## Quick Start

```js
const { createMemory } = require('vektor-slipstream');

const memory = await createMemory({
  agentId: 'my-agent',
  licenceKey: process.env.VEKTOR_LICENCE_KEY,
});

// Store a memory
await memory.remember('User prefers TypeScript over JavaScript');

// Recall by semantic similarity — avg 8ms, fully local
const results = await memory.recall('coding preferences');
// → [{ id, content, summary, importance, score }]

// Traverse the associative graph
const graph = await memory.graph('TypeScript', { hops: 2 });

// Delta — what changed in the last 7 days?
const delta = await memory.delta('project decisions', 7);

// Morning briefing — AI-synthesised memory summary
const brief = await memory.briefing();
```

---

## CLI

The VEKTOR CLI provides a persistent memory terminal for chat, research, and autonomous agent workflows.

```bash
# Install globally
npm install -g vektor-slipstream

# First-run wizard — licence, hardware, integrations
npx vektor setup

# Activate licence key
npx vektor activate YOUR-KEY-HERE

# Start a chat session
npx vektor chat

# Use a specific provider
npx vektor chat --provider claude
npx vektor chat --provider groq
npx vektor chat --provider ollama
```

### CLI Commands

| Command | Description |
|---|---|
| `npx vektor setup` | First-run wizard — licence, hardware, integrations |
| `npx vektor activate` | Activate licence key on this machine |
| `npx vektor test` | Test memory engine with progress bar |
| `npx vektor status` | System health check |
| `npx vektor mcp` | Start Claude Desktop MCP server |
| `npx vektor tui` | Interactive memory browser |
| `npx vektor rem` | Run REM dream cycle |
| `npx vektor briefing` | Generate AI memory summary |
| `npx vektor help` | Full command reference |

### CLI Slash-Commands (in-session)

```
/recall <query>     Search persistent memory
/remember <text>    Store a fact manually
/briefing           AI memory summary
/model <n>          Switch model mid-session
/export             Save session to Markdown
/new                New conversation (memory persists)
```

---

## API Reference

### `createMemory(options)`

Initialises the memory engine. Downloads the ONNX embedding model on first run (~25MB, one time only).

```js
const memory = await createMemory({
  agentId: 'my-agent',              // Required — unique agent identifier
  licenceKey: process.env.VEKTOR_LICENCE_KEY,
  provider: 'claude',               // AI provider for briefing/delta synthesis
  apiKey: process.env.ANTHROPIC_API_KEY,
  dbPath: './my-agent.db',          // Optional — custom SQLite path
});
```

### `memory.remember(text)`

Runs the AUDN loop: embed → evaluate → ADD / UPDATE / DELETE / NO_OP.

```js
await memory.remember('User is migrating from REST to GraphQL');
```

### `memory.recall(query, options?)`

Semantic recall via HNSW cosine similarity across the full associative graph. Returns ranked results.

```js
const results = await memory.recall('API architecture decisions');
// → [{ id, content, summary, importance, score }]
```

### `memory.graph(concept, options?)`

Traverses the associative graph from a seed concept. Returns connected nodes across all four layers.

```js
const graph = await memory.graph('GraphQL', { hops: 2 });
```

### `memory.delta(topic, days)`

Returns what changed on a topic over a given time window. Useful for drift detection and change summaries.

```js
const delta = await memory.delta('infrastructure decisions', 30);
```

### `memory.briefing()`

Generates an AI-synthesised morning briefing from recent memory activity.

```js
const brief = await memory.briefing();
```

### `memory.dream()`

Manually triggers the REM compression cycle. Runs automatically in the background; call explicitly for on-demand compression.

```js
await memory.dream();
```

---

## Integrations

### Claude MCP — Desktop + Claude Code

Two integration modes: `.dxt` extension for Claude Desktop (drag-and-drop, no config), or `npx vektor mcp` for manual MCP server start.

**28 MCP tools available**, including:

```
vektor_recall         vektor_store          vektor_graph
vektor_delta          vektor_briefing       vektor_dream
cloak_fetch           cloak_render          cloak_diff
cloak_passport        cloak_identity_*      turbo_quant_compress
tokens_saved
```

**Claude Desktop Extension (.dxt):**

```
1. Download vektor-slipstream.dxt from vektormemory.com/downloads
2. Drag onto the Extensions page in Claude Desktop
3. Enter licence key — 28 tools available immediately
```

**MCP Server (Claude Code / manual):**

```bash
npx vektor mcp
```

### LangChain

Drop-in persistent memory layer for LangChain agents. v1 and v2 adapters included.

```js
const { createMemory } = require('vektor-slipstream');
const memory = await createMemory({ agentId: 'langchain-agent', licenceKey });

// Inject recalled context into your LangChain chain
const ctx = await memory.recall(userMessage);
// Pass ctx.map(r => r.content) as memory context to your chain
```

### OpenAI Agents SDK

Wrap any OpenAI agent loop with persistent memory. Inject recalled context directly into the system prompt.

```js
const memory = await createMemory({ agentId: 'openai-agent', licenceKey });
const recalled = await memory.recall(userInput);
const systemPrompt = `Previous context:\n${recalled.map(r => r.content).join('\n')}`;
```

### Mistral

`vektor_memoire` HTTP tool — works with Le Chat and Mistral API agents. Local bridge on `localhost:3847`.

```bash
node mistral-setup.js   # Activates the local bridge
```

### Gemini / Groq / Ollama

Provider-agnostic. Switch with one config change.

```js
const memory = await createMemory({
  provider: 'gemini',   // 'openai' | 'groq' | 'ollama' | 'claude'
  apiKey: process.env.GEMINI_API_KEY,
  agentId: 'my-agent',
  licenceKey,
});
```

**Gemini key pooling:** Waterfall rotation across up to 9 API keys — zero rate-limit downtime.

---

## Cloak — Sovereign Identity Layer

`vektor-slipstream/cloak` provides a bot-resistant headless browser, AES-256-GCM credential vault, layout sensor, and self-improving behaviour pattern system. Available as MCP tools and SDK methods.

```js
const { cloak_passport, cloak_fetch, tokens_saved } = require('vektor-slipstream/cloak');

// Store credentials — machine-bound, AES-256-GCM encrypted
cloak_passport('GITHUB_TOKEN', 'ghp_xxxx');
const token = cloak_passport('GITHUB_TOKEN');

// Stealth headless browser fetch
const { text, tokensSaved } = await cloak_fetch('https://example.com');

// ROI audit per session
const roi = tokens_saved({ raw_tokens: 10000, actual_tokens: 3000 });
// → { reduction_pct: 70, cost_saved_usd: 0.0175, roi_multiple: 2.3 }
```

### Cloak Tools

| Tool | Description |
|---|---|
| `cloak_fetch` | Stealth headless browser fetch — bot-resistant |
| `cloak_render` | Computed CSS and post-JS DOM layout sensor |
| `cloak_diff` | Semantic diff of a URL since last fetch |
| `cloak_passport` | AES-256-GCM encrypted credential vault, machine-bound |
| `cloak_identity_create` | Create a persistent browser fingerprint identity |
| `cloak_identity_use` | Apply a saved identity to the next fetch session |
| `cloak_inject_behaviour` | Inject human-realistic mouse/scroll behaviour |
| `cloak_solve_captcha` | Vision-AI automated CAPTCHA solver |
| `turbo_quant_compress` | 10x vector DB compression via TurboQuant PolarQuant |
| `tokens_saved` | ROI audit — token reduction and cost savings per session |

---

## Products

| Product | Status | Description |
|---|---|---|
| **Developer SDK** | Available | `npm install vektor-slipstream` — embed persistent memory into any Node.js agent |
| **VEKTOR CLI** | Available v1.4.6 | Persistent memory terminal — chat, research, autonomous agents |
| **Claude Desktop Extension** | Available | `.dxt` drag-and-drop install — 28 MCP tools, no config |
| **VEKTOR GUI** | Q2 2026 | Desktop app — visual memory graph, agent dashboard, swarm control |

All products use the same licence key.

---

## Licence

Commercial licence. One-time payment of **$159 USD**. Activates on up to 3 machines.

- Managed at [polar.sh](https://polar.sh)
- Purchase: [vektormemory.com/product#pricing](https://vektormemory.com/product#pricing)
- Enterprise licences available — contact [hello@vektormemory.com](mailto:hello@vektormemory.com)

---

## Research

VEKTOR's architecture is grounded in peer-reviewed research:

| Paper | arXiv | Relevance |
|---|---|---|
| MAGMA: A Multi-Graph-based Agentic Memory Architecture | [2601.03236](https://arxiv.org/abs/2601.03236) | Four-layer graph type system |
| EverMemOS: A Self-Organizing Memory Operating System | [2601.02163](https://arxiv.org/abs/2601.02163) | REM cycle and memory lifecycle management |
| Mem0: Production-Ready Agent Memory | [2504.19413](https://arxiv.org/abs/2504.19413) | AUDN curation loop and REM compression |
| Letta / MemGPT: LLM as Operating System | [letta.com](https://letta.com) | Agent context management paradigm |

---

## Privacy

VEKTOR operates on a zero-knowledge architecture. Your agent's memory graph — decisions, preferences, strategies — is stored in a local SQLite file on your machine. It never leaves your server. LLM inference queries are processed by your chosen provider per their own privacy policies.

---

## Support

- **Documentation:** [vektormemory.com/docs](https://vektormemory.com/docs)
- **Downloads:** [vektormemory.com/downloads](https://vektormemory.com/downloads)
- **Email:** [hello@vektormemory.com](mailto:hello@vektormemory.com)
- **Release announcements:** [vektormemory.substack.com](https://vektormemory.substack.com)
