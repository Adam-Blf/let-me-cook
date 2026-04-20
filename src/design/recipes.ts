// Let Me Cook · seed data porté depuis src/recipes.js
import type { AccentTone } from './tokens';

export type SourcePlatform = 'tiktok' | 'reels' | 'youtube' | 'facebook' | 'pinterest' | 'web' | 'book';

export type Ingredient = { q: string; u: string; name: string; cat: 'produce' | 'dairy' | 'meat' | 'pantry' };
export type Step = { t: string; timer: number | null };
export type Nutrition = { kcal: number; protein: number; carbs: number; fat: number; fiber: number };
export type LangPayload = {
  title: string;
  subtitle: string;
  tags: string[];
  prep?: string;
  cook?: string;
  total?: string;
  servings?: number;
  ingredients?: Ingredient[];
  steps?: Step[];
};

export type Recipe = {
  id: string;
  tone: AccentTone;
  source: SourcePlatform;
  sourceAuthor: string;
  duration: string | null;
  cookedCount: number;
  lastCookedDays: number | null;
  nutrition: Nutrition;
  fr: LangPayload;
  en: LangPayload;
};

export const recipes: Recipe[] = [
  {
    id: 'carbonara', tone: 'cream', source: 'tiktok',
    sourceAuthor: '@nonnaroma', duration: '0:47',
    cookedCount: 4, lastCookedDays: 2,
    nutrition: { kcal: 685, protein: 32, carbs: 68, fat: 28, fiber: 4 },
    fr: {
      title: 'Carbonara crémeuse', subtitle: 'La vraie, sans crème.',
      tags: ['Dîner', 'Italien', '20 min'],
      prep: '5 min', cook: '15 min', total: '20 min', servings: 2,
      ingredients: [
        { q: '200', u: 'g', name: 'spaghetti', cat: 'pantry' },
        { q: '100', u: 'g', name: 'guanciale', cat: 'meat' },
        { q: '2', u: '', name: "jaunes d'œufs", cat: 'dairy' },
        { q: '1', u: '', name: 'œuf entier', cat: 'dairy' },
        { q: '50', u: 'g', name: 'pecorino romano râpé', cat: 'dairy' },
        { q: '1', u: 'c.à.c', name: 'poivre noir moulu', cat: 'pantry' },
      ],
      steps: [
        { t: "Fais chauffer une grande casserole d'eau bien salée.", timer: null },
        { t: 'Coupe le guanciale en lardons, fais-les dorer à feu moyen.', timer: 6 },
        { t: 'Mélange jaunes, œuf, pecorino, beaucoup de poivre.', timer: null },
        { t: "Cuis les pâtes al dente. Garde 1 tasse d'eau.", timer: 9 },
        { t: "Hors du feu, ajoute pâtes + œuf-fromage + 3 c.à.s d'eau. Remue vite.", timer: null },
        { t: 'Sers avec pecorino et poivre.', timer: null },
      ],
    },
    en: {
      title: 'Creamy Carbonara', subtitle: 'The real one, no cream.',
      tags: ['Dinner', 'Italian', '20 min'],
      prep: '5 min', cook: '15 min', total: '20 min', servings: 2,
      ingredients: [
        { q: '200', u: 'g', name: 'spaghetti', cat: 'pantry' },
        { q: '100', u: 'g', name: 'guanciale', cat: 'meat' },
        { q: '2', u: '', name: 'egg yolks', cat: 'dairy' },
        { q: '1', u: '', name: 'whole egg', cat: 'dairy' },
        { q: '50', u: 'g', name: 'grated pecorino', cat: 'dairy' },
        { q: '1', u: 'tsp', name: 'black pepper', cat: 'pantry' },
      ],
      steps: [
        { t: 'Bring a large pot of salted water to a boil.', timer: null },
        { t: 'Dice guanciale. Render over medium heat until golden.', timer: 6 },
        { t: 'Whisk yolks, egg, pecorino, lots of pepper.', timer: null },
        { t: 'Cook pasta al dente. Reserve 1 cup of water.', timer: 9 },
        { t: 'Off heat: pasta + egg-cheese + 3 tbsp water. Stir fast.', timer: null },
        { t: 'Serve with pecorino and pepper.', timer: null },
      ],
    },
  },
  {
    id: 'mango-sticky', tone: 'saffron', source: 'reels',
    sourceAuthor: '@thaichef', duration: '1:12', cookedCount: 2, lastCookedDays: 14,
    nutrition: { kcal: 420, protein: 6, carbs: 82, fat: 9, fiber: 3 },
    fr: { title: 'Riz gluant mangue', subtitle: 'Dessert thaï iconique.', tags: ['Dessert', 'Thaï', '45 min'], prep: '30 min', cook: '15 min', servings: 4, ingredients: [], steps: [] },
    en: { title: 'Mango Sticky Rice', subtitle: 'Iconic Thai dessert.', tags: ['Dessert', 'Thai', '45 min'], prep: '30 min', cook: '15 min', servings: 4, ingredients: [], steps: [] },
  },
  {
    id: 'shakshuka', tone: 'tomato', source: 'youtube',
    sourceAuthor: '@mediterranea', duration: '0:58', cookedCount: 7, lastCookedDays: 1,
    nutrition: { kcal: 310, protein: 18, carbs: 22, fat: 17, fiber: 5 },
    fr: { title: 'Shakshuka', subtitle: "Brunch d'Afrique du Nord.", tags: ['Brunch', 'Végé', '25 min'], prep: '5 min', cook: '20 min', servings: 3 },
    en: { title: 'Shakshuka', subtitle: 'North-African brunch.', tags: ['Brunch', 'Veggie', '25 min'], prep: '5 min', cook: '20 min', servings: 3 },
  },
  {
    id: 'cookies', tone: 'espresso', source: 'pinterest',
    sourceAuthor: '@bakehouse', duration: '0:30', cookedCount: 11, lastCookedDays: 5,
    nutrition: { kcal: 215, protein: 3, carbs: 28, fat: 11, fiber: 1 },
    fr: { title: 'Cookies chocolat', subtitle: 'Croustillants dehors, fondants dedans.', tags: ['Dessert', '25 min'] },
    en: { title: 'Chocolate cookies', subtitle: 'Crisp outside, gooey inside.', tags: ['Dessert', '25 min'] },
  },
  {
    id: 'ramen', tone: 'plum', source: 'facebook',
    sourceAuthor: 'Ramen Club', duration: '2:04', cookedCount: 0, lastCookedDays: null,
    nutrition: { kcal: 760, protein: 38, carbs: 72, fat: 34, fiber: 5 },
    fr: { title: 'Ramen tonkotsu', subtitle: '18h de patience.', tags: ['Dîner', 'Japonais'] },
    en: { title: 'Tonkotsu ramen', subtitle: '18h of broth patience.', tags: ['Dinner', 'Japanese'] },
  },
  {
    id: 'salad', tone: 'olive', source: 'web',
    sourceAuthor: 'greenblog.fr', duration: null, cookedCount: 3, lastCookedDays: 8,
    nutrition: { kcal: 390, protein: 18, carbs: 42, fat: 16, fiber: 9 },
    fr: { title: 'Salade lentilles feta', subtitle: 'Fraîche, protéinée.', tags: ['Rapide', 'Végé', '15 min'] },
    en: { title: 'Lentil feta salad', subtitle: 'Fresh and high protein.', tags: ['Quick', 'Veggie', '15 min'] },
  },
  {
    id: 'tacos', tone: 'saffron', source: 'tiktok',
    sourceAuthor: '@tacomaria', duration: '0:22', cookedCount: 1, lastCookedDays: 21,
    nutrition: { kcal: 480, protein: 24, carbs: 48, fat: 21, fiber: 6 },
    fr: { title: 'Tacos al pastor', subtitle: 'Ananas, porc mariné.', tags: ['Dîner', 'Mex'] },
    en: { title: 'Tacos al pastor', subtitle: 'Pineapple, marinated pork.', tags: ['Dinner', 'Mex'] },
  },
  {
    id: 'galette', tone: 'cream', source: 'book',
    sourceAuthor: 'Livre grand-mère', duration: null, cookedCount: 0, lastCookedDays: null,
    nutrition: { kcal: 340, protein: 14, carbs: 38, fat: 14, fiber: 4 },
    fr: { title: 'Galette bretonne', subtitle: 'Sarrasin, œuf, jambon.', tags: ['Rapide', 'Français'] },
    en: { title: 'Breton galette', subtitle: 'Buckwheat, egg, ham.', tags: ['Quick', 'French'] },
  },
];

export const recipeById = (id: string) => recipes.find((r) => r.id === id);
