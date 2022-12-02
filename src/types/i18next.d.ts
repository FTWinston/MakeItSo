// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import common from '../../public/locales/en/common.json';
import engineering from '../../public/locales/en/engineering.json';
import weapons from '../../public/locales/en/weapons.json';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: 'common';
        // custom resources type
        resources: {
            common: typeof common;
            engineering: typeof engineering;
            weapons: typeof weapons;
        };
        // other
    }
}