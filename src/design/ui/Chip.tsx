import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';
import { tokens } from '../tokens';

export function Chip({
  active = false,
  children,
  onPress,
  style,
}: {
  active?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 32,
          paddingHorizontal: 14,
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active ? tokens.ink : tokens.paper,
          borderWidth: 1,
          borderColor: active ? tokens.ink : tokens.line,
        },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <Text
        style={{
          color: active ? tokens.cream : tokens.inkSoft,
          fontFamily: tokens.sansMedium,
          fontSize: 13,
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
