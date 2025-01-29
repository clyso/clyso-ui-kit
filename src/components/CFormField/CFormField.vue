<script setup lang="ts">
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

  interface CFormFieldProps {
    /**
     * The unique identifier for the form field, used for associating the label with the input element.
     */
    fieldId: string;

    /**
     * Indicates whether the field is in an error state.
     */
    hasError?: boolean;

    /**
     * Indicates whether the field is required.
     */
    isRequired?: boolean;
  }

  withDefaults(defineProps<CFormFieldProps>(), {
    hasError: false,
    isRequired: false,
  });
</script>

<template>
  <div
    class="c-form-field"
    :class="{
      'c-form-field--error': hasError,
      'c-form-field--required': isRequired,
    }"
  >
    <div
      v-if="$slots.label || $slots['head-right']"
      class="c-form-field__head"
    >
      <label
        class="c-form-field__label"
        :for="fieldId"
      >
        <slot name="label"></slot>

        <span
          v-if="isRequired"
          class="label-asterisk"
          aria-hidden="true"
          >﹡</span
        >
      </label>

      <slot name="head-right"></slot>
    </div>

    <slot
      :field-id="fieldId"
      :has-error="hasError"
      :is-required="isRequired"
    ></slot>

    <CCollapseTransition
      class="c-form-field__errors-wrapper"
      :show="hasError && $slots.errors !== undefined"
    >
      <div
        class="c-form-field__errors"
        aria-live="polite"
      >
        <slot name="errors"></slot>
      </div>
    </CCollapseTransition>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-form-field {
    margin-bottom: utils.unit(6);

    &:last-child {
      margin-bottom: 0;
    }

    &--error {
      .c-form-field__head {
        color: var(--error-color);
      }
    }

    &__head {
      margin-bottom: utils.unit(1);
      display: flex;
      justify-content: space-between;
      gap: utils.unit(2);
    }

    &__errors-wrapper {
      margin-top: utils.unit(1);
    }

    &__errors {
      color: var(--error-color);
      font-size: 12px;
      line-height: 1.3;
    }
  }
</style>
