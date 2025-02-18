import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";


const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: 'en',
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;