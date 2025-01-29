<script setup lang="ts">
  import {
    type AutoCompleteGroupOption,
    type AutoCompleteOption,
    NAutoComplete,
    type SelectGroupOption,
    type SelectOption,
  } from 'naive-ui';
  import {
    type HTMLAttributes,
    type InputHTMLAttributes,
    ref,
    type VNode,
    type VNodeChild,
  } from 'vue';

  // https://www.naiveui.com/en-US/dark/components/auto-complete#AutoComplete-Props
  withDefaults(
    defineProps<{
      /**
       * Whether to append content to input.
       */
      append?: boolean;

      /**
       * Whether to blur after selection.
       */
      blurAfterSelect?: boolean;

      /**
       * Whether to clear after selection.
       */
      clearAfterSelect?: boolean;

      /**
       * Whether autocomplete is clearable.
       */
      clearable?: boolean;

      /**
       * Default value of autocomplete.
       */
      defaultValue?: string | null;

      /**
       * Whether the autocomplete is disabled.
       */
      disabled?: boolean;

      /**
       * Use the input to determine whether to show options on focus.
       */
      getShow?: (value: string) => boolean;

      /**
       * The attributes of input element in autocomplete.
       */
      inputProps?: InputHTMLAttributes;

      /**
       * Whether to show a loading status.
       */
      loading?: boolean;

      /**
       * The menu's DOM props.
       */
      menuProps?: HTMLAttributes;

      /**
       * Options to autocomplete from.
       */
      options?: (string | AutoCompleteOption | AutoCompleteGroupOption)[];

      /**
       * Autocomplete's placeholder.
       */
      placeholder?: string;

      /**
       * Autocomplete's placement.
       */
      placement?:
        | 'top-start'
        | 'top'
        | 'top-end'
        | 'right-start'
        | 'right'
        | 'right-end'
        | 'bottom-start'
        | 'bottom'
        | 'bottom-end'
        | 'left-start'
        | 'left'
        | 'left-end';

      /**
       * Render function for each option label.
       */
      renderLabel?: (
        option: SelectOption | SelectGroupOption,
        selected: boolean,
      ) => VNodeChild;

      /**
       * Render function for each option.
       */
      renderOption?: (info: {
        node: VNode;
        option: SelectOption | SelectGroupOption;
        selected: boolean;
      }) => VNodeChild;

      /**
       * Whether to show menu if there's no option.
       */
      showEmpty?: boolean;

      /**
       * Autocomplete size.
       */
      size?: 'small' | 'medium' | 'large';

      /**
       * Validation status.
       */
      status?: 'success' | 'warning' | 'error';

      /**
       * Container node of the menu.
       */
      to?: string | HTMLElement | false;

      /**
       * Input of autocomplete.
       */
      value?: string;
    }>(),
    {
      append: false,
      blurAfterSelect: false,
      clearAfterSelect: false,
      clearable: false,
      defaultValue: null,
      disabled: false,
      getShow: undefined,
      inputProps: undefined,
      loading: undefined,
      menuProps: undefined,
      options: () => [],
      placeholder: 'Please Input',
      placement: 'bottom-start',
      renderLabel: undefined,
      renderOption: undefined,
      showEmpty: false,
      size: 'medium',
      status: undefined,
      to: 'body',
      value: '',
    },
  );

  const emit = defineEmits<{
    /**
     * Emits when autocomplete input blurs.
     */
    (e: 'blur', event: FocusEvent): void;

    /**
     * Emits when autocomplete input focuses.
     */
    (e: 'focus', event: FocusEvent): void;

    /**
     * Emits when an option is selected in autocomplete.
     */
    (e: 'select', value: string | number): void;

    /**
     * Emits when the value of autocomplete input is updated.
     */
    (e: 'update:value', value: string | null): void;
  }>();

  const autocomplete = ref<InstanceType<typeof NAutoComplete> | null>(null);

  defineExpose({
    focus: () => autocomplete.value?.focus(),
    blur: () => autocomplete.value?.blur(),
  });
</script>

<template>
  <NAutoComplete
    ref="autocomplete"
    class="c-auto-complete"
    :blur-after-select="blurAfterSelect"
    :clear-after-select="clearAfterSelect"
    :clearable="clearable"
    :default-value="defaultValue"
    :disabled="disabled"
    :get-show="getShow"
    :input-props="inputProps"
    :loading="loading || undefined"
    :menu-props="menuProps"
    :options="options"
    :placeholder="placeholder"
    :placement="placement"
    :render-label="renderLabel"
    :render-option="renderOption"
    :show-empty="showEmpty"
    :size="size"
    :status="status"
    :to="to"
    :value="value"
    @blur="(event) => emit('blur', event)"
    @focus="(event) => emit('focus', event)"
    @select="(v) => emit('select', v)"
    @update:value="(v) => emit('update:value', v)"
  >
    <template
      v-if="$slots.default"
      #default="bindOptions"
    >
      <slot v-bind="bindOptions"></slot>
    </template>
    <template
      v-if="$slots.empty"
      #empty
    >
      <slot name="empty"></slot>
    </template>
    <template
      v-if="$slots.prefix"
      #prefix
    >
      <slot name="prefix"></slot>
    </template>
    <template
      v-if="$slots.suffix"
      #suffix
    >
      <slot name="suffix"></slot>
    </template>
  </NAutoComplete>
</template>
