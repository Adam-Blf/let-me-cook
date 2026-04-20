# Let Me Cook · TODO

## Écrans à porter

Référence : `C:\Users\adamb\let-me-cook\src\screens-*.jsx`. Même pattern
que `app/(tabs)/library.tsx` · `div` → `View`, `span` → `Text`, inline
style → objet `style`, event `onClick` → `onPress`.

- [ ] **ShareSheet** · `screens-1.jsx:152` · écran fallback quand
      l'utilisateur partage une URL depuis TikTok/Insta.
- [ ] **PhotoMode** · `screens-1.jsx:242` · nécessite `expo-camera`,
      overlay de scan, bulle Cooky.
- [ ] **Extraction** · `screens-1.jsx:358` · loader 4 étapes + barre
      progression.
- [ ] **CookMode** · `screens-2.jsx:147` · fond dark, typo géante, timer
      intégré, swipe étape suivante.
- [ ] **Finished** · `screens-2.jsx:254` · rating + compteur cuisson
      incrément AsyncStorage.
- [ ] **IngredientDetail** · `screens-2.jsx:316` · bottom sheet,
      substitutions.
- [ ] **Search** · `screens-3.jsx:130` · input + fuzzy sur titre +
      ingrédients.
- [ ] **Shopping** · `screens-3.jsx:220` · grouper par `cat` · check off
      persisté.
- [ ] **RecipeEditor** · `screens-5.jsx:84` · formulaire dynamique
      ingrédients/étapes.
- [ ] **Nutrition** · `screens-5.jsx:316` · anneau kcal + barre macros
      tricolore.

## Intégrations natives

- [ ] **Share extension iOS** · créer target dans Xcode après
      `expo prebuild` · handler reçoit l'URL, la transmet à l'app via
      App Group.
- [ ] **Android intent filter** · déjà défini dans `app.json` · tester
      le routage vers un écran `handle-share.tsx`.
- [ ] **expo-camera** pour PhotoMode.
- [ ] **expo-haptics** sur chaque transition d'étape (CookMode).
- [ ] **expo-notifications** pour les timers de recette (background).

## Backend extraction

Projet séparé · FastAPI + workers.

- [ ] `POST /extract` accepte URL ou fichier image.
- [ ] Pipeline : yt-dlp (download) → Whisper (transcription) → LLM
      prompt structurant → USDA/CIQUAL API (kcal / macros).
- [ ] Renvoie un JSON `Recipe` identique au type TS du client.
- [ ] Héberge sur Vercel (Edge Functions) ou Railway · Supabase pour
      storage.

## Infra

- [ ] Repo GitHub public ou privé (branche `feat/expo-core`).
- [ ] Workflow GH Actions · typecheck sur chaque PR.
- [ ] Secrets EAS · `EXPO_TOKEN` dans GH Actions pour builds CI.
- [ ] Icons 1024×1024 et splash · remplacer `./assets/*.png`
      placeholders par des rendus Cooky.

## Design

- [ ] Assets photographiques réels en remplacement des
      `FoodPlaceholder` gradients.
- [ ] Dark mode global (`useColorScheme`).
- [ ] Dynamic Type support iOS (tokens ne se scalent pas encore).
