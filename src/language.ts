import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
//import LanguageDetector from 'i18next-browser-languagedetector';
 
i18n
    // Load translation files from public/locales ... learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // Detect user language ... learn more: https://github.com/i18next/i18next-browser-languageDetector
    // Alternatively, we can pass in the current language and allowed languages in init.
    //.use(LanguageDetector)
    // Pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // Init i18next ... for all options see: https://www.i18next.com/overview/configuration-options
    .init({
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        debug: process.env.NODE_ENV === 'development',

        fallbackLng: 'en',
        supportedLngs: ['en'],
 
        // LanguageDetector options, see https://github.com/i18next/i18next-browser-languageDetector#detector-options
        detection: {
            // Cache the selected language in local storage, and use that value where present.
            // Failing that, use browser settings, and failing that, use the html tag.
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'language',
        },
 
        interpolation: {
            escapeValue: false, // Not needed for react, as it escapes by default.
        },
 
        react: {
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'hr', 'p', 'strong', 'em'],
        },
    });
 
// Ensure the lang attribute on the html tag stays up-to-date with the configured language.
i18n.on('languageChanged', (lng) => document.documentElement.setAttribute('lang', lng));
 
export default i18n;