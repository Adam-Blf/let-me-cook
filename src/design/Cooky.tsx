// Cooky · mascotte 2D flat portée en react-native-svg
import React from 'react';
import { View, ViewStyle, Text } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

export type CookyPose = 'default' | 'wave' | 'cooking' | 'watching' | 'thinking' | 'happy' | 'sleeping';

const SKIN = '#E8C9A8';
const HAT = '#FBF8F1';
const HAT_SHADOW = '#E8E0CE';
const NECK = '#C44536';
const NECK_DARK = '#A03528';
const APRON = '#FBF8F1';
const EYE = '#1A1511';
const CHEEK = '#E8A896';
const MUSTACHE = '#3D342B';

export function Cooky({ size = 120, pose = 'default', style }: { size?: number; pose?: CookyPose; style?: ViewStyle }) {
  return (
    <View style={[{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Svg viewBox="0 0 120 120" width={size} height={size}>
        {/* apron/body */}
        <Path d="M30 108 Q30 88 42 84 L78 84 Q90 88 90 108 Z" fill={APRON} />
        <Path d="M30 108 Q30 88 42 84 L78 84 Q90 88 90 108 Z" fill="none" stroke={HAT_SHADOW} strokeWidth={1} />
        <Circle cx={60} cy={95} r={1.8} fill={NECK} />
        {/* neckerchief */}
        <Path d="M44 82 L60 86 L76 82 L72 92 L60 90 L48 92 Z" fill={NECK} />
        <Path d="M60 86 L60 90" stroke={NECK_DARK} strokeWidth={0.8} />
        {/* face */}
        <Circle cx={60} cy={66} r={18} fill={SKIN} />
        <Ellipse cx={41} cy={66} rx={2.5} ry={3.5} fill={SKIN} />
        <Ellipse cx={79} cy={66} rx={2.5} ry={3.5} fill={SKIN} />
        <Ellipse cx={46} cy={70} rx={3} ry={2} fill={CHEEK} opacity={0.55} />
        <Ellipse cx={74} cy={70} rx={3} ry={2} fill={CHEEK} opacity={0.55} />
        {/* eyes */}
        {renderEyes(pose)}
        {/* mustache */}
        <Path d="M52 70 Q55 73 60 71 Q65 73 68 70 Q65 74 60 73 Q55 74 52 70 Z" fill={MUSTACHE} />
        {/* mouth */}
        {renderMouth(pose)}
        {/* chef hat */}
        <G>
          <Rect x={42} y={48} width={36} height={6} rx={2} fill={HAT} />
          <Circle cx={48} cy={38} r={11} fill={HAT} />
          <Circle cx={72} cy={38} r={11} fill={HAT} />
          <Circle cx={60} cy={32} r={13} fill={HAT} />
          <Circle cx={54} cy={42} r={9} fill={HAT} />
          <Circle cx={66} cy={42} r={9} fill={HAT} />
          <Circle cx={52} cy={36} r={3} fill={HAT_SHADOW} opacity={0.25} />
        </G>
        {/* arms */}
        {renderArms(pose)}
      </Svg>
    </View>
  );
}

function renderEyes(pose: CookyPose) {
  if (pose === 'sleeping') return (
    <G>
      <Path d="M47 62 Q50 64 53 62" stroke={EYE} strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <Path d="M67 62 Q70 64 73 62" stroke={EYE} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </G>
  );
  if (pose === 'watching' || pose === 'thinking') return (
    <G>
      <Circle cx={50} cy={62} r={2.6} fill={EYE} />
      <Circle cx={70} cy={62} r={2.6} fill={EYE} />
      <Circle cx={50.8} cy={61.3} r={0.8} fill="#fff" />
      <Circle cx={70.8} cy={61.3} r={0.8} fill="#fff" />
    </G>
  );
  if (pose === 'happy') return (
    <G>
      <Path d="M46 63 Q50 58 54 63" stroke={EYE} strokeWidth={1.8} fill="none" strokeLinecap="round" />
      <Path d="M66 63 Q70 58 74 63" stroke={EYE} strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </G>
  );
  return (
    <G>
      <Ellipse cx={50} cy={62} rx={2.2} ry={2.6} fill={EYE} />
      <Ellipse cx={70} cy={62} rx={2.2} ry={2.6} fill={EYE} />
      <Circle cx={50.6} cy={61.3} r={0.7} fill="#fff" />
      <Circle cx={70.6} cy={61.3} r={0.7} fill="#fff" />
    </G>
  );
}

function renderMouth(pose: CookyPose) {
  if (pose === 'sleeping') return <Circle cx={60} cy={72} r={2} fill={EYE} opacity={0.6} />;
  if (pose === 'watching') return <Ellipse cx={60} cy={73} rx={2} ry={2.5} fill={EYE} opacity={0.7} />;
  if (pose === 'thinking') return <Path d="M56 73 L64 73" stroke={EYE} strokeWidth={1.6} strokeLinecap="round" />;
  return <Path d="M55 74 Q60 78 65 74" stroke={EYE} strokeWidth={1.6} fill="none" strokeLinecap="round" />;
}

function renderArms(pose: CookyPose) {
  if (pose === 'wave') return (
    <G>
      <Path d="M38 92 Q34 100 36 108" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
      <Path d="M82 92 Q92 80 96 68" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
      <Circle cx={97} cy={66} r={5} fill={SKIN} />
    </G>
  );
  if (pose === 'cooking') return (
    <G>
      <Path d="M38 92 Q34 96 36 102" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
      <Ellipse cx={42} cy={104} rx={10} ry={3.5} fill="#8B6F47" />
      <Path d="M82 92 Q88 88 92 82" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
    </G>
  );
  if (pose === 'thinking') return (
    <G>
      <Path d="M38 92 Q34 100 36 108" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
      <Path d="M82 92 Q76 80 70 76" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
      <Circle cx={70} cy={76} r={5} fill={SKIN} />
    </G>
  );
  return (
    <G>
      <Path d="M38 92 Q34 100 36 108" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
      <Path d="M82 92 Q86 100 84 108" stroke={APRON} strokeWidth={9} fill="none" strokeLinecap="round" />
    </G>
  );
}

export function CookyMark({ size = 40, color = '#1A1511' }: { size?: number; color?: string }) {
  return (
    <Svg viewBox="0 0 48 48" width={size} height={size}>
      <Rect x={13} y={22} width={22} height={5} rx={1.5} fill={color} />
      <Circle cx={17} cy={16} r={6} fill={color} />
      <Circle cx={31} cy={16} r={6} fill={color} />
      <Circle cx={24} cy={13} r={7} fill={color} />
      <Circle cx={24} cy={33} r={8} fill={color} />
      <Circle cx={21} cy={32} r={1.2} fill="#FBF8F1" />
      <Circle cx={27} cy={32} r={1.2} fill="#FBF8F1" />
      <Path d="M19.5 35 Q22 37 24 35.5 Q26 37 28.5 35" stroke="#FBF8F1" strokeWidth={1} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function CookyWordmark({ color = '#1A1511', size = 28 }: { color?: string; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <CookyMark size={size * 1.3} color={color} />
      <Text style={{ fontFamily: 'InstrumentSerifItalic', fontSize: size, color, letterSpacing: -0.5 }}>
        Let Me Cook
      </Text>
    </View>
  );
}
