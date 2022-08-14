import i18n from 'i18next';
import { Saga } from 'rativ/saga';

import { initReactI18next } from 'react-i18next';

import { allLocales } from '..';
import { interpolateTranslations } from '../helpers/interpolateTranslations';

const translationBootstrap: Saga = () => {
  interpolateTranslations(allLocales);

  i18n
    // passes i18n down to react-i18next
    .use(initReactI18next)
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: allLocales,
      // if you're using a language detector, do not define the lng option
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

export { translationBootstrap };
