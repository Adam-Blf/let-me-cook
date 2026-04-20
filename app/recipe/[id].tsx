// Recipe detail · port partiel de src/screens-2.jsx (Recipe)
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { recipeById } from '../../src/design/recipes';
import { FoodPlaceholder } from '../../src/design/ui/FoodPlaceholder';
import { KcalBadge } from '../../src/design/ui/KcalBadge';
import { Eyebrow } from '../../src/design/ui/Eyebrow';
import { Button } from '../../src/design/ui/Button';
import { useLang } from '../../src/design/i18n';
import { tokens } from '../../src/design/tokens';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t, lang } = useLang();
  const recipe = recipeById(id ?? '');

  if (!recipe) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: tokens.serif, fontSize: 28, color: tokens.ink }}>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  const data = recipe[lang];

  return (
    <View style={{ flex: 1, backgroundColor: tokens.cream }}>
      {/* hero */}
      <View style={{ height: 360 }}>
        <FoodPlaceholder tone={recipe.tone} radius={0} height={360} />
        <LinearGradient
          colors={['rgba(0,0,0,0.25)', 'transparent', 'rgba(26,21,17,0.55)'] as unknown as readonly [string, string, string]}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <SafeAreaView style={{ position: 'absolute', left: 0, right: 0, top: 0 }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 6 }}>
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: 'rgba(251,248,241,0.92)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: tokens.ink, fontSize: 18 }}>‹</Text>
            </Pressable>
          </View>
        </SafeAreaView>
        <View style={{ position: 'absolute', left: 20, right: 20, bottom: 20 }}>
          <Text style={{ fontFamily: tokens.mono, fontSize: 11, color: tokens.cream, letterSpacing: 1.8, opacity: 0.85 }}>
            {recipe.source.toUpperCase()} · {recipe.sourceAuthor}
          </Text>
          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 38,
              color: tokens.cream,
              letterSpacing: -0.8,
              lineHeight: 40,
              marginTop: 6,
            }}
          >
            {data.title}
          </Text>
          <Text style={{ color: tokens.cream, fontSize: 14, opacity: 0.88, marginTop: 6 }}>{data.subtitle}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80, gap: 18 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <KcalBadge kcal={recipe.nutrition.kcal} />
          {data.prep && (
            <Text style={{ fontFamily: tokens.mono, fontSize: 12, color: tokens.inkMuted }}>
              {t('prep')} {data.prep}
            </Text>
          )}
          {data.cook && (
            <Text style={{ fontFamily: tokens.mono, fontSize: 12, color: tokens.inkMuted }}>
              {t('cook')} {data.cook}
            </Text>
          )}
        </View>

        {data.ingredients && data.ingredients.length > 0 && (
          <View>
            <Eyebrow>{t('ingredients').toUpperCase()}</Eyebrow>
            <View style={{ gap: 8, marginTop: 10 }}>
              {data.ingredients.map((ing, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: tokens.line,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: tokens.mono,
                      fontSize: 13,
                      color: tokens.saffron,
                      width: 70,
                    }}
                  >
                    {ing.q} {ing.u}
                  </Text>
                  <Text style={{ fontFamily: tokens.sans, fontSize: 15, color: tokens.ink, flex: 1 }}>{ing.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.steps && data.steps.length > 0 && (
          <View>
            <Eyebrow>{t('steps').toUpperCase()}</Eyebrow>
            <View style={{ gap: 14, marginTop: 10 }}>
              {data.steps.map((s, i) => (
                <View key={i} style={{ flexDirection: 'row', gap: 14 }}>
                  <Text
                    style={{
                      fontFamily: tokens.serif,
                      fontSize: 28,
                      color: tokens.saffron,
                      letterSpacing: -0.4,
                      minWidth: 28,
                    }}
                  >
                    {i + 1}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: tokens.sans,
                        fontSize: 15,
                        color: tokens.inkSoft,
                        lineHeight: 22,
                      }}
                    >
                      {s.t}
                    </Text>
                    {s.timer !== null && (
                      <Text
                        style={{
                          fontFamily: tokens.mono,
                          fontSize: 11,
                          color: tokens.tomato,
                          marginTop: 4,
                          letterSpacing: 1,
                        }}
                      >
                        {t('timer').toUpperCase()} · {s.timer} {t('minutes') || 'min'}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <Button variant="saffron" fullWidth onPress={() => {}}>
          {t('start_cooking')}
        </Button>
      </ScrollView>
    </View>
  );
}
