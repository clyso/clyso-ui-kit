import type { VNodeChild } from 'vue';

export type DialogType = 'confirm' | 'error' | 'success' | 'warning' | 'info';

export interface DialogConfig {
  type: DialogType;
  content?: string | (() => VNodeChild);
  title?: string | (() => VNodeChild);
  positiveText?: string;
  negativeText?: string;
  iconName?: string;
  isLoading?: boolean;
  isProcessing?: boolean;
  positiveHandler?: () => void | Promise<void>;
  negativeHandler?: () => void | Promise<void>;
  hasNegative?: boolean;
  hasPositive?: boolean;
  isPositiveProcessing?: boolean;
  isNegativeProcessing?: boolean;
  isPositiveDisabled?: boolean;
  isNegativeDisabled?: boolean;
  isNegativeDisabledWhenPositiveProcessing?: boolean;
}

export interface Dialog extends DialogConfig {
  id: string;
  isShown: boolean;
}
