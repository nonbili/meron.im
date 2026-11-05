import ar from "./locales/ar.json";
import de from "./locales/de.json";
import el from "./locales/el.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import et from "./locales/et.json";
import fr from "./locales/fr.json";
import it from "./locales/it.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import lv from "./locales/lv.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";
import pt_BR from "./locales/pt_BR.json";
import sv from "./locales/sv.json";
import tr from "./locales/tr.json";
import vi from "./locales/vi.json";
import zh_Hans from "./locales/zh_Hans.json";
import zh_Hant from "./locales/zh_Hant.json";

export const locales = [
  "ar", "de", "el", "en", "es", "et", "fr", "it", "ja", "ko",
  "lv", "pl", "pt", "pt_BR", "sv", "tr", "vi", "zh_Hans", "zh_Hant"
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  ar: "العربية",
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
  es: "Español",
  et: "Eesti",
  fr: "Français",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  lv: "Latviešu",
  pl: "Polski",
  pt: "Português",
  pt_BR: "Português (Brasil)",
  sv: "Svenska",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  zh_Hans: "简体中文",
  zh_Hant: "繁體中文",
};

const dictionaries: Record<Locale, Record<string, string>> = {
  ar, de, el, en, es, et, fr, it, ja, ko,
  lv, pl, pt, pt_BR, sv, tr, vi, zh_Hans, zh_Hant
};

export function getTranslations(locale: Locale) {
  const dict = dictionaries[locale] || dictionaries[defaultLocale];
  return {
    t: (key: string) => dict[key] || dictionaries[defaultLocale][key] || key,
  };
}

export function localizePath(path: string, locale: Locale) {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("#")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return cleanPath;
  }
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}
