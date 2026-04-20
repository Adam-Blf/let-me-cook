# Extraction backend · stacks et migration path

Analyse datée 2026-04-20 · prix API à relire chaque trimestre.

## 3 stacks possibles

### Stack A · 100 % API closed (phase MVP)

| Composant | Provider | Prix |
|---|---|---|
| Transcription | OpenAI Whisper-1 | $0.006/min |
| Vision + structuration | Claude Haiku 4.5 | $1/M in · $5/M out |
| Storage | Supabase | gratuit sous 50k MAU |

**COGS par extraction** · 0,033 € · **per-user-per-year moyen** · 4,56 €.

### Stack B · Hybride (phase 500-5k users)

| Composant | Provider | Prix |
|---|---|---|
| Transcription | `faster-whisper` self-hosted | Hetzner CPX41 · ~30 €/mois |
| Vision | Claude Haiku 4.5 | $1/M in · $5/M out |
| Structuration | Groq Llama 3.3 70B | $0.05/M in · $0.08/M out |

**COGS par extraction** · 0,016 € · **per-user-per-year** · 2,20 €.

Bascule quand · > 100 paying users · migration 3-4 jours, feature flag
backend pour swap sans toucher l'app.

### Stack C · 100 % OSS (phase 5k+ users)

| Composant | Provider | Prix |
|---|---|---|
| Transcription | `distil-whisper-large-v3` self-hosted | GPU serverless Modal · ~15 €/mois amorti |
| Vision | `Qwen2-VL 7B` self-hosted | GPU serverless · ~30 €/mois amorti |
| Structuration | `Llama 3.3 70B` self-hosted | GPU serverless · ~50 €/mois amorti |

**COGS par extraction** · 0,001-0,005 € · **per-user-per-year** · <1 €.

## Impact pricing

| Stack | Break-even yearly (marge 70%) | Pricing recommandé |
|---|---|---|
| A | 39,99 €/an | 39,99 €/an |
| B | 19,99 €/an | 29,99 €/an (marge confortable) |
| C | 9,99 €/an | 24,99 €/an ou même 14,99 €/an |

## Architecture modulaire à prévoir côté backend

```ts
// backend/extraction/provider.ts
export interface ExtractionProvider {
  transcribe(audioUrl: string): Promise<string>;
  structure(params: {
    transcript: string;
    frames: Buffer[];
    sourcePlatform: SourcePlatform;
  }): Promise<Recipe>;
}

// providers/openai-whisper-claude.ts   · Stack A
// providers/self-whisper-groq-llama.ts · Stack B
// providers/self-everything.ts         · Stack C

const provider = providerForEnv(process.env.EXTRACTION_STACK);
```

Un env var `EXTRACTION_STACK=A|B|C` · bascule sans redeploy app mobile.

## Fournisseurs LLM cloud bon marché 2026

| Provider | Llama 3.3 70B | Latence | RGPD EU |
|---|---|---|---|
| **Groq** | $0.05/M in · $0.08/M out | 300 tok/s | US (DPA SCC) |
| Together AI | $0.88/M in+out | ~100 tok/s | US |
| DeepInfra | $0.52/M in · $0.75/M out | ~80 tok/s | US |
| Replicate | $0.65/M in · $2.75/M out | ~60 tok/s | US |
| Fireworks | $0.90/M in+out | ~200 tok/s | US |
| Scaleway (FR) | roadmap Llama 405B | TBD | **France** |

## Providers Whisper cloud

| Provider | Prix | Notes |
|---|---|---|
| OpenAI Whisper-1 | $0.006/min | standard |
| OpenAI gpt-4o-transcribe | $0.003/min | 2× moins cher, moins précis français |
| Groq Whisper-large-v3 | $0.04/hour | ultra low cost + rapide |
| Deepgram Nova-3 | $0.0043/min | meilleur français |
| AssemblyAI | $0.0065/min | bon équilibre qualité/prix |

## Self-host Whisper · benchmarks

| Variante | Vitesse (x temps réel) | RAM | GPU ? |
|---|---|---|---|
| whisper-large-v3 (original) | 0.5-1× | 10 GB | oui |
| faster-whisper-large | 2-4× | 6 GB | opt |
| distil-whisper-large-v3 | 6× | 6 GB | opt |
| whisper.cpp (small) | 10× CPU | 1 GB | non |

Reco VPS · Hetzner CPX41 (8 AMD CPU · 16 GB RAM · 30 €/mois) avec
`distil-whisper-large-v3` → transcribe 1000 vidéos/heure.

## Phase reco Adam

1. **MVP · Stack A** · ship en 2 jours, 0-500 users, pricing 39,99 €/an
2. **Scale · Stack B** · 500-5k users, migrate en 3-4 jours, 29,99 €/an
3. **Scale++ · Stack C** · 5k+ users, GPU serverless, libre en pricing
