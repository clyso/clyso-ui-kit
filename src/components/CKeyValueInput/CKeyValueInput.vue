<script setup lang="ts">
  import CButton from '../CButton/CButton.vue';
  import CFormField from '../CFormField/CFormField.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CInput from '../CInput/CInput.vue';
  import type { KeyValueItem } from '../../types/keyValue';

  const props = withDefaults(
    defineProps<{
      /**
       * The key-value item to be displayed.
       */
      item: KeyValueItem;

      /**
       * The unique identifier for this key-value input.
       */
      id: string;

      /**
       * The index of the key-value pair in the list (optional).
       */
      index?: number;

      /**
       * Whether the key field has an error (optional).
       */
      hasKeyError?: boolean;

      /**
       * Whether the value field has an error (optional).
       */
      hasValueError?: boolean;

      /**
       * Whether the input fields are disabled (optional).
       */
      isDisabled?: boolean;

      /**
       * Label for the key field (optional, default is 'Key').
       */
      keyLabel?: string;

      /**
       * Label for the value field (optional, default is 'Value').
       */
      valueLabel?: string;

      /**
       * Whether to show the labels for key and value fields (optional, default is true).
       */
      hasLabels?: boolean;

      /**
       * Whether the delete button is visible (optional, default is true).
       */
      hasDelete?: boolean;
    }>(),
    {
      index: undefined,
      hasKeyError: false,
      hasValueError: false,
      isDisabled: false,
      keyLabel: 'Key',
      valueLabel: 'Value',
      hasLabels: true,
      hasDelete: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the item is updated with the new value.
     */
    (e: 'update:item', value: KeyValueItem): void;

    /**
     * Emitted when the delete action is triggered.
     */
    (e: 'delete'): void;
  }>();

  function updateMetadataItem(partial: Partial<KeyValueItem>) {
    if (props.isDisabled) {
      return;
    }

    emit('update:item', { ...props.item, ...partial });
  }
</script>

<template>
  <div
    class="c-key-value-input"
    :class="{ 'c-key-value-input--no-labels': !hasLabels }"
  >
    <span
      v-if="index !== undefined"
      class="c-key-value-input__index"
    >
      <slot name="index">#{{ index + 1 }}</slot>
    </span>

    <div class="c-key-value-input__fields">
      <CFormField
        class="c-key-value-input__field c-key-value-input__field--key"
        :field-id="`${id}-key-${index}`"
        :has-error="hasKeyError"
      >
        <template
          v-if="hasLabels"
          #label
        >
          {{ keyLabel }}
        </template>

        <template #default="{ hasError, fieldId }">
          <CInput
            :id="fieldId"
            :disabled="isDisabled"
            :value="item.key"
            size="small"
            clearable
            :has-error="hasError"
            :placeholder="keyLabel"
            @input="(event) => updateMetadataItem({ key: event })"
          />
        </template>

        <template #errors>
          <slot
            v-if="$slots['key-error']"
            name="key-error"
          ></slot>
        </template>
      </CFormField>

      <CFormField
        class="c-key-value-input__field c-key-value-input__field--value"
        :field-id="`${id}-value-${index}`"
        :has-error="hasValueError"
      >
        <template
          v-if="hasLabels"
          #label
        >
          {{ valueLabel }}
        </template>

        <template #default="{ hasError, fieldId }">
          <CInput
            :id="fieldId"
            :disabled="isDisabled"
            :value="item.value"
            size="small"
            clearable
            :has-error="hasError"
            :placeholder="valueLabel"
            @input="(event) => updateMetadataItem({ value: event })"
          />
        </template>

        <template #errors>
          <slot
            v-if="$slots['value-error']"
            name="value-error"
          ></slot>
        </template>
      </CFormField>
    </div>

    <div
      v-if="!isDisabled && hasDelete"
      class="c-key-value-input__delete-wrapper"
    >
      <CButton
        class="c-key-value-input__delete"
        secondary
        size="tiny"
        circle
        @click="() => emit('delete')"
      >
        <template #icon>
          <CIcon
            :is-inline="true"
            name="close"
          />
        </template>
      </CButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-key-value-input {
    display: flex;
    gap: utils.unit(2);

    @include utils.tablet-only {
      width: 560px;
    }

    @include utils.mobile {
      width: 100%;
    }

    &--no-labels {
      .c-key-value-input__delete-wrapper,
      .c-key-value-input__index {
        margin-top: 0;
      }
    }

    ::v-deep(.c-form-field) {
      margin-bottom: 0;
    }

    ::v-deep(.c-form-field__label) {
      @include utils.apply-styles(utils.$text-caption);
      font-weight: utils.$font-weight-normal;
    }

    ::v-deep(.c-form-field__head) {
      margin-bottom: 0;
    }

    &__index {
      color: var(--text-color-3);
      @include utils.apply-styles(utils.$text-caption);
      font-weight: utils.$font-weight-normal;
      height: 28px;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-top: 22px;
    }

    &__fields {
      flex-grow: 1;
      margin-bottom: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: utils.unit(2);
    }

    &__delete-wrapper {
      margin-top: 22px;
      flex-shrink: 0;
      height: 28px;
      display: flex;
      align-items: center;
    }
  }
</style>
