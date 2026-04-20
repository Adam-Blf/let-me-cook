import { ScreenStub } from '../../src/design/ui/ScreenStub';
import { useLang } from '../../src/design/i18n';

export default function SearchScreen() {
  const { t } = useLang();
  return (
    <ScreenStub
      eyebrow="SEARCH"
      title={t('search')}
      description="Recherche par titre, ingrédient, auteur, plateforme. Port à venir depuis screens-3.jsx."
      pose="watching"
    />
  );
}
