// Placeholder pour écrans à porter · design aligné sur la maquette
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cooky } from '../Cooky';
import { Eyebrow } from './Eyebrow';
import { tokens } from '../tokens';

export function ScreenStub({
  eyebrow,
  title,
  description,
  pose = 'thinking',
}: {
  eyebrow: string;
  title: string;
  description: string;
  pose?: 'wave' | 'cooking' | 'watching' | 'thinking' | 'happy' | 'sleeping' | 'default';
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
        <Cooky size={150} pose={pose} />
        <View style={{ height: 24 }} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <Text
          style={{
            fontFamily: tokens.serif,
            fontSize: 36,
            color: tokens.ink,
            textAlign: 'center',
            letterSpacing: -0.6,
            marginTop: 10,
            lineHeight: 38,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: tokens.sans,
            fontSize: 15,
            color: tokens.inkMuted,
            textAlign: 'center',
            lineHeight: 22,
            marginTop: 12,
            maxWidth: 280,
          }}
        >
          {description}
        </Text>
      </View>
    </SafeAreaView>
  );
}
