import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import th from "../locales/th.json";
import en from "../locales/en.json";

const STORAGE_KEY = "lang";

function getInitialLang(): string {
  if (typeof window === "undefined") return "th";
  return localStorage.getItem(STORAGE_KEY) ?? "th";
}

i18n.use(initReactI18next).init({
  resources: {
    th: { translation: th },
    en: { translation: en },
  },
  lng: getInitialLang(),
  fallbackLng: "th",
  interpolation: { escapeValue: false },
});

export function setLang(lang: "th" | "en") {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lang);
  }
}

export default i18n;
