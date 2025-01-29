import type { VNodeChild } from 'vue';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface NotificationConfig {
  type: NotificationType;
  content?: string | (() => VNodeChild);
  title?: string | (() => VNodeChild);
  positiveText?: string;
  negativeText?: string;
  iconName?: string;
  hasIcon?: boolean;
  hasPositive?: boolean;
  hasNegative?: boolean;
  isAliveOnHover?: boolean;
  isDurationProgressShown?: boolean;
  isClosable?: boolean;
  positiveHandler?: () => void | Promise<void>;
  negativeHandler?: () => void | Promise<void>;
  duration?: number | null;
}

export interface NotificationItem extends NotificationConfig {
  id: string;
}
