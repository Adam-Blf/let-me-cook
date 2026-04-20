// Let Me Cook · dictionnaire FR / EN
export type Lang = 'fr' | 'en';

type Dict = Record<string, string>;

export const dictionaries: Record<Lang, Dict> = {
  fr: {
    tagline_sub: "Tes recettes préférées, extraites de n'importe quelle vidéo.",
    punkt: '· Cooky, le petit chef ·',
    get_started: 'Commencer',
    skip: 'Passer',
    next: 'Suivant',
    onboard_1_title: "Partage une vidéo,\nCooky s'occupe du reste.",
    onboard_1_body: 'TikTok, Reels, YouTube, Facebook, Pinterest, un blog, un livre photographié. Cooky comprend tout.',
    onboard_2_title: 'Ingrédients,\nétapes, timers.',
    onboard_2_body: 'Il regarde la vidéo, écoute l\'audio, structure la recette. Quantités exactes, étapes numérotées.',
    onboard_3_title: 'Cuisine les mains libres.',
    onboard_3_body: 'Un mode cuisine en gros caractères, commandes vocales, timers intégrés. Comme un chef qui te dicte.',
    extracting: 'EXTRACTION EN COURS',
    extracting_sub: 'Cooky regarde la vidéo.',
    prep: 'Préparation',
    cook: 'Cuisson',
    servings: 'Portions',
    ingredients: 'Ingrédients',
    steps: 'Étapes',
    start_cooking: 'Commencer à cuisiner',
    add_to_list: 'Liste de courses',
    step_of: 'Étape',
    of: 'sur',
    timer: 'Minuteur',
    tap_to_continue: 'Étape suivante',
    done: 'Terminé',
    finished_title: 'Bon appétit.',
    finished_sub: 'Ta recette est sauvegardée dans ta bibliothèque.',
    rate_dish: 'Note le plat',
    cooked_count: 'cuisinée',
    cooked_count_plural: 'cuisinées',
    library: 'Bibliothèque',
    library_sub: 'recettes sauvegardées',
    recent: 'Récemment ajoutées',
    collections: 'Collections',
    search: 'Rechercher une recette, un ingrédient...',
    filter_all: 'Tout',
    filter_quick: 'Rapide',
    filter_veggie: 'Végé',
    filter_dinner: 'Dîner',
    filter_dessert: 'Dessert',
    shopping_list: 'Liste de courses',
    shopping_sub: 'articles à acheter',
    produce: 'Fruits & légumes',
    dairy: 'Produits laitiers',
    meat: 'Viande & poisson',
    pantry: 'Épicerie',
    profile: 'Profil',
    my_recipes: 'Mes recettes',
    language: 'Langue',
    usage_times: 'fois',
    last_cooked: 'Cuisinée',
    never_cooked: 'Jamais cuisinée',
    total_cooks: 'plats cuisinés ce mois-ci',
    write_your_own: 'Écrire une recette',
    import_recipe: 'Importer depuis une vidéo',
    create_manually: 'Créer à la main',
    choose_source: 'Comment commencer ?',
    calories: 'Calories',
    kcal: 'kcal',
    per_serving: 'par portion',
    nutrition: 'Nutrition',
  },
  en: {
    tagline_sub: 'Your favorite recipes, pulled from any video.',
    punkt: '· Cooky, the little chef ·',
    get_started: 'Get started',
    skip: 'Skip',
    next: 'Next',
    onboard_1_title: 'Share a video,\nCooky handles the rest.',
    onboard_1_body: 'TikTok, Reels, YouTube, Facebook, Pinterest, a blog, a photographed book. Cooky gets it.',
    onboard_2_title: 'Ingredients,\nsteps, timers.',
    onboard_2_body: 'Watches the video, listens to the audio, structures the recipe. Exact amounts, numbered steps.',
    onboard_3_title: 'Cook hands-free.',
    onboard_3_body: 'Big-type cook mode, voice commands, built-in timers. Like a chef reading to you.',
    extracting: 'EXTRACTING',
    extracting_sub: 'Cooky is watching the video.',
    prep: 'Prep',
    cook: 'Cook',
    servings: 'Servings',
    ingredients: 'Ingredients',
    steps: 'Steps',
    start_cooking: 'Start cooking',
    add_to_list: 'Shopping list',
    step_of: 'Step',
    of: 'of',
    timer: 'Timer',
    tap_to_continue: 'Next step',
    done: 'Done',
    finished_title: 'Bon appétit.',
    finished_sub: 'Your recipe is saved to your library.',
    rate_dish: 'Rate the dish',
    cooked_count: 'cooked',
    cooked_count_plural: 'cooked',
    library: 'Library',
    library_sub: 'saved recipes',
    recent: 'Recently added',
    collections: 'Collections',
    search: 'Search recipes, ingredients...',
    filter_all: 'All',
    filter_quick: 'Quick',
    filter_veggie: 'Veggie',
    filter_dinner: 'Dinner',
    filter_dessert: 'Dessert',
    shopping_list: 'Shopping list',
    shopping_sub: 'items to buy',
    produce: 'Produce',
    dairy: 'Dairy',
    meat: 'Meat & fish',
    pantry: 'Pantry',
    profile: 'Profile',
    my_recipes: 'My recipes',
    language: 'Language',
    usage_times: 'times',
    last_cooked: 'Last cooked',
    never_cooked: 'Never cooked yet',
    total_cooks: 'dishes cooked this month',
    write_your_own: 'Write your own',
    import_recipe: 'Import from a video',
    create_manually: 'Create manually',
    choose_source: 'How to start?',
    calories: 'Calories',
    kcal: 'kcal',
    per_serving: 'per serving',
    nutrition: 'Nutrition',
  },
};

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const Ctx = createContext<LangCtx>({ lang: 'fr', setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    AsyncStorage.getItem('lmc_lang').then((v) => {
      if (v === 'fr' || v === 'en') setLangState(v);
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    void AsyncStorage.setItem('lmc_lang', l);
  }, []);

  const t = useCallback((key: string) => dictionaries[lang][key] ?? key, [lang]);
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
