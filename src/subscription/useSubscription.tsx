// Hook d'abonnement · RevenueCat-backed en prod · AsyncStorage stub en Expo Go.
//
// - Dev build / prod : branchement complet RevenueCat via src/subscription/revenuecat.ts
// - Expo Go : fallback AsyncStorage (clé `lmc_subscription_active`) pour tester le UI
//
// Expose :
//   - isActive · boolean · entitlement "Let Me Cook Pro" actif ?
//   - loading · boolean · init en cours
//   - packages · PurchasesPackage par plan (monthly / yearly / lifetime) ou null
//   - purchase(plan) · déclenche l'achat du plan choisi
//   - restore() · restore depuis App Store / Play Store
//   - openCustomerCenter() · ouvre le Customer Center RC
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  configureRevenueCat,
  getOfferingPackages,
  hasActiveEntitlement,
  isExpoGo,
  onCustomerInfoUpdate,
  presentCustomerCenter,
  purchasePackage as rcPurchasePackage,
  restorePurchases as rcRestorePurchases,
} from './revenuecat';
import type { PlanKey } from './plans';

const STUB_KEY = 'lmc_subscription_active';

type RCPackage = import('react-native-purchases').PurchasesPackage;

type SubCtx = {
  isActive: boolean;
  loading: boolean;
  packages: Record<PlanKey, RCPackage | null> | null;
  purchase: (plan: PlanKey) => Promise<void>;
  restore: () => Promise<void>;
  openCustomerCenter: () => Promise<void>;
};

const Ctx = createContext<SubCtx>({
  isActive: false,
  loading: true,
  packages: null,
  purchase: async () => {},
  restore: async () => {},
  openCustomerCenter: async () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<Record<PlanKey, RCPackage | null> | null>(null);

  // Init RevenueCat au mount
  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        if (isExpoGo) {
          const v = await AsyncStorage.getItem(STUB_KEY);
          if (!cancelled) setActive(v === '1');
        } else {
          await configureRevenueCat();
          const [active, pkgs] = await Promise.all([
            hasActiveEntitlement(),
            getOfferingPackages(),
          ]);
          if (cancelled) return;
          setActive(active);
          setPackages(pkgs);

          // Listen to renewal / expiration events
          unsub = onCustomerInfoUpdate((info) => {
            setActive(info.entitlements.active['Let Me Cook Pro'] !== undefined);
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  const purchase = useCallback(
    async (plan: PlanKey) => {
      if (isExpoGo) {
        await AsyncStorage.setItem(STUB_KEY, '1');
        setActive(true);
        return;
      }
      if (!packages) throw new Error('Offering RevenueCat pas chargé');
      const pkg = packages[plan];
      if (!pkg) throw new Error(`Package ${plan} introuvable dans l'offering`);
      const ok = await rcPurchasePackage(pkg);
      setActive(ok);
    },
    [packages]
  );

  const restore = useCallback(async () => {
    if (isExpoGo) {
      const v = await AsyncStorage.getItem(STUB_KEY);
      setActive(v === '1');
      return;
    }
    const ok = await rcRestorePurchases();
    setActive(ok);
  }, []);

  const openCustomerCenter = useCallback(async () => {
    if (isExpoGo) return;
    await presentCustomerCenter();
  }, []);

  const value = useMemo(
    () => ({ isActive, loading, packages, purchase, restore, openCustomerCenter }),
    [isActive, loading, packages, purchase, restore, openCustomerCenter]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSubscription = () => useContext(Ctx);

/** Dev helper · reset l'abonnement stub (Expo Go). Pas d'effet en dev build / prod. */
export async function devResetSubscription() {
  if (!isExpoGo) return;
  await AsyncStorage.removeItem(STUB_KEY);
}
