<script setup lang="ts">
  import { NInput } from 'naive-ui';
  import {
    computed,
    type InputHTMLAttributes,
    ref,
    type TextareaHTMLAttributes,
  } from 'vue';
  import CIcon from '../CIcon/CIcon.vue';

  // https://www.naiveui.com/en-US/dark/components/input#Input-Props
  const props = withDefaults(
    defineProps<{
      /**
       * Specifies if the input has error.
       */
      hasError?: boolean;

      /**
       * Specifies unique id of the input.
       */
      id?: string;

      /**
       * Function to check the incoming value.
       * If it returns false, the input will not be accepted.
       */
      allowInput?: (value: string) => boolean;

      /**
       * Whether to autofocus the input on mount.
       */
      autofocus?: boolean;

      /**
       * Sizing property for when the input is of type textarea.
       * Can be a boolean or an object defining minRows and maxRows.
       */
      autosize?: boolean | { minRows?: number; maxRows?: number };

      /**
       * Whether the input can be cleared with a clear button.
       */
      clearable?: boolean;

      /**
       * Function to count graphemes in the input value.
       * If set, native maxlength and minlength won't be used.
       */
      countGraphemes?: (value: string) => number;

      /**
       * Default value of the input when not manually set.
       * Can be a string, an array of strings, or null.
       */
      defaultValue?: string | [string, string] | null;

      /**
       * Whether to disable the input.
       */
      disabled?: boolean;

      /**
       * DOM properties of the input element inside the component.
       */
      inputProps?: InputHTMLAttributes | TextareaHTMLAttributes;

      /**
       * Set the loading state of the input.
       * If true or false, the input will reserve space for the loading indicator.
       */
      loading?: boolean;

      /**
       * Maximum length of the input value.
       */
      maxlength?: number;

      /**
       * Minimum length of the input value.
       */
      minlength?: number;

      /**
       * Whether to passively activate the input.
       */
      passivelyActivated?: boolean;

      /**
       * Placeholder text for the input.
       */
      placeholder?: string;

      /**
       * Set the input to readonly state.
       */
      readonly?: boolean;

      /**
       * Render function for the word count, useful when displaying a custom word count.
       */
      renderCount?: (props: { value: string }) => void;

      /**
       * Use a rounded style for the input.
       */
      round?: boolean;

      /**
       * Number of rows for textarea inputs.
       */
      rows?: number;

      /**
       * Whether to show the word count.
       */
      showCount?: boolean;

      /**
       * The event to show the password in password inputs.
       * Can be `'click'` or `'mousedown'`.
       */
      showPasswordOn?: 'click' | 'mousedown';

      /**
       * Size of the input.
       * Can be `'tiny'`, `'small'`, `'medium'`, or `'large'`.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * Validation status of the input.
       * Can be `'success'`, `'warning'`, or `'error'`.
       */
      status?: 'success' | 'warning' | 'error';

      /**
       * The type of input.
       * Can be `'text'`, `'password'`, or `'textarea'`.
       */
      type?: 'text' | 'password' | 'textarea';

      /**
       * Manually set the value of the input.
       */
      value?: string | null;
    }>(),
    {
      hasError: false,
      id: undefined,
      allowInput: undefined,
      autofocus: false,
      autosize: false,
      clearable: false,
      countGraphemes: undefined,
      defaultValue: null,
      disabled: false,
      inputProps: undefined,
      loading: undefined,
      maxlength: undefined,
      minlength: undefined,
      passivelyActivated: false,
      placeholder: undefined,
      readonly: false,
      renderCount: undefined,
      round: false,
      rows: 3,
      showCount: false,
      showPasswordOn: undefined,
      size: 'medium',
      status: undefined,
      type: 'text',
      value: undefined,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the input loses focus.
     */
    (e: 'blur', event: FocusEvent): void;

    /**
     * Emitted when the native change event occurs.
     */
    (e: 'change', value: string): void;

    /**
     * Emitted when the input is cleared via the clear button.
     */
    (e: 'clear'): void;

    /**
     * Emitted when the input receives focus.
     */
    (e: 'focus', event: FocusEvent): void;

    /**
     * Emitted when the user inputs data into the input field.
     */
    (e: 'input', value: string): void;

    /**
     * Emitted when the value of the input changes.
     */
    (e: 'update:value', value: string): void;
  }>();

  const input = ref<InstanceType<typeof NInput> | null>(null);

  defineExpose({
    focus: () => input.value?.focus(),
    blur: () => input.value?.blur(),
    clear: () => input.value?.clear(),
    select: () => input.value?.select(),
    scrollTo: (options: ScrollToOptions) => input.value?.scrollTo(options),
  });

  const calculatedStatus = computed(() => {
    if (props.status) {
      return props.status;
    }

    return props.hasError ? 'error' : undefined;
  });

  const calculatedInputProps = computed(() => {
    if (!props.id) {
      return props.inputProps;
    }

    if (!props.inputProps) {
      return { id: props.id };
    }

    return { ...props.inputProps, id: props.id };
  });
</script>

<template>
  <NInput
    ref="input"
    class="c-input"
    v-bind="$attrs"
    :input-props="calculatedInputProps"
    :status="calculatedStatus"
    :allow-input="allowInput"
    :autofocus="autofocus"
    :autosize="autosize"
    :clearable="clearable"
    :count-graphemes="countGraphemes"
    :default-value="defaultValue"
    :disabled="disabled"
    :loading="loading"
    :maxlength="maxlength"
    :minlength="minlength"
    :passively-activated="passivelyActivated"
    :placeholder="placeholder"
    :readonly="readonly"
    :render-count="renderCount"
    :round="round"
    :rows="rows"
    :show-count="showCount"
    :show-password-on="showPasswordOn"
    :size="size"
    :type="type"
    :value="value"
    @blur="
      (event) => {
        emit('blur', event);
      }
    "
    @change="
      (value) => {
        emit('change', value);
      }
    "
    @clear="
      () => {
        emit('clear');
      }
    "
    @focus="
      (event) => {
        emit('focus', event);
      }
    "
    @input="
      (value) => {
        emit('input', value);
      }
    "
    @update:value="
      (value) => {
        emit('update:value', value);
      }
    "
  >
    <template
      v-if="$slots['clear-icon']"
      #clear-icon
    >
      <slot name="clear-icon"></slot>
    </template>

    <template
      v-if="$slots.count"
      #count="data: { value: string }"
    >
      <slot
        name="count"
        v-bind="data"
      ></slot>
    </template>

    <template
      v-if="$slots.prefix"
      #prefix
    >
      <slot name="prefix"></slot>
    </template>

    <template
      v-if="$slots.separator"
      #separator
    >
      <slot name="separator"></slot>
    </template>

    <template
      v-if="$slots.suffix"
      #suffix
    >
      <slot name="suffix"></slot>
    </template>

    <template #password-invisible-icon>
      <slot name="password-invisible-icon">
        <CIcon
          :is-inline="true"
          name="eye-off"
        />
      </slot>
    </template>

    <template #password-visible-icon>
      <slot name="password-visible-icon">
        <CIcon
          :is-inline="true"
          name="eye"
        />
      </slot>
    </template>
  </NInput>
</template>

<style lang="scss" scoped>
  .c-input {
    // hack to override webkit auto-fill colors
    :deep(.c-input__input-el) {
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: background-color 2147483647s cubic-bezier(1, 0, 1, -2)
          2147483647s !important;
      }

      &:-webkit-autofill {
        -webkit-text-fill-color: var(--text-color-base);
      }

      &:-webkit-autofill:focus {
        -webkit-text-fill-color: var(--text-color-base);
      }
    }
  }
</style>
