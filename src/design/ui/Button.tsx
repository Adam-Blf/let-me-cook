import React from 'react';
import { Pressable, Text, View, ViewStyle, TextStyle } from 'react-native';
import { tokens } from '../tokens';

type Variant = 'primary' | 'saffron' | 'secondary' | 'ghost';

export function Button({
  variant = 'primary',
  children,
  onPress,
  fullWidth = false,
  style,
}: {
  variant?: Variant;
  children: React.ReactNode;
  onPress?: () => void;
  fullWidth?: boolean;
  style?: ViewStyle;
}) {
  const bg =
    variant === 'primary' ? tokens.ink :
    variant === 'saffron' ? tokens.saffron :
    variant === 'secondary' ? tokens.paper :
    'transparent';

  const fg =
    variant === 'primary' ? tokens.cream :
    variant === 'saffron' ? tokens.espresso :
    variant === 'secondary' ? tokens.ink :
    tokens.ink;

  const border: ViewStyle =
    variant === 'secondary' ? { borderWidth: 1, borderColor: tokens.line } : {};

  const wrap: ViewStyle = {
    height: 52,
    borderRadius: 999,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bg,
    ...(fullWidth ? { alignSelf: 'stretch' } : {}),
    ...border,
    ...style,
  };

  const textStyle: TextStyle = {
    color: fg,
    fontFamily: tokens.sansMedium,
    fontSize: 15,
    letterSpacing: 0.2,
  };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [wrap, pressed && { opacity: 0.85 }]}>
      {typeof children === 'string' ? <Text style={textStyle}>{children}</Text> : <View>{children}</View>}
    </Pressable>
  );
}
