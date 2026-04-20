// Onboarding (3 étapes) · porté depuis src/screens-1.jsx
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cooky, type CookyPose } from '../src/design/Cooky';
import { Button } from '../src/design/ui/Button';
import { useLang } from '../src/design/i18n';
import { tokens } from '../src/design/tokens';

const STEPS: { titleKey: string; bodyKey: string; pose: CookyPose; tone: string }[] = [
  { titleKey: 'onboard_1_title', bodyKey: 'onboard_1_body', pose: 'watching', tone: tokens.saffronSoft },
  { titleKey: 'onboard_2_title', bodyKey: 'onboard_2_body', pose: 'thinking', tone: tokens.creamSoft },
  { titleKey: 'onboard_3_title', bodyKey: 'onboard_3_body', pose: 'cooking', tone: '#F3E2B8' },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const { t } = useLang();

  const finish = async () => {
    await AsyncStorage.setItem('lmc_onboarded', '1');
    router.replace('/paywall');
  };

  const next = () => (step < STEPS.length - 1 ? setStep(step + 1) : finish());
  const current = STEPS[step];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <View style={{ flex: 1 }}>
        {/* hero illustration zone */}
        <View style={{ flex: 1.1, backgroundColor: current.tone, alignItems: 'center', justifyContent: 'center' }}>
          <Cooky size={220} pose={current.pose} />
        </View>

        {/* text zone */}
        <View style={{ flex: 1, paddingHorizontal: 28, paddingTop: 34, paddingBottom: 24 }}>
          <View style={{ flexDirection: 'row', gap: 6, marginBottom: 24 }}>
            {STEPS.map((_, i) => (
              <View
                key={i}
                style={{
                  height: 3,
                  flex: 1,
                  borderRadius: 2,
                  backgroundColor: i <= step ? tokens.ink : tokens.line,
                }}
              />
            ))}
          </View>

          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 34,
              lineHeight: 38,
              color: tokens.ink,
              letterSpacing: -0.6,
            }}
          >
            {t(current.titleKey)}
          </Text>

          <Text
            style={{
              fontFamily: tokens.sans,
              fontSize: 15,
              lineHeight: 22,
              color: tokens.inkMuted,
              marginTop: 14,
            }}
          >
            {t(current.bodyKey)}
          </Text>

          <View style={{ flex: 1 }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={finish} style={{ padding: 12 }}>
              <Text style={{ fontFamily: tokens.sansMedium, fontSize: 14, color: tokens.inkMuted }}>
                {t('skip')}
              </Text>
            </Pressable>
            <Button variant="primary" onPress={next}>
              {step < STEPS.length - 1 ? t('next') : t('get_started')}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
