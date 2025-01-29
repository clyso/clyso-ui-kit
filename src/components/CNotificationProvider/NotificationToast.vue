<script setup lang="ts">
  import { computed, onMounted, ref, useSlots, watch } from 'vue';
  import type { NotificationType } from '../../types';
  import CCloseButton from '../CCloseButton/CCloseButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CButton from '../CButton/CButton.vue';
  import type { ButtonType } from '../../types/button';

  interface DefaultContent {
    title?: string;
    content?: string;
    positiveText?: string;
    negativeText?: string;
  }

  const ICON_NAME_MAP: Record<NotificationType, string> = {
    success: 'checkmark-circle',
    error: 'close-circle',
    warning: 'alert-circle',
    info: 'information-circle',
  };

  const POSITIVE_BUTTON_TYPE_MAP: Record<NotificationType, ButtonType> = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };

  const DEFAULT_CONTENT_MAP: Record<NotificationType, DefaultContent> = {
    success: {
      title: 'Success',
      content: 'The operation has been successfully completed.',
    },
    error: {
      title: 'Error',
      content: 'An error occurred while processing the request.',
    },
    warning: {},
    info: {},
  };

  const DEFAULT_DURATION = 8000;

  const props = withDefaults(
    defineProps<{
      type?: NotificationType;
      hasIcon?: boolean;
      isClosable?: boolean;
      iconName?: string;
      hasPositive?: boolean;
      hasNegative?: boolean;
      duration?: number | null; // null - not closing automatically
      isAliveOnHover?: boolean;
      isDurationProgressShown?: boolean;
    }>(),
    {
      type: 'error',
      hasIcon: true,
      isClosable: true,
      iconName: '',
      hasPositive: undefined,
      hasNegative: undefined,
      duration: DEFAULT_DURATION,
      isAliveOnHover: true,
      isDurationProgressShown: true,
    },
  );

  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'positiveClick'): void;
    (e: 'negativeClick'): void;
  }>();

  const computedIconName = computed<string>(() => {
    if (props.iconName) {
      return props.iconName;
    }

    return ICON_NAME_MAP[props.type];
  });
  const computedPositiveButtonType = computed<ButtonType>(
    () => POSITIVE_BUTTON_TYPE_MAP[props.type],
  );
  const computedContent = computed<DefaultContent>(
    () => DEFAULT_CONTENT_MAP[props.type],
  );
  const slots = useSlots();
  const hasPositiveButton = computed<boolean>(() =>
    Boolean(
      props.hasPositive !== false &&
        (computedContent.value.positiveText || slots['positive-text']),
    ),
  );
  const hasNegativeButton = computed<boolean>(() =>
    Boolean(
      props.hasNegative !== false &&
        (computedContent.value.negativeText || slots['negative-text']),
    ),
  );

  let closeTimer: number;
  const isHovered = ref(false);
  const durationLeft = ref(props.duration ?? 0);
  const intervalValue = 50;

  function setCloseTimeout() {
    if (props.duration === null) {
      clearInterval(closeTimer);

      return;
    }

    closeTimer = window.setInterval(() => {
      if (props.isAliveOnHover && isHovered.value) {
        return;
      }

      durationLeft.value -= intervalValue;

      if (durationLeft.value <= 0) {
        clearInterval(closeTimer);
        emit('close');
      }
    }, intervalValue);
  }

  const progressWidth = computed<number>(() => {
    if (!props.duration || !durationLeft.value) {
      return 0;
    }

    return ((props.duration - durationLeft.value) * 100) / props.duration;
  });

  onMounted(() => {
    setCloseTimeout();
  });

  watch(() => props.duration, setCloseTimeout);
</script>

<template>
  <div
    class="c-notification-toast"
    :class="[`c-notification-toast--${type}`]"
    @mouseenter="isHovered = true"
    @focusin="isHovered = true"
    @mouseleave="isHovered = false"
    @focusout="isHovered = false"
  >
    <CCloseButton
      v-if="isClosable"
      size="small"
      class="c-notification-toast__close-button"
      @click="emit('close')"
    />

    <div class="c-notification-toast__header">
      <CIcon
        v-if="hasIcon"
        :name="computedIconName"
        :class="[`c-notification-toast__icon--${type}`]"
        class="c-notification-toast__icon"
      />

      <span
        v-if="computedContent.title || $slots.title"
        class="c-notification-toast__title"
      >
        <slot name="title">
          {{ computedContent.title }}
        </slot>
      </span>
    </div>

    <div
      class="c-notification-toast__inner"
      :class="{ 'c-notification-toast__inner--shifted': hasIcon }"
    >
      <div
        v-if="computedContent.content || $slots.default"
        class="c-notification-toast__content"
      >
        <slot>{{ computedContent.content }}</slot>
      </div>

      <div
        v-if="hasPositiveButton || hasNegativeButton"
        class="c-notification-toast__actions"
      >
        <CButton
          v-if="hasNegativeButton"
          class="c-notification-toast__negative-button"
          size="tiny"
          quaternary
          @click="emit('negativeClick')"
        >
          <slot name="negative-text">
            {{ computedContent.negativeText }}
          </slot>
        </CButton>
        <CButton
          v-if="hasPositiveButton"
          class="c-notification-toast__positive-button"
          :type="computedPositiveButtonType"
          secondary
          size="tiny"
          @click="emit('positiveClick')"
        >
          <slot name="positive-text">
            {{ computedContent.positiveText }}
          </slot>
        </CButton>
      </div>
    </div>

    <span
      v-if="isDurationProgressShown && progressWidth"
      :style="{ width: `${progressWidth}%` }"
      class="c-notification-toast__duration-progress"
    ></span>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-notification-toast {
    padding: utils.unit(3);
    border-radius: utils.$border-radius;
    background-color: var(--popover-color);
    box-shadow: var(--notification-shadow);
    position: relative;
    pointer-events: auto;
    overflow: hidden;

    &--success {
      .c-notification-toast__icon {
        color: var(--success-color);
        fill: var(--success-color);
      }

      .c-notification-toast__duration-progress {
        background-color: var(--success-color);
      }
    }

    &--error {
      .c-notification-toast__icon {
        color: var(--error-color);
        fill: var(--error-color);
      }

      .c-notification-toast__duration-progress {
        background-color: var(--error-color);
      }
    }

    &--warning {
      .c-notification-toast__icon {
        color: var(--warning-color);
        fill: var(--warning-color);
      }

      .c-notification-toast__duration-progress {
        background-color: var(--warning-color);
      }
    }

    &--info {
      .c-notification-toast__icon {
        color: var(--info-color);
        fill: var(--info-color);
      }

      .c-notification-toast__duration-progress {
        background-color: var(--info-color);
      }
    }

    &__header {
      display: flex;
      align-items: center;
      gap: utils.unit(2);
      margin-bottom: utils.unit(1);
    }

    &__icon {
      height: 24px;
      width: 24px;
      display: inline;
      line-height: 12px;
    }

    &__title {
      @include utils.apply-styles(utils.$text-large);
      font-weight: utils.$font-weight-normal;
    }

    &__inner {
      &--shifted {
        padding-left: utils.unit(8);
      }
    }

    &__content {
      @include utils.apply-styles(utils.$text-small);
      margin-bottom: utils.unit(3);

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__actions {
      display: flex;
      justify-content: flex-end;
      gap: utils.unit(2);
    }

    &__close-button {
      position: absolute;
      top: utils.unit(1);
      right: utils.unit(1);
    }

    &__duration-progress {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: var(--text-color-base);
      transition: width 50ms linear;
      opacity: 0.4;
    }
  }
</style>
