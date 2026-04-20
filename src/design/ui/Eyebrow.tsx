import React from 'react';
import { Text, TextStyle } from 'react-native';
import { tokens } from '../tokens';

export function Eyebrow({ children, color, style }: { children: React.ReactNode; color?: string; style?: TextStyle }) {
  return (
    <Text
      style={[
        {
          fontFamily: tokens.mono,
          fontSize: 11,
          letterSpacing: 1.8,
          color: color ?? tokens.inkMuted,
          textTransform: 'uppercase',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
