// Splash screen · porté depuis src/screens-1.jsx (Splash)
import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { Cooky } from '../src/design/Cooky';
import { Eyebrow } from '../src/design/ui/Eyebrow';
import { Button } from '../src/design/ui/Button';
import { useLang } from '../src/design/i18n';
import { useSubscription } from '../src/subscription/useSubscription';
import { tokens } from '../src/design/tokens';

export default function SplashScreen() {
  const router = useRouter();
  const { t, lang, setLang } = useLang();
  const { isActive, loading } = useSubscription();

  useEffect(() => {
    if (loading) return;
    (async () => {
      const onboarded = await AsyncStorage.getItem('lmc_onboarded');
      if (onboarded !== '1') return;
      router.replace(isActive ? '/(tabs)/library' : '/paywall');
    })();
  }, [loading, isActive]);

  return (
    <LinearGradient
      colors={[tokens.saffronSoft, tokens.cream]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
          <Cooky size={170} pose="wave" />
          <View style={{ height: 28 }} />
          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 52,
              lineHeight: 52,
              color: tokens.ink,
              textAlign: 'center',
              letterSpacing: -1,
            }}
          >
            Let Me Cook
          </Text>
          <View style={{ height: 14 }} />
          <Text
            style={{
              fontFamily: tokens.sans,
              fontSize: 16,
              color: tokens.inkSoft,
              textAlign: 'center',
              maxWidth: 280,
              lineHeight: 23,
            }}
          >
            {t('tagline_sub')}
          </Text>
          <View style={{ height: 22 }} />
          <Eyebrow>{t('punkt')}</Eyebrow>
        </View>

        <View style={{ paddingHorizontal: 24, paddingBottom: 24, gap: 10 }}>
          <Button variant="primary" fullWidth onPress={() => router.push('/onboarding')}>
            {t('get_started')}
          </Button>
          <Pressable onPress={() => setLang(lang === 'fr' ? 'en' : 'fr')} style={{ alignSelf: 'center', padding: 8 }}>
            <Text style={{ fontFamily: tokens.mono, fontSize: 12, color: tokens.inkMuted, letterSpacing: 1.5 }}>
              {lang.toUpperCase()} · tap to switch
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
