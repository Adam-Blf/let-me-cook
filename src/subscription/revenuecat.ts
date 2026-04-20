// RevenueCat wiring.
//
// `react-native-purchases` est un module natif · NE marche PAS dans Expo Go.
// On charge dynamiquement pour ne pas crasher l'app en Expo Go · fallback
// au stub AsyncStorage dans ce cas.
//
// Clés API publiques · safe à exposer côté client (RevenueCat les conçoit ainsi).
// Pour le CI et les reviews, migre vers EXPO_PUBLIC_RC_*_KEY dans .env.
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { ENTITLEMENT_ID, OFFERING_ID, PACKAGE_IDS, type PlanKey } from './plans';

// Clés test RevenueCat fournies par Adam (dashboard.revenuecat.com)
export const RC_KEYS = {
  ios: process.env.EXPO_PUBLIC_RC_IOS_KEY ?? 'test_qFvwzGbwDzCsWOXhoKthGvpHPDT',
  android: process.env.EXPO_PUBLIC_RC_ANDROID_KEY ?? 'test_qFvwzGbwDzCsWOXhoKthGvpHPDT',
};

export const isExpoGo = Constants.appOwnership === 'expo';

// Dynamic import · évite crash en Expo Go où le module natif n'existe pas
type PurchasesType = typeof import('react-native-purchases').default;
type PurchasesPackage = import('react-native-purchases').PurchasesPackage;
type CustomerInfo = import('react-native-purchases').CustomerInfo;

let _Purchases: PurchasesType | null = null;

function loadPurchases(): PurchasesType | null {
  if (isExpoGo) return null;
  if (_Purchases) return _Purchases;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _Purchases = require('react-native-purchases').default;
    return _Purchases;
  } catch {
    return null;
  }
}

/** Init RC · à appeler une fois au boot via SubscriptionProvider */
export async function configureRevenueCat(userId?: string): Promise<boolean> {
  const Purchases = loadPurchases();
  if (!Purchases) return false;

  const apiKey = Platform.OS === 'ios' ? RC_KEYS.ios : RC_KEYS.android;
  if (!apiKey) throw new Error('Missing RevenueCat API key');

  // LOG_LEVEL VERBOSE en dev, WARN en prod
  if (__DEV__) {
    const { LOG_LEVEL } = require('react-native-purchases');
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  }

  await Purchases.configure({ apiKey, appUserID: userId ?? null });
  return true;
}

/** Vérifie l'entitlement "Let Me Cook Pro" sur le customer */
export async function hasActiveEntitlement(): Promise<boolean> {
  const Purchases = loadPurchases();
  if (!Purchases) return false;
  try {
    const info = await Purchases.getCustomerInfo();
    return info.entitlements.active[ENTITLEMENT_ID] !== undefined;
  } catch {
    return false;
  }
}

/** Récupère les 3 packages (monthly, yearly, lifetime) depuis l'offering */
export async function getOfferingPackages(): Promise<Record<PlanKey, PurchasesPackage | null> | null> {
  const Purchases = loadPurchases();
  if (!Purchases) return null;

  const offerings = await Purchases.getOfferings();
  const current = offerings.all[OFFERING_ID] ?? offerings.current;
  if (!current) return null;

  const find = (id: string) => current.availablePackages.find((p) => p.identifier === id) ?? null;

  return {
    monthly: find(PACKAGE_IDS.monthly),
    yearly: find(PACKAGE_IDS.yearly),
    lifetime: find(PACKAGE_IDS.lifetime),
  };
}

/** Achete un package · déclenche la sheet Apple StoreKit / Google Play */
export async function purchasePackage(pkg: PurchasesPackage): Promise<boolean> {
  const Purchases = loadPurchases();
  if (!Purchases) throw new Error('RevenueCat indisponible (Expo Go) · dev build requis');

  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;
}

/** Restore · relie les anciens achats au compte App Store / Play actuel */
export async function restorePurchases(): Promise<boolean> {
  const Purchases = loadPurchases();
  if (!Purchases) return false;

  const info = await Purchases.restorePurchases();
  return info.entitlements.active[ENTITLEMENT_ID] !== undefined;
}

/** Subscribe to customer info updates (renewal, cancel, etc.) */
export function onCustomerInfoUpdate(cb: (info: CustomerInfo) => void): () => void {
  const Purchases = loadPurchases();
  if (!Purchases) return () => {};

  Purchases.addCustomerInfoUpdateListener(cb);
  return () => Purchases!.removeCustomerInfoUpdateListener(cb);
}

/** Présente le Customer Center RevenueCat (subscription management, cancel, support) */
export async function presentCustomerCenter(): Promise<void> {
  if (isExpoGo) return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const RevenueCatUI = require('react-native-purchases-ui').default;
    await RevenueCatUI.presentCustomerCenter();
  } catch {
    // ignore if not available
  }
}

/** Présente le Paywall configuré dans le dashboard RevenueCat (optionnel · en plus du custom) */
export async function presentRevenueCatPaywall(): Promise<'PURCHASED' | 'RESTORED' | 'CANCELLED' | 'ERROR' | 'NOT_PRESENTED'> {
  if (isExpoGo) return 'NOT_PRESENTED';
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const RevenueCatUI = require('react-native-purchases-ui').default;
    const result = await RevenueCatUI.presentPaywall({ requiredEntitlementIdentifier: ENTITLEMENT_ID });
    return result;
  } catch {
    return 'ERROR';
  }
}
