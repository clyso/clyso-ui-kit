<script setup lang="ts">
  import { computed, useSlots } from 'vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CButton from '../CButton/CButton.vue';
  import type { ButtonType } from '../../types/button';

  type ResultType = 'empty' | 'success' | 'error' | 'warning' | 'info';
  interface DefaultContent {
    title?: string;
    content?: string;
    positiveText?: string;
    negativeText?: string;
  }

  const ICON_NAME_MAP: Record<ResultType, string> = {
    empty: 'file-tray',
    success: 'checkmark-circle',
    error: 'close-circle',
    warning: 'alert-circle',
    info: 'information-circle',
  };
  const POSITIVE_BUTTON_TYPE_MAP: Record<ResultType, ButtonType> = {
    empty: 'default',
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
  };
  const DEFAULT_CONTENT_MAP: Record<ResultType, DefaultContent> = {
    empty: {
      title: 'No data',
      content: 'There is no data available',
    },
    success: {
      title: 'Success',
      content: 'The operation has been successfully completed.',
    },
    error: {
      title: 'Error',
      content: 'An error occurred while processing the request.',
      positiveText: 'Retry',
    },
    warning: {},
    info: {},
  };

  const props = withDefaults(
    defineProps<{
      /**
       * Type of result. Options are 'empty', 'success', 'error', 'warning' or 'info'.
       */
      type?: ResultType;

      /**
       * Size of the result. Options are 'tiny', 'small', 'medium' or 'large'.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * The maximum width of the result.
       */
      maxWidth?: string | number;

      /**
       * The name of the icon displayed on top of the result.
       */
      iconName?: string;

      /**
       * Whether the result has a positive button.
       */
      hasPositive?: boolean;

      /**
       * Whether the result has a negative button.
       */
      hasNegative?: boolean;

      /**
       * Whether the result has content.
       */
      hasContent?: boolean;

      /**
       * Whether the result has a title.
       */
      hasTitle?: boolean;
    }>(),
    {
      type: 'error',
      size: 'medium',
      maxWidth: '100%',
      iconName: '',
      hasPositive: true,
      hasNegative: true,
      hasContent: true,
      hasTitle: true,
    },
  );
  const emit = defineEmits<{
    /**
     * Emitted after click on the positive button.
     */
    (e: 'positiveClick'): void;
    /**
     * Emitted after click on the negative button.
     */
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
  const computedMaxWidth = computed<string>(() => {
    if (typeof props.maxWidth === 'string') {
      return props.maxWidth;
    }

    return `${props.maxWidth}px`;
  });
  const computedContent = computed<DefaultContent>(
    () => DEFAULT_CONTENT_MAP[props.type],
  );
  const slots = useSlots();
  const hasPositiveButton = computed<boolean>(() =>
    Boolean(
      props.hasPositive &&
        (computedContent.value.positiveText || slots['positive-text']),
    ),
  );
  const hasNegativeButton = computed<boolean>(() =>
    Boolean(
      props.hasNegative &&
        (computedContent.value.negativeText || slots['negative-text']),
    ),
  );
</script>

<template>
  <div
    :class="[`c-result--${type}`, `c-result--${size}`]"
    class="c-result"
  >
    <div
      :style="{ maxWidth: computedMaxWidth }"
      class="c-result__inner"
    >
      <div class="c-result__icon-wrapper">
        <CIcon
          :name="computedIconName"
          :class="[`c-result__icon--${type}`, `c-result__icon--${size}`]"
          class="c-result__icon"
        />
      </div>

      <h4
        v-if="hasTitle && (computedContent.title || $slots.title)"
        class="c-result__title"
      >
        <slot name="title">
          {{ computedContent.title }}
        </slot>
      </h4>

      <div
        v-if="hasContent && (computedContent.content || $slots.default)"
        class="c-result__content"
      >
        <slot>{{ computedContent.content }}</slot>
      </div>

      <div
        v-if="hasPositiveButton || hasNegativeButton || $slots.actions"
        class="c-result__actions"
      >
        <slot name="actions">
          <CButton
            v-if="hasPositiveButton"
            class="c-result__positive-button"
            :type="computedPositiveButtonType"
            :size="size"
            secondary
            @click="emit('positiveClick')"
          >
            <slot name="positive-text">
              {{ computedContent.positiveText }}
            </slot>
          </CButton>
          <CButton
            v-if="hasNegativeButton"
            class="c-result__negative-button"
            :size="size"
            text
            @click="emit('negativeClick')"
          >
            <slot name="negative-text">
              {{ computedContent.negativeText }}
            </slot>
          </CButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-result {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    &--tiny {
      .c-result__title {
        @include utils.apply-styles(utils.$text);
        font-weight: utils.$font-weight-medium;
        margin-bottom: 0;
      }

      .c-result__content {
        @include utils.apply-styles(utils.$text-small);
        margin-bottom: utils.unit(1);

        &:last-child {
          margin-bottom: 0;
        }
      }

      .c-result__icon-wrapper {
        margin-bottom: utils.unit(1);
      }

      .c-result__icon {
        width: 36px;
        height: 36px;
      }
    }

    &--small {
      .c-result__title {
        @include utils.apply-styles(utils.$text-h3);
      }

      .c-result__content {
        @include utils.apply-styles(utils.$text-small);
      }

      .c-result__icon {
        width: 48px;
        height: 48px;
      }
    }

    &--large {
      .c-result__title {
        @include utils.apply-styles(utils.$text-h1);
      }

      .c-result__content {
        @include utils.apply-styles(utils.$text-large);
      }

      .c-result__icon {
        width: 96px;
        height: 96px;
      }
    }

    &--empty {
      .c-result__icon {
        color: var(--icon-color);
        fill: var(--icon-color);
      }
    }

    &--success {
      .c-result__icon {
        color: var(--success-color);
        fill: var(--success-color);
      }
    }

    &--error {
      .c-result__icon {
        color: var(--error-color);
        fill: var(--error-color);
      }
    }

    &--warning {
      .c-result__icon {
        color: var(--warning-color);
        fill: var(--warning-color);
      }
    }

    &--info {
      .c-result__icon {
        color: var(--info-color);
        fill: var(--info-color);
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__icon-wrapper {
      margin-bottom: utils.unit(3);

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__icon {
      width: 72px;
      height: 72px;
    }

    &__title {
      @include utils.apply-styles(utils.$text-h2);
      margin-bottom: utils.unit(3);
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__content {
      text-align: center;
      margin-bottom: utils.unit(4);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
