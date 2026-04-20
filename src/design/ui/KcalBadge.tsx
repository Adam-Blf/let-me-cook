import React from 'react';
import { View, Text } from 'react-native';
import { tokens } from '../tokens';

export function KcalBadge({ kcal }: { kcal: number }) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: tokens.saffronSoft,
        borderRadius: 999,
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'flex-start',
        gap: 4,
      }}
    >
      <Text style={{ fontFamily: tokens.mono, fontSize: 12, color: tokens.espresso, fontWeight: '600' }}>
        {kcal}
      </Text>
      <Text style={{ fontFamily: tokens.mono, fontSize: 9, color: tokens.espresso, letterSpacing: 1 }}>
        KCAL
      </Text>
    </View>
  );
}
