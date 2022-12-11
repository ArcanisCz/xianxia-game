import i18next from 'i18next';
import {initReactI18next} from "react-i18next";

i18next
    .use(initReactI18next)
    .init({
        // debug: true,
        lng: "en",
        keySeparator: false,
        parseMissingKeyHandler: (key) => `(${key})`,
        resources: {en: {translation: {}}},
    });

export default i18next;
