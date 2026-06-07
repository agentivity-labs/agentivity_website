import en from './en.json';
import fr from './fr.json';

export type Lang = 'en' | 'fr';

const translations = { en, fr } as const;

export function getLang(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'fr') return 'fr';
  return 'en';
}

export function useTranslations(lang: Lang) {
  return translations[lang];
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  return '/fr' + path;
}
