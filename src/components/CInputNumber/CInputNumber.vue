<script setup lang="ts">
  import { NInputNumber } from 'naive-ui';
  import { computed, type InputHTMLAttributes, ref } from 'vue';

  // https://www.naiveui.com/en-US/dark/components/input-number#InputNumber-Methods
  const props = withDefaults(
    defineProps<{
      /**
       * Whether has error.
       */
      hasError?: boolean;

      /**
       * Id of the input.
       */
      id?: string;

      /**
       * Whether to autofocus the input on mount.
       */
      autofocus?: boolean;

      /**
       * Whether to show a border around the input.
       */
      bordered?: boolean;

      /**
       * Placement of the add & minus buttons.
       * Can be either 'both' or 'right'.
       */
      buttonPlacement?: 'both' | 'right';

      /**
       * Whether the input can be cleared with a clear button.
       */
      clearable?: boolean;

      /**
       * The default value of the input when not manually set.
       */
      defaultValue?: number | null;

      /**
       * Whether to disable the input.
       */
      disabled?: boolean;

      /**
       * Method to format the input value.
       * If set, `update-value-on-input` will be disabled.
       */
      format?: (value: number | null) => string;

      /**
       * Additional DOM properties for the input element inside the component.
       * Note: This will not override internal props with the same name (except type).
       */
      inputProps?: InputHTMLAttributes;

      /**
       * Controls the keyboard behavior for the input.
       * Disables the keyboard behavior if the corresponding key is set to `false`.
       */
      keyboard?: { ArrowUp?: boolean; ArrowDown?: boolean };

      /**
       * Sets the loading state of the input.
       * The input will always reserve space for the loading indicator if set.
       */
      loading?: boolean;

      /**
       * The maximum value allowed for the input.
       */
      max?: number;

      /**
       * The minimum value allowed for the input.
       */
      min?: number;

      /**
       * Method to parse the input string into a number.
       * If set, `update-value-on-input` will be disabled.
       */
      parse?: (input: string) => number | null;

      /**
       * Placeholder text for the input.
       */
      placeholder?: string;

      /**
       * The precision of the input value.
       * If set, `update-value-on-input` will be disabled.
       */
      precision?: number;

      /**
       * Whether to use a rounded input style.
       */
      round?: boolean;

      /**
       * Whether the input is in a readonly state.
       */
      readonly?: boolean;

      /**
       * Whether to show the increase/decrease buttons.
       */
      showButton?: boolean;

      /**
       * The size of the input box.
       * Can be `'tiny'`, `'small'`, `'medium'`, or `'large'`.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * The validation status of the input.
       * Can be `'success'`, `'warning'`, or `'error'`.
       */
      status?: 'success' | 'warning' | 'error';

      /**
       * The step amount by which the input value is increased or decreased.
       * Can be an integer or a decimal.
       */
      step?: number;

      /**
       * Whether to change the value on input if the input value is valid.
       */
      updateValueOnInput?: boolean;

      /**
       * Custom validation method for the input value.
       */
      validator?: (value: number | null) => boolean;

      /**
       * The current value of the input.
       */
      value?: number | null;
    }>(),
    {
      hasError: false,
      id: undefined,
      autofocus: false,
      bordered: true,
      buttonPlacement: 'right',
      clearable: false,
      defaultValue: null,
      disabled: false,
      format: undefined,
      inputProps: undefined,
      keyboard: undefined,
      loading: undefined,
      max: undefined,
      min: undefined,
      parse: undefined,
      placeholder: 'Please Input',
      precision: undefined,
      round: undefined,
      readonly: false,
      showButton: true,
      size: 'medium',
      status: undefined,
      step: 1,
      updateValueOnInput: true,
      validator: undefined,
      value: undefined,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the input loses focus.
     */
    (e: 'blur', event: FocusEvent): void;

    /**
     * Emitted when the input is cleared.
     */
    (e: 'clear'): void;

    /**
     * Emitted when the input receives focus.
     */
    (e: 'focus', event: FocusEvent): void;

    /**
     * Emitted when the input value changes.
     */
    (e: 'update:value', value: number | null): void;
  }>();

  const input = ref<InstanceType<typeof NInputNumber> | null>(null);

  defineExpose({
    focus: () => input.value?.focus(),
    blur: () => input.value?.blur(),
  });

  const calculatedStatus = computed(() => {
    if (props.status) {
      return props.status;
    }

    return props.hasError ? 'error' : undefined;
  });

  const calculatedInputProps = computed(() => {
    const defaultInputProps = { inputMode: 'numeric' };

    if (!props.id) {
      return { ...props.inputProps, ...defaultInputProps };
    }

    if (!props.inputProps) {
      return { id: props.id, ...defaultInputProps };
    }

    return { ...props.inputProps, id: props.id, ...defaultInputProps };
  });
</script>

<template>
  <NInputNumber
    ref="input"
    class="c-input-number"
    :input-props="calculatedInputProps"
    :status="calculatedStatus"
    :has-error="hasError"
    :autofocus="autofocus"
    :bordered="bordered"
    :button-placement="buttonPlacement"
    :clearable="clearable"
    :default-value="defaultValue"
    :disabled="disabled"
    :format="format"
    :keyboard="keyboard"
    :loading="loading"
    :max="max"
    :min="min"
    :parse="parse"
    :placeholder="placeholder"
    :precision="precision"
    :round="round"
    :readonly="readonly"
    :show-button="showButton"
    :size="size"
    :step="step"
    :update-value-on-input="updateValueOnInput"
    :validator="validator"
    :value="value"
    @blur="
      (event) => {
        emit('blur', event);
      }
    "
    @focus="
      (event) => {
        emit('focus', event);
      }
    "
    @clear="
      () => {
        emit('clear');
      }
    "
    @update:value="
      (value) => {
        emit('update:value', value);
      }
    "
  >
    <template #add-icon>
      <slot name="add-icon"></slot>
    </template>
    <template #minus-icon>
      <slot name="minus-icon"></slot>
    </template>
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
  </NInputNumber>
</template>
