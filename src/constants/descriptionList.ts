import type { ComputedRef, InjectionKey } from 'vue';
import type { DescriptionItemConfig } from '../types/descriptionList';

export const DESCRIPTION_ITEM_CONFIG_INJECT_KEY = Symbol(
  'descriptionItemConfig',
) as InjectionKey<ComputedRef<DescriptionItemConfig>>;
