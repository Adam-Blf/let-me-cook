// Paywall · 14,99 €/an · obligatoire pour accéder à la bibliothèque et
// aux features (extraction, cook mode, liste courses, nutrition, etc.)
// En dev (Expo Go) · clic "S'abonner" coche un flag AsyncStorage.
// En prod · RevenueCat déclenche le flow Apple StoreKit / Google Play Billing.
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Cooky } from '../src/design/Cooky';
import { Eyebrow } from '../src/design/ui/Eyebrow';
import { Button } from '../src/design/ui/Button';
import { useLang } from '../src/design/i18n';
import { tokens } from '../src/design/tokens';
import { PLANS, PAYWALL_FEATURES } from '../src/subscription/plans';
import { useSubscription } from '../src/subscription/useSubscription';

export default function PaywallScreen() {
  const router = useRouter();
  const { t, lang } = useLang();
  const { purchase, restore, loading } = useSubscription();
  const [submitting, setSubmitting] = useState(false);

  const plan = PLANS.annual;

  const onPurchase = async () => {
    setSubmitting(true);
    try {
      await purchase();
      router.replace('/(tabs)/library');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      Alert.alert(
        lang === 'fr' ? 'Abonnement interrompu' : 'Purchase failed',
        msg
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onRestore = async () => {
    await restore();
    router.replace('/(tabs)/library');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tokens.cream }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 28, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Cooky size={130} pose="happy" />
          <View style={{ height: 18 }} />
          <Eyebrow>{lang === 'fr' ? 'COOKY PRO' : 'COOKY PRO'}</Eyebrow>
          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 42,
              color: tokens.ink,
              letterSpacing: -0.8,
              textAlign: 'center',
              marginTop: 8,
              lineHeight: 44,
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
              fontSize: 22,
              color: tokens.saffron,
              marginTop: 10,
              fontStyle: 'italic',
            }}
          >
            {lang === 'fr' ? 'Parce que cuisiner c\'est s\'amuser.' : 'Because cooking should be fun.'}
          </Text>
        </View>

        <View style={{ marginTop: 28, gap: 14 }}>
          {PAYWALL_FEATURES.map((f) => (
            <View
              key={f.icon + f.fr}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: tokens.saffronSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontSize: 18, color: tokens.espresso }}>{f.icon}</Text>
              </View>
              <Text
                style={{
                  fontFamily: tokens.sans,
                  fontSize: 15,
                  color: tokens.ink,
                  flex: 1,
                  lineHeight: 20,
                }}
              >
                {lang === 'fr' ? f.fr : f.en}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            marginTop: 28,
            padding: 22,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: tokens.saffron,
            backgroundColor: tokens.paper,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: -12,
              backgroundColor: tokens.saffron,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                fontFamily: tokens.mono,
                fontSize: 10,
                color: tokens.cream,
                letterSpacing: 1.5,
                fontWeight: '700',
              }}
            >
              {lang === 'fr' ? `${plan.trialDays} JOURS OFFERTS` : `${plan.trialDays} DAYS FREE`}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: tokens.serif,
              fontSize: 44,
              color: tokens.ink,
              letterSpacing: -1,
              marginTop: 6,
            }}
          >
            {plan.priceLabel}
          </Text>
          <Text
            style={{
              fontFamily: tokens.sans,
              fontSize: 14,
              color: tokens.inkMuted,
              marginTop: 2,
            }}
          >
            {lang === 'fr' ? `${plan.periodLabel} · soit ${plan.monthlyEquivalent} / mois` : `per year · ${plan.monthlyEquivalent} / month`}
          </Text>
        </View>

        <View style={{ marginTop: 20, gap: 10 }}>
          <Button
            variant="saffron"
            fullWidth
            onPress={submitting || loading ? undefined : onPurchase}
          >
            {submitting
              ? lang === 'fr'
                ? 'En cours...'
                : 'Processing...'
              : lang === 'fr'
              ? `Commencer l'essai · ${plan.priceLabel}/an`
              : `Start trial · ${plan.priceLabel}/year`}
          </Button>

          <Pressable onPress={onRestore} style={{ alignItems: 'center', padding: 12 }}>
            <Text style={{ fontFamily: tokens.sansMedium, fontSize: 13, color: tokens.inkMuted }}>
              {lang === 'fr' ? 'Restaurer un achat' : 'Restore purchase'}
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            fontFamily: tokens.mono,
            fontSize: 10,
            color: tokens.inkFaint,
            textAlign: 'center',
            lineHeight: 15,
            letterSpacing: 0.4,
            marginTop: 4,
          }}
        >
          {lang === 'fr'
            ? `Essai gratuit ${plan.trialDays} jours puis ${plan.priceLabel}/an · Renouvellement auto · Annulable dans les réglages Apple ID / Google`
            : `${plan.trialDays}-day free trial then ${plan.priceLabel}/year · Auto-renews · Cancel anytime in Apple ID / Google settings`}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
