import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { tokens } from '../tokens';
import type { AccentTone } from '../tokens';

const toneMap: Record<string, [string, string]> = {
  cream: [tokens.creamSoft, tokens.cream],
  saffron: [tokens.saffronSoft, tokens.saffron],
  tomato: ['#E8A59A', tokens.tomato],
  olive: ['#B5BE94', tokens.olive],
  honey: ['#E8D19A', tokens.honey],
  plum: ['#B08FA0', tokens.plum],
  basil: ['#9BBE89', tokens.basil],
  espresso: ['#5A4A3F', tokens.espresso],
};

export function FoodPlaceholder({
  tone = 'saffron',
  radius = 18,
  height,
  aspect = '4/3',
  style,
}: {
  tone?: AccentTone;
  radius?: number;
  height?: number;
  aspect?: '1/1' | '4/3' | '3/4' | '16/9';
  style?: ViewStyle;
}) {
  const [c1, c2] = toneMap[tone] ?? toneMap.saffron;
  const ratio: Record<string, number> = { '1/1': 1, '4/3': 4 / 3, '3/4': 3 / 4, '16/9': 16 / 9 };
  const box: ViewStyle = height
    ? { height }
    : { aspectRatio: ratio[aspect] };

  return (
    <View style={[{ borderRadius: radius, overflow: 'hidden' }, box, style]}>
      <LinearGradient
        colors={[c1, c2] as unknown as readonly [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
