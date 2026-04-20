// Paywall Let Me Cook Pro · 3 tiers (monthly / yearly / lifetime).
// En Expo Go : stub AsyncStorage. En dev build / prod : RevenueCat.
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Cooky } from '../src/design/Cooky';
import { Eyebrow } from '../src/design/ui/Eyebrow';
import { Button } from '../src/design/ui/Button';
import { useLang } from '../src/design/i18n';
import { tokens } from '../src/design/tokens';
import { PLANS, PAYWALL_FEATURES, DEFAULT_PLAN, type PlanKey } from '../src/subscription/plans';
import { useSubscription } from '../src/subscription/useSubscription';

export default function PaywallScreen() {
  const router = useRouter();
  const { lang } = useLang();
  const { purchase, restore, loading, packages } = useSubscription();
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<PlanKey>(DEFAULT_PLAN);

  const onPurchase = async () => {
    setSubmitting(true);
    try {
      await purchase(selected);
      router.replace('/(tabs)/library');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert(lang === 'fr' ? 'Abonnement interrompu' : 'Purchase failed', msg);
    } finally {
      setSubmitting(false);
    }
  };

  const onRestore = async () => {
    await restore();
    router.replace('/(tabs)/library');
  };

  /** Prix live RevenueCat si dispo, sinon fallback plans.ts */
  const priceFor = (plan: PlanKey) => {
    const pkg = packages?.[plan];
    return pkg?.product.priceString ?? PLANS[plan].priceLabel;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* hero */}
        <View style={{ alignItems: 'center', paddingTop: 14 }}>
          <Cooky size={110} pose="happy" />
          <Eyebrow style={{ marginTop: 12 }}>{lang === 'fr' ? 'LET ME COOK PRO' : 'LET ME COOK PRO'}</Eyebrow>
          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 36,
              color: tokens.ink,
              letterSpacing: -0.7,
              textAlign: 'center',
              marginTop: 6,
              lineHeight: 38,
              maxWidth: 320,
            }}
          >
            {lang === 'fr'
              ? 'Transforme chaque vidéo en recette.'
              : 'Turn every video into a recipe.'}
          </Text>
          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 18,
              color: tokens.saffron,
              marginTop: 6,
              fontStyle: 'italic',
            }}
          >
            {lang === 'fr' ? 'Parce que cuisiner c\'est s\'amuser.' : 'Because cooking should be fun.'}
          </Text>
        </View>

        {/* features */}
        <View style={{ marginTop: 18, gap: 10 }}>
          {PAYWALL_FEATURES.map((f) => (
            <View key={f.icon + f.fr} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: tokens.saffronSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 15, color: tokens.espresso }}>{f.icon}</Text>
              </View>
              <Text style={{ fontFamily: tokens.sans, fontSize: 13, color: tokens.ink, flex: 1, lineHeight: 18 }}>
                {lang === 'fr' ? f.fr : f.en}
              </Text>
            </View>
          ))}
        </View>

        {/* 3 tiers */}
        <View style={{ marginTop: 18, gap: 8 }}>
          {(['lifetime', 'yearly', 'monthly'] as PlanKey[]).map((plan) => {
            const p = PLANS[plan];
            const active = selected === plan;
            return (
              <Pressable
                key={plan}
                onPress={() => setSelected(plan)}
                style={({ pressed }) => [
                  {
                    position: 'relative',
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: active ? tokens.saffron : tokens.line,
                    backgroundColor: active ? tokens.paper : 'transparent',
                  },
                  pressed && { opacity: 0.85 },
                ]}
              >
                {p.badge && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      right: 16,
                      backgroundColor: plan === 'yearly' ? tokens.saffron : tokens.ink,
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      borderRadius: 999,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: tokens.mono,
                        fontSize: 9,
                        color: tokens.cream,
                        letterSpacing: 1.4,
                        fontWeight: '700',
                      }}
                    >
                      {lang === 'fr' ? p.badge.fr : p.badge.en}
                    </Text>
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: tokens.sansMedium, fontSize: 15, color: tokens.ink }}>
                      {plan === 'lifetime' ? (lang === 'fr' ? 'À vie' : 'Lifetime') : plan === 'yearly' ? (lang === 'fr' ? 'Annuel' : 'Yearly') : (lang === 'fr' ? 'Mensuel' : 'Monthly')}
                    </Text>
                    <Text style={{ fontFamily: tokens.sans, fontSize: 12, color: tokens.inkMuted, marginTop: 2 }}>
                      {lang === 'fr' ? p.periodLabel.fr : p.periodLabel.en}
                    </Text>
                    {p.trialDays && (
                      <Text style={{ fontFamily: tokens.mono, fontSize: 10, color: tokens.saffron, marginTop: 4, letterSpacing: 1 }}>
                        {lang === 'fr' ? `${p.trialDays} JOURS OFFERTS` : `${p.trialDays} DAYS FREE`}
                      </Text>
                    )}
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontFamily: tokens.serif, fontSize: 28, color: tokens.ink, letterSpacing: -0.5 }}>
                      {priceFor(plan)}
                    </Text>
                    <Text style={{ fontFamily: tokens.mono, fontSize: 10, color: tokens.inkMuted, marginTop: 2, letterSpacing: 1 }}>
                      {p.monthlyEquivalentLabel}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* CTA */}
        <View style={{ marginTop: 18, gap: 8 }}>
          <Button
            variant="saffron"
            fullWidth
            onPress={submitting || loading ? undefined : onPurchase}
          >
            {submitting ? (
              <ActivityIndicator color={tokens.espresso} />
            ) : selected === 'lifetime' ? (
              lang === 'fr' ? `Débloquer à vie · ${priceFor(selected)}` : `Unlock lifetime · ${priceFor(selected)}`
            ) : (
              lang === 'fr' ? `Commencer l'essai · ${priceFor(selected)}` : `Start trial · ${priceFor(selected)}`
            )}
          </Button>

          <Pressable onPress={onRestore} style={{ alignItems: 'center', padding: 10 }}>
            <Text style={{ fontFamily: tokens.sansMedium, fontSize: 12, color: tokens.inkMuted }}>
              {lang === 'fr' ? 'Restaurer un achat' : 'Restore purchase'}
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            fontFamily: tokens.mono,
            fontSize: 9,
            color: tokens.inkFaint,
            textAlign: 'center',
            lineHeight: 14,
            letterSpacing: 0.4,
            marginTop: 2,
          }}
        >
          {lang === 'fr'
            ? 'Abonnements auto-renouvelables · Annulable à tout moment dans les réglages Apple ID / Google · CGU et Confidentialité sur beloucif.com/letmecook'
            : 'Auto-renewable · Cancel anytime in Apple ID / Google settings · Terms and Privacy at beloucif.com/letmecook'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
