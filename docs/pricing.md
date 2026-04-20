# Pricing Let Me Cook Pro

Analyse datée 2026-04-20 · à relire tous les 6 mois (prix API évoluent).

## COGS par extraction (conservatif)

| Étape | Coût | Source |
|---|---|---|
| Transcription Whisper | 0,002 € | OpenAI API `$0.006/min` · audio ~0.4 min |
| Vision + LLM structuring (Claude Haiku 4.5) | 0,030 € | `$1/M in · $5/M out` · ~9000 tokens total |
| Storage Supabase + Vercel bandwidth | 0,001 € | amorti sur 50k MAU |
| **Total** | **~0,033 €** | |

Réduction possible à ~0,015 € avec GPT-4o mini si qualité acceptable.

## Usage / COGS annuel par profil

| Profil | Extractions/mois | COGS/an |
|---|---|---|
| Light | 3 | 1,20 € |
| Moderate | 10 | 4,00 € |
| Power | 20 | 7,90 € |
| Super | 40 | 15,80 € |

## Commission stores

Apple Small Business Program + Google Play < $1M/an = **15 %** prélevés.
Formule net · `Prix × 0,85 − COGS − marge cible`.

## Prix retenus

| Tier | Prix | Net (15% cut) | Marge sur user moderate |
|---|---|---|---|
| Monthly | 4,99 € | 4,24 €/mois | +68 €/an |
| Yearly | 24,99 € | 21,24 € | +17,24 € (81 %) |
| Lifetime | 59,99 € | 50,99 € | cash flow au launch |

Trial : **7 jours** sur Monthly et Yearly · standard conversion.

## Seuils de perte

| Prix | Break-even usage/mois |
|---|---|
| 14,99 €/an | **11 extractions/mois** |
| 19,99 €/an | 15 extractions/mois |
| **24,99 €/an (retenu)** | **19 extractions/mois** |
| 29,99 €/an | 23 extractions/mois |

À 14,99 €/an tu bascules en perte dès qu'un user fait plus de 10
extractions/mois. À 24,99 €/an tu tiens jusqu'à 19, ce qui couvre 90 %
des utilisateurs réels.

## Benchmark concurrents

| App | Prix yearly |
|---|---|
| Paprika (one-time) | ~5 € |
| Crouton | 25 €/an |
| ReciMe | 35 €/an |
| Kitchen Stories Premium | 40 €/an |
| SideChef | 50 €/an |
| Plant Jammer AI | 50 €/an |
| Bite (extraction TikTok) | 55 €/an |
| Yummly Pro | 55 €/an |

Sweet spot 25-40 €/an · 24,99 € te positionne comme "premium accessible"
vs "cheap skeleton" sous 20.

## Override

Les **vrais prix** viennent d'App Store Connect · RevenueCat les expose
via `package.product.priceString`. Pour changer :

1. App Store Connect → Abonnements → édite les tiers `monthly` /
   `yearly` / `lifetime`
2. Play Console pareil
3. RevenueCat sync auto · pas de redeploy app

Le fichier `src/subscription/plans.ts` ne sert que de fallback pour le
skeleton loading et l'affichage sur Expo Go.

## Quotas

Si tu gardes 14,99 €/an à terme (discount launch), imposer un quota
**10 extractions / mois** avec upgrade prompt au-dessus. Sinon tu
risques 2 €/user/an de perte sur les power users.
