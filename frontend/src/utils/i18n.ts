import { AVAILABLE_LANGUAGES } from '../config';

export const isLanguageSupported = (lang: string) => AVAILABLE_LANGUAGES.includes(lang);
