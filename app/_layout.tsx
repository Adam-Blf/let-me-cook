import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, InstrumentSerif_400Regular, InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif';
import { Geist_400Regular, Geist_500Medium, Geist_700Bold } from '@expo-google-fonts/geist';
import { GeistMono_400Regular } from '@expo-google-fonts/geist-mono';
import { LangProvider } from '../src/design/i18n';
import { SubscriptionProvider } from '../src/subscription/useSubscription';
import { tokens } from '../src/design/tokens';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InstrumentSerif: InstrumentSerif_400Regular,
    InstrumentSerifItalic: InstrumentSerif_400Regular_Italic,
    Geist: Geist_400Regular,
    GeistMedium: Geist_500Medium,
    GeistBold: Geist_700Bold,
    GeistMono: GeistMono_400Regular,
  });

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: tokens.cream }} />;

  return (
    <SafeAreaProvider>
      <LangProvider>
        <SubscriptionProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: tokens.cream },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="paywall" options={{ presentation: 'modal', gestureEnabled: false }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="recipe/[id]" options={{ presentation: 'card' }} />
          </Stack>
        </SubscriptionProvider>
      </LangProvider>
    </SafeAreaProvider>
  );
}
