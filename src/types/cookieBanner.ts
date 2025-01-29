export interface CookieBannerItem<T extends string = string> {
  id: T;
  title: string;
  description: string;
  isEnabled: boolean;
  isMandatory?: boolean;
  isDisabled?: boolean;
}

export type CookieBannerDict<T extends string = string> = Record<T, boolean>;
