// Let Me Cook · design tokens (porté depuis prototype web)
export const tokens = {
  // typographie (les noms correspondent aux fichiers chargés via expo-font)
  serif: 'InstrumentSerifItalic',
  serifRegular: 'InstrumentSerif',
  sans: 'Geist',
  sansMedium: 'GeistMedium',
  sansBold: 'GeistBold',
  mono: 'GeistMono',

  // palette gourmande chaleureuse
  cream: '#F6F1E8',
  creamSoft: '#EDE5D3',
  paper: '#FBF8F1',
  ink: '#1A1511',
  inkSoft: '#3D342B',
  inkMuted: '#7A6D5E',
  inkFaint: '#B8AD9A',
  line: 'rgba(26,21,17,0.08)',
  lineStrong: 'rgba(26,21,17,0.16)',

  // accents edible
  saffron: '#D97A27',
  saffronSoft: '#F3D9B1',
  tomato: '#C44536',
  olive: '#6B7A3A',
  honey: '#C99A3A',
  plum: '#6B3A4A',
  basil: '#4A6B3A',

  // surfaces dark (cook mode)
  espresso: '#1C1612',
  espressoCard: '#2A201A',
} as const;

export type AccentTone = 'cream' | 'saffron' | 'tomato' | 'olive' | 'honey' | 'plum' | 'basil' | 'espresso';
