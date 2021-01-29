import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { I18nManager } from 'react-native';
import en from './locales/en/lang.json';
import fr from './locales/fr/lang.json';
import it from './locales/it/lang.json';

let initialized = false;
const { t } = i18n;
const initializeTranslation = () => {
  if (initialized) return;

  const { isRTL } = Localization;

  // t.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config

  i18n.defaultLocale = 'fr';

  i18n.locale = Localization.locale;

  i18n.translations = { fr, en, it };

  i18n.fallbacks = true;

  initialized = true;
};

initializeTranslation();

export default t;
