// Library · porté depuis src/screens-3.jsx (Library)
import { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Cooky } from '../../src/design/Cooky';
import { Chip } from '../../src/design/ui/Chip';
import { Eyebrow } from '../../src/design/ui/Eyebrow';
import { FoodPlaceholder } from '../../src/design/ui/FoodPlaceholder';
import { recipes as seed, type Recipe } from '../../src/design/recipes';
import { useLang } from '../../src/design/i18n';
import { tokens } from '../../src/design/tokens';

export default function LibraryScreen() {
  const router = useRouter();
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<string>('all');

  const totalCooked = useMemo(() => seed.reduce((s, r) => s + r.cookedCount, 0), []);

  const filters: [string, string][] = [
    ['all', t('filter_all')],
    ['quick', t('filter_quick')],
    ['veggie', t('filter_veggie')],
    ['dinner', t('filter_dinner')],
    ['dessert', t('filter_dessert')],
  ];

  const hero = seed[0];
  const rest = seed.slice(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 8, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Eyebrow>{t('library').toUpperCase()}</Eyebrow>
            <Text
              style={{
                fontFamily: tokens.serif,
                fontSize: 44,
                color: tokens.ink,
                letterSpacing: -1.2,
                lineHeight: 44,
                marginTop: 2,
              }}
            >
              {lang === 'fr' ? 'Ta cuisine' : 'Your kitchen'}
            </Text>
            <Text style={{ fontSize: 13, color: tokens.inkMuted, marginTop: 6 }}>
              {seed.length} {t('library_sub')} · <Text style={{ color: tokens.saffron }}>{totalCooked}</Text>{' '}
              {t('total_cooks')}
            </Text>
          </View>
          <Cooky size={64} pose="wave" />
        </View>

        {/* filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6, paddingHorizontal: 20, paddingTop: 18 }}
        >
          {filters.map(([k, l]) => (
            <Chip key={k} active={filter === k} onPress={() => setFilter(k)}>
              {l}
            </Chip>
          ))}
        </ScrollView>

        {/* hero recent */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Eyebrow style={{ marginBottom: 10 }}>{t('recent')}</Eyebrow>
          <Pressable onPress={() => router.push(`/recipe/${hero.id}`)} style={{ borderRadius: 20, overflow: 'hidden' }}>
            <View>
              <FoodPlaceholder aspect="4/3" tone={hero.tone} radius={0} />
              <LinearGradient
                colors={['transparent', 'rgba(26,21,17,0.75)'] as unknown as readonly [string, string]}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
              />
              <View style={{ position: 'absolute', top: 14, left: 14, flexDirection: 'row', gap: 6 }}>
                <View
                  style={{
                    backgroundColor: 'rgba(251,248,241,0.92)',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontFamily: tokens.mono, fontSize: 10, color: tokens.ink }}>
                    {hero.sourceAuthor}
                  </Text>
                </View>
              </View>
              {hero.cookedCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    backgroundColor: tokens.ink,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontFamily: tokens.mono, fontSize: 10, color: tokens.saffron, fontWeight: '600' }}>
                    {hero.cookedCount}× {t('cooked_count_plural')}
                  </Text>
                </View>
              )}
              <View style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                <Text
                  style={{
                    fontFamily: tokens.serif,
                    fontSize: 26,
                    color: tokens.cream,
                    letterSpacing: -0.6,
                    lineHeight: 28,
                  }}
                >
                  {hero[lang].title}
                </Text>
                <Text style={{ fontSize: 12, color: tokens.cream, marginTop: 6, opacity: 0.85 }}>
                  {hero[lang].subtitle} · {hero.nutrition.kcal} {t('kcal')}
                </Text>
              </View>
            </View>
          </Pressable>
        </View>

        {/* grid */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 22,
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {rest.map((r) => (
            <GridCard key={r.id} r={r} lang={lang} onPress={() => router.push(`/recipe/${r.id}`)} t={t} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function GridCard({
  r,
  lang,
  onPress,
  t,
}: {
  r: Recipe;
  lang: 'fr' | 'en';
  onPress: () => void;
  t: (k: string) => string;
}) {
  return (
    <Pressable onPress={onPress} style={{ width: '47.5%' }}>
      <View style={{ borderRadius: 14, overflow: 'hidden' }}>
        <FoodPlaceholder aspect="1/1" tone={r.tone} radius={0} />
        {r.cookedCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: tokens.ink,
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: tokens.saffron, fontFamily: tokens.mono, fontSize: 10, fontWeight: '600' }}>
              {r.cookedCount}×
            </Text>
          </View>
        )}
      </View>
      <Text
        style={{
          fontFamily: tokens.serif,
          fontSize: 17,
          color: tokens.ink,
          letterSpacing: -0.3,
          lineHeight: 19,
          marginTop: 8,
        }}
      >
        {r[lang].title}
      </Text>
      <Text
        style={{
          fontFamily: tokens.mono,
          fontSize: 11,
          color: tokens.inkMuted,
          marginTop: 3,
          letterSpacing: 0.4,
        }}
      >
        {r.lastCookedDays === null
          ? t('never_cooked')
          : `${t('last_cooked')} ${r.lastCookedDays}j · ${r.nutrition.kcal} ${t('kcal')}`}
      </Text>
    </Pressable>
  );
}
