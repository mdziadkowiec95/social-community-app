import i18n from 'i18next';
import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  // .use(LanguageDetector)
  .init({
    debug: true,
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    ns: ['common', 'home', 'languages'],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export { i18n, useTranslation };
