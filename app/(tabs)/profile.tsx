import { View, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cooky } from '../../src/design/Cooky';
import { Eyebrow } from '../../src/design/ui/Eyebrow';
import { useLang } from '../../src/design/i18n';
import { tokens } from '../../src/design/tokens';

export default function ProfileScreen() {
  const { t, lang, setLang } = useLang();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 16 }}>
        <Eyebrow>{t('profile').toUpperCase()}</Eyebrow>
        <Text
          style={{
            fontFamily: tokens.serif,
            fontSize: 40,
            color: tokens.ink,
            letterSpacing: -1,
            marginTop: 4,
          }}
        >
          {lang === 'fr' ? 'Adam' : 'Adam'}
        </Text>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Cooky size={160} pose="happy" />
        </View>

        <Pressable
          onPress={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          style={{
            padding: 18,
            borderRadius: 16,
            backgroundColor: tokens.paper,
            borderWidth: 1,
            borderColor: tokens.line,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24,
          }}
        >
          <Text style={{ fontFamily: tokens.sansMedium, fontSize: 15, color: tokens.ink }}>
            {t('language')}
          </Text>
          <Text style={{ fontFamily: tokens.mono, fontSize: 13, color: tokens.saffron, letterSpacing: 1.5 }}>
            {lang.toUpperCase()}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
