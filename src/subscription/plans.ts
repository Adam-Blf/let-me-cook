// Plans d'abonnement Let Me Cook Pro.
//
// En prod, les prix affichés viennent de RevenueCat qui les récupère
// d'App Store Connect / Play Console via `product.priceString`. Ces valeurs
// par défaut sont un fallback pour le dev et les skeleton loading.
//
// Entitlement RevenueCat · "Let Me Cook Pro" (exact match dashboard).
// Offering par défaut · "default" avec 3 packages : monthly · yearly · lifetime.
export const ENTITLEMENT_ID = 'Let Me Cook Pro';
export const OFFERING_ID = 'default';

export const PACKAGE_IDS = {
  monthly: 'monthly',
  yearly: 'yearly',
  lifetime: 'lifetime',
} as const;

export type PlanKey = keyof typeof PACKAGE_IDS;

// Prix par défaut basés sur analyse COGS + benchmark marché · ajuste dans
// App Store Connect / Play Console pour les vrais prix.
export const PLANS: Record<PlanKey, {
  packageId: string;
  price: number;
  currency: 'EUR';
  priceLabel: string;
  monthlyEquivalentLabel: string;
  periodLabel: { fr: string; en: string };
  badge?: { fr: string; en: string };
  trialDays?: number;
}> = {
  monthly: {
    packageId: 'monthly',
    price: 7.99,
    currency: 'EUR',
    priceLabel: '7,99 €',
    monthlyEquivalentLabel: '7,99 €/mois',
    periodLabel: { fr: 'par mois · sans limite', en: 'per month · no limit' },
    trialDays: 7,
  },
  yearly: {
    packageId: 'yearly',
    price: 39.99,
    currency: 'EUR',
    priceLabel: '39,99 €',
    monthlyEquivalentLabel: '3,33 €/mois',
    periodLabel: { fr: 'par an · économise 58 %', en: 'per year · save 58%' },
    badge: { fr: 'LE PLUS POPULAIRE', en: 'MOST POPULAR' },
    trialDays: 7,
  },
  lifetime: {
    packageId: 'lifetime',
    price: 99.99,
    currency: 'EUR',
    priceLabel: '99,99 €',
    monthlyEquivalentLabel: 'paiement unique',
    periodLabel: { fr: 'à vie · usage juste 200/mois', en: 'lifetime · fair use 200/mo' },
    badge: { fr: 'EARLY BIRD', en: 'EARLY BIRD' },
  },
};

export const DEFAULT_PLAN: PlanKey = 'yearly';

/** Features affichées sur le paywall */
export const PAYWALL_FEATURES = [
  { icon: '∞', fr: 'Extractions illimitées', en: 'Unlimited extractions' },
  { icon: '▶', fr: 'TikTok · Reels · YouTube · Facebook · Pinterest', en: 'TikTok · Reels · YouTube · Facebook · Pinterest' },
  { icon: '◉', fr: 'Photo de livre + texte manuscrit', en: 'Book photo + handwritten text' },
  { icon: '✎', fr: 'Éditeur de recette manuelle', en: 'Manual recipe editor' },
  { icon: '◌', fr: 'Cook mode mains libres + timers', en: 'Hands-free cook mode + timers' },
  { icon: '☰', fr: 'Liste de courses groupée par rayon', en: 'Shopping list grouped by aisle' },
  { icon: '♥', fr: 'Bibliothèque sync iCloud / Drive', en: 'Library sync iCloud / Drive' },
];
