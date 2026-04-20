// Hook d'abonnement · expose isActive, loading, purchase(), restore().
//
// Dev mode · les méthodes écrivent dans AsyncStorage (clé `lmc_subscription_active`).
// Permet de tester le flow dans Expo Go sans vrai compte App Store / Play Store.
//
// Prod mode · brancher react-native-purchases (RevenueCat) dans `configureRevenueCat`.
// Les règles d'App Store Apple interdisent Stripe pour les abonnements in-app,
// donc Apple StoreKit (iOS) et Google Play Billing (Android) via RevenueCat sont
// obligatoires. RevenueCat gère les deux avec un SDK unique.
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

const KEY = 'lmc_subscription_active';
const IS_DEV = __DEV__;

type SubCtx = {
  isActive: boolean;
  loading: boolean;
  purchase: () => Promise<void>;
  restore: () => Promise<void>;
};

const Ctx = createContext<SubCtx>({
  isActive: false,
  loading: true,
  purchase: async () => {},
  restore: async () => {},
});

// ── RevenueCat prod hook (branchement quand les clés sont prêtes) ───────
// npm install react-native-purchases
// app.json plugin: ["react-native-purchases"]
// Clés API RevenueCat · projet dashboard.revenuecat.com
async function configureRevenueCat(): Promise<void> {
  // DÉCOMMENTER en prod après `expo prebuild` + install react-native-purchases
  //
  // import Purchases from 'react-native-purchases';
  // const apiKey = Platform.OS === 'ios'
  //   ? process.env.EXPO_PUBLIC_RC_IOS_KEY
  //   : process.env.EXPO_PUBLIC_RC_ANDROID_KEY;
  // if (!apiKey) throw new Error('Missing RevenueCat API key');
  // await Purchases.configure({ apiKey });
}

async function checkSubscriptionRemote(): Promise<boolean> {
  // DÉCOMMENTER en prod :
  //
  // import Purchases from 'react-native-purchases';
  // const info = await Purchases.getCustomerInfo();
  // return info.entitlements.active['pro'] !== undefined;
  return false;
}

async function purchaseAnnualRemote(): Promise<boolean> {
  // DÉCOMMENTER en prod :
  //
  // import Purchases from 'react-native-purchases';
  // const offerings = await Purchases.getOfferings();
  // const pkg = offerings.current?.annual;
  // if (!pkg) throw new Error('Annual package not configured in RevenueCat');
  // const { customerInfo } = await Purchases.purchasePackage(pkg);
  // return customerInfo.entitlements.active['pro'] !== undefined;
  return false;
}

async function restorePurchasesRemote(): Promise<boolean> {
  // import Purchases from 'react-native-purchases';
  // const info = await Purchases.restorePurchases();
  // return info.entitlements.active['pro'] !== undefined;
  return false;
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (IS_DEV) {
          const v = await AsyncStorage.getItem(KEY);
          if (!cancelled) setActive(v === '1');
        } else {
          await configureRevenueCat();
          const active = await checkSubscriptionRemote();
          if (!cancelled) setActive(active);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const purchase = useCallback(async () => {
    if (IS_DEV) {
      await AsyncStorage.setItem(KEY, '1');
      setActive(true);
      return;
    }
    const ok = await purchaseAnnualRemote();
    setActive(ok);
  }, []);

  const restore = useCallback(async () => {
    if (IS_DEV) {
      const v = await AsyncStorage.getItem(KEY);
      setActive(v === '1');
      return;
    }
    const ok = await restorePurchasesRemote();
    setActive(ok);
  }, []);

  return (
    <Ctx.Provider value={{ isActive, loading, purchase, restore }}>
      {children}
    </Ctx.Provider>
  );
}

export const useSubscription = () => useContext(Ctx);

// Helper debug · reset l'abonnement en dev (utile pour tester le paywall plusieurs fois)
export async function devResetSubscription() {
  if (!IS_DEV) return;
  await AsyncStorage.removeItem(KEY);
}
