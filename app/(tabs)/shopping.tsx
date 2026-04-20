import { ScreenStub } from '../../src/design/ui/ScreenStub';
import { useLang } from '../../src/design/i18n';

export default function ShoppingScreen() {
  const { t } = useLang();
  return (
    <ScreenStub
      eyebrow="SHOPPING"
      title={t('shopping_list')}
      description="Liste groupée par rayon (produce / dairy / meat / pantry). Port à venir."
      pose="cooking"
    />
  );
}
