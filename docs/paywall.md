# Paywall · 14,99 €/an · Let Me Cook Pro

## Architecture

- **Plan** · `src/subscription/plans.ts` · `let_me_cook_annual_v1` ·
  14,99 € / an · essai gratuit 7 jours · équivalent 1,25 € / mois.
- **Hook** · `src/subscription/useSubscription.tsx` expose
  `{ isActive, loading, purchase, restore }`. En `__DEV__` utilise
  AsyncStorage (test rapide Expo Go). En prod, délègue à RevenueCat.
- **Écran** · `app/paywall.tsx` · Cooky happy + features + CTA 14,99 €.
- **Gates** ·
  - `app/index.tsx` · si onboarded mais pas abonné → redirect
    `/paywall`
  - `app/onboarding.tsx` · finish → `/paywall` au lieu de `/library`
  - `app/(tabs)/_layout.tsx` · si `!isActive` → `<Redirect href="/paywall" />`

## Mise en prod RevenueCat

1. **Compte RevenueCat** gratuit jusqu'à $2.5k MTR ·
   dashboard.revenuecat.com → créer projet "Let Me Cook".
2. **App Store Connect** · créer l'app avec bundle
   `com.adambeloucif.letmecook` · créer produit abonnement
   auto-renouvelable ID `let_me_cook_annual_v1` · price tier 14.99 EUR ·
   intro offer 7-day free trial.
3. **Google Play Console** · créer l'app avec package identique ·
   créer abonnement même ID · base plan annuel · offre trial 7 jours.
4. **RevenueCat** · ajouter les 2 apps (iOS + Android), lier aux
   produits, créer une offering `default` avec le package `annual`.
   Créer entitlement `pro` qui donne accès à tout.
5. **Clés API** · copier dans `.env` ·
   ```
   EXPO_PUBLIC_RC_IOS_KEY=appl_xxx
   EXPO_PUBLIC_RC_ANDROID_KEY=goog_xxx
   ```
6. **Code** · dans `useSubscription.tsx`, décommenter les blocs
   `// DÉCOMMENTER en prod :` et supprimer la branche `IS_DEV`.
7. **Install** · `npx expo install react-native-purchases` puis
   ajouter `"react-native-purchases"` au tableau `plugins` de
   `app.json`.
8. **Prebuild** · `npx expo prebuild --clean` (les plugins IAP
   nécessitent le natif, Expo Go ne suffit plus · utiliser EAS Build
   development profile).
9. **Test sandbox** · créer des comptes sandbox dans App Store Connect
   + Play Console · s'y connecter sur l'appareil (Réglages → App
   Store → Compte sandbox).
10. **Webhooks** · brancher le webhook RevenueCat sur un endpoint
    Supabase Edge Function qui sync l'état premium dans `profiles`
    pour cross-device sync.

## Conformité stores

- Apple veut voir le prix + conditions "auto-renewable" clairement
  avant achat · ✅ affiché sous le CTA.
- Apple exige un bouton "Restore purchase" accessible · ✅ présent.
- Apple veut un lien Terms of Service et Privacy Policy avant achat ·
  **À ajouter** avant review (pointer vers pages web hostées Vercel).
- Google Play veut la même transparence + pricing lisible · ✅.
- Pas de Stripe pour des abonnements digitaux in-app sur iOS · règle
  "In-App Purchase" App Store 3.1.1. RevenueCat force Apple StoreKit
  pour éviter le rejet.

## Mode dev (Expo Go aujourd'hui)

Cliquer "Commencer l'essai" écrit `lmc_subscription_active=1` dans
AsyncStorage. L'app devient utilisable. Reset via console ou :

```ts
import { devResetSubscription } from '../src/subscription/useSubscription';
await devResetSubscription();
```
