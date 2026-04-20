// Source picker · porté en version simplifiée depuis src/screens-5.jsx (SourcePicker)
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Cooky } from '../../src/design/Cooky';
import { Eyebrow } from '../../src/design/ui/Eyebrow';
import { useLang } from '../../src/design/i18n';
import { tokens } from '../../src/design/tokens';

export default function AddScreen() {
  const { t } = useLang();
  const router = useRouter();

  const options: { icon: string; title: string; subtitle: string; onPress: () => void }[] = [
    {
      icon: '▶',
      title: t('import_recipe'),
      subtitle: 'TikTok · Reels · YouTube · Facebook · Pinterest',
      onPress: () => router.push('/(tabs)/library'),
    },
    {
      icon: '○',
      title: 'Photo',
      subtitle: 'Livres, magazines, notes manuscrites',
      onPress: () => router.push('/(tabs)/library'),
    },
    {
      icon: '✎',
      title: t('create_manually'),
      subtitle: t('write_your_own'),
      onPress: () => router.push('/(tabs)/library'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Eyebrow>NEW RECIPE</Eyebrow>
            <Text
              style={{
                fontFamily: tokens.serif,
                fontSize: 38,
                color: tokens.ink,
                letterSpacing: -0.9,
                marginTop: 4,
                lineHeight: 40,
              }}
            >
              {t('choose_source')}
            </Text>
          </View>
          <Cooky size={72} pose="thinking" />
        </View>

        <View style={{ gap: 12, marginTop: 32 }}>
          {options.map((o, i) => (
            <Pressable
              key={i}
              onPress={o.onPress}
              style={({ pressed }) => [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: tokens.paper,
                  borderWidth: 1,
                  borderColor: tokens.line,
                  gap: 16,
                },
                pressed && { opacity: 0.88 },
              ]}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: tokens.saffronSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 22, color: tokens.espresso }}>{o.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: tokens.sansMedium, fontSize: 16, color: tokens.ink }}>{o.title}</Text>
                <Text style={{ fontFamily: tokens.sans, fontSize: 12, color: tokens.inkMuted, marginTop: 2 }}>
                  {o.subtitle}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
