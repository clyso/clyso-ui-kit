<script setup lang="ts">
  import { computed, ref, useSlots } from 'vue';
  import CModal from '../CModal/CModal.vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import type { DialogType } from '../../types';

  const props = withDefaults(
    defineProps<{
      /**
       * The type of the dialog, e.g., 'confirm', 'alert', etc.
       */
      type: DialogType;

      /**
       * Whether the dialog is currently shown.
       */
      isShown: boolean;

      /**
       * Whether the dialog includes a negative action button.
       */
      hasNegative?: boolean;

      /**
       * Whether the dialog includes a positive action button.
       */
      hasPositive?: boolean;

      /**
       * Whether the dialog is in a loading state when opening.
       */
      isLoading?: boolean;

      /**
       * Whether the dialog is in a general processing state.
       */
      isProcessing?: boolean;

      /**
       * Whether the positive action button is in a processing state.
       */
      isPositiveProcessing?: boolean;

      /**
       * Whether the negative action button is in a processing state.
       */
      isNegativeProcessing?: boolean;

      /**
       * Whether the positive action button is disabled.
       */
      isPositiveDisabled?: boolean;

      /**
       * Whether the negative action button is disabled.
       */
      isNegativeDisabled?: boolean;

      /**
       * Whether the negative action button is disabled while the positive action button is processing.
       */
      isNegativeDisabledWhenPositiveProcessing?: boolean;

      /**
       * The name of the icon to display in the dialog.
       */
      iconName?: string;

      /**
       * The handler function executed when the positive action button is clicked.
       * Can be synchronous or return a promise.
       */
      positiveHandler?: () => void | Promise<void>;

      /**
       * The handler function executed when the negative action button is clicked.
       * Can be synchronous or return a promise.
       */
      negativeHandler?: () => void | Promise<void>;
    }>(),
    {
      type: 'confirm',
      hasNegative: true,
      hasPositive: true,
      isLoading: false,
      isProcessing: false,
      isPositiveProcessing: false,
      isNegativeProcessing: false,
      isPositiveDisabled: false,
      isNegativeDisabled: false,
      isNegativeDisabledWhenPositiveProcessing: true,
      iconName: '',
      positiveHandler: undefined,
      negativeHandler: undefined,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the visibility of the dialog is updated.
     */
    (e: 'update:isShown', value: boolean): void;

    /**
     * Emitted when the dialog is closed.
     */
    (e: 'close'): void;

    /**
     * Emitted when the positive action button is clicked.
     */
    (e: 'positiveClick'): void;

    /**
     * Emitted when the negative action button is clicked.
     */
    (e: 'negativeClick'): void;

    /**
     * Emitted after the dialog's leave transition is completed.
     */
    (e: 'afterLeave'): void;
  }>();

  const isError = computed(() => props.type === 'error');
  const isSuccess = computed(() => props.type === 'success');
  const isWarning = computed(() => props.type === 'warning');
  const isInfo = computed(() => props.type === 'info');
  const resIconName = computed(() => {
    if (props.iconName) {
      return props.iconName;
    }

    if (isError.value) {
      return 'close-circle';
    }

    if (isSuccess.value) {
      return 'checkmark-circle';
    }

    if (isWarning.value) {
      return 'alert-circle';
    }

    if (isInfo.value) {
      return 'information-circle';
    }

    return '';
  });

  const slots = useSlots();
  const positiveButtonType = computed(() => {
    if (isError.value) {
      return 'error';
    }

    if (isSuccess.value) {
      return 'success';
    }

    if (isWarning.value) {
      return 'warning';
    }

    if (isInfo.value) {
      return 'info';
    }

    return 'primary';
  });
  const defaultPositiveText = computed(() => {
    if (
      isError.value ||
      isWarning.value ||
      isInfo.value ||
      slots['positive-text']
    ) {
      return 'Ok';
    }

    if (isSuccess.value) {
      return 'Continue';
    }

    return 'Confirm';
  });
  const defaultNegativeText = computed(() => {
    if (slots['negative-text']) {
      return 'Ok';
    }

    if (isError.value) {
      return '';
    }

    if (isSuccess.value) {
      return '';
    }

    if (isWarning.value) {
      return '';
    }

    if (isInfo.value) {
      return '';
    }

    return 'Cancel';
  });

  function closeDialog() {
    emit('update:isShown', false);
    emit('close');
  }

  const isPositiveClickProcessing = ref(false);
  const isPositiveButtonProcessing = computed(
    () =>
      props.isProcessing ||
      props.isPositiveProcessing ||
      isPositiveClickProcessing.value,
  );
  const isNegativeClickProcessing = ref(false);
  const isNegativeButtonProcessing = computed(
    () =>
      !props.isProcessing &&
      (props.isNegativeProcessing || isNegativeClickProcessing.value),
  );
  const isNegativeButtonDisabled = computed(
    () =>
      props.isNegativeDisabled ||
      (props.isNegativeDisabledWhenPositiveProcessing &&
        isPositiveButtonProcessing.value),
  );

  async function handlePositiveClick() {
    if (
      isPositiveButtonProcessing.value ||
      props.isPositiveDisabled ||
      isNegativeClickProcessing.value
    ) {
      return;
    }

    emit('positiveClick');

    isPositiveClickProcessing.value = true;

    try {
      await props.positiveHandler?.();
    } finally {
      isPositiveClickProcessing.value = false;
      closeDialog();
    }
  }

  async function handleNegativeClick() {
    if (isPositiveClickProcessing.value || isNegativeClickProcessing.value) {
      return;
    }

    emit('negativeClick');

    isNegativeClickProcessing.value = true;

    try {
      await props.negativeHandler?.();
    } finally {
      isNegativeClickProcessing.value = false;
      closeDialog();
    }
  }
</script>

<template>
  <CModal
    v-bind="$attrs"
    :is-shown="isShown"
    :is-loading="isLoading"
    class="c-dialog"
    :class="`c-dialog--${type}`"
    @update:is-shown="handleNegativeClick"
    @after-leave="emit('afterLeave')"
  >
    <template
      v-if="resIconName || $slots.title"
      #title
    >
      <slot name="icon">
        <CIcon
          v-if="resIconName"
          :is-inline="true"
          :name="resIconName"
          class="c-dialog__icon"
        />
      </slot>
      <slot name="title">
        <template v-if="isError"> Error </template>
      </slot>
    </template>

    <slot>
      <template v-if="isError">
        An error occurred while processing the request. Please try again later.
      </template>
    </slot>

    <template #actions>
      <slot name="actions">
        <CButton
          v-if="hasNegative && defaultNegativeText"
          secondary
          :loading="isNegativeButtonProcessing"
          :disabled="isNegativeButtonDisabled"
          class="c-dialog__negative-button"
          @click="handleNegativeClick"
        >
          <slot name="negative-text">
            {{ defaultNegativeText }}
          </slot>
        </CButton>
        <CButton
          v-if="hasPositive && defaultPositiveText"
          :type="positiveButtonType"
          :loading="isPositiveButtonProcessing"
          :disabled="isPositiveDisabled"
          class="c-dialog__confirm-button"
          @click="handlePositiveClick"
        >
          <slot name="positive-text">
            {{ defaultPositiveText }}
          </slot>
        </CButton>
      </slot>
    </template>
  </CModal>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-dialog {
    &--success {
      .c-dialog__icon {
        color: var(--success-color);
      }
    }

    &--error {
      .c-dialog__icon {
        color: var(--error-color);
      }
    }

    &--warning {
      .c-dialog__icon {
        color: var(--warning-color);
      }
    }

    &--info {
      .c-dialog__icon {
        color: var(--info-color);
      }
    }

    &__icon {
      width: 32px;
      height: 32px;
    }
  }
</style>
