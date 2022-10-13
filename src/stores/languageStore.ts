import create from 'zustand';

export type LanguageType = 'English' | 'Indonesia';

interface LanguageState {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'Indonesia',
  setLanguage: (lang) =>
    set(() => ({
      language: lang,
    })),
}));
