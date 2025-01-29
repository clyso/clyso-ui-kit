export enum I18nLocale {
  'EN' = 'en',
  'DE' = 'de',
}

export type I18nMessages<
  T extends Record<string, string> = Record<string, string>,
> = {
  [key in I18nLocale]: T;
};
