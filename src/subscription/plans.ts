// Plans d'abonnement · source de vérité côté app.
// Les vrais produits sont créés dans App Store Connect + Play Console et
// exposés à l'app via RevenueCat (cf docs/paywall.md).
export const PLANS = {
  annual: {
    id: 'let_me_cook_annual_v1',
    price: 14.99,
    currency: 'EUR',
    priceLabel: '14,99 €',
    period: 'year',
    periodLabel: 'par an',
    monthlyEquivalent: '1,25 €',
    trialDays: 7,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const DEFAULT_PLAN: PlanId = 'annual';

/** Bénéfices affichés sur le paywall */
export const PAYWALL_FEATURES = [
  { icon: '∞', fr: 'Extractions illimitées', en: 'Unlimited extractions' },
  { icon: '▶', fr: 'TikTok · Reels · YouTube · Facebook · Pinterest', en: 'TikTok · Reels · YouTube · Facebook · Pinterest' },
  { icon: '◉', fr: 'Photo de livre + texte manuscrit', en: 'Book photo + handwritten text' },
  { icon: '✎', fr: 'Éditeur de recette manuelle', en: 'Manual recipe editor' },
  { icon: '◌', fr: 'Cook mode mains libres + timers', en: 'Hands-free cook mode + timers' },
  { icon: '☰', fr: 'Liste de courses groupée par rayon', en: 'Shopping list grouped by aisle' },
  { icon: '♥', fr: 'Bibliothèque sync iCloud / Drive', en: 'Library sync iCloud / Drive' },
];
