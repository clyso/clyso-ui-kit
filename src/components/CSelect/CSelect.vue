<script setup lang="ts">
  import {
    NSelect,
    type PopoverProps,
    type SelectGroupOption,
    type SelectOption,
  } from 'naive-ui';
  import {
    computed,
    type HTMLAttributes,
    type InputHTMLAttributes,
    ref,
    type VNode,
    type VNodeChild,
  } from 'vue';
  import type { SelectBaseOption } from 'naive-ui/es/select/src/interface';

  const props = withDefaults(
    defineProps<{
      /**
       * Whether the menu keeps its width the same as the select trigger element.
       * Setting it to false will also disable virtual-scroll.
       */
      consistentMenuWidth?: boolean;

      /**
       * Field name of group option children.
       */
      childrenField?: string;

      /**
       * Whether the value is clearable.
       */
      clearable?: boolean;

      /**
       * When multiple and filter is true, whether to clear filter keyword after selecting an option.
       */
      clearFilterAfterSelect?: boolean;

      /**
       * Default value when not manually set.
       * Can be a string, number, or array of strings/numbers.
       */
      defaultValue?: Array<string | number> | string | number | null;

      /**
       * Whether to disable the select.
       */
      disabled?: boolean;

      /**
       * Popover props for the preview ellipsis tag.
       */
      ellipsisTagPopoverProps?: PopoverProps;

      /**
       * Whether options can be filtered.
       */
      filterable?: boolean;

      /**
       * String search method. Filter function for filtering options.
       */
      filter?: (pattern: string, option: Record<string, unknown>) => boolean;

      /**
       * Whether select has error (status: 'error')
       */
      hasError?: boolean;

      /**
       * Id of the control
       */
      id?: string;

      /**
       * Whether to ignore IME's composition status during input events.
       * @since 2.33.4
       */
      ignoreComposition?: boolean;

      /**
       * The attributes of the input element inside the component.
       * Only works when the select is filterable.
       */
      inputProps?: InputHTMLAttributes;

      /**
       * Whether to allow keyboard control.
       */
      keyboard?: boolean;

      /**
       * Field name of option label.
       */
      labelField?: string;

      /**
       * Whether to show a loading state for the select.
       */
      loading?: boolean;

      /**
       * Maximum selected values to display while in multiple mode.
       * If 'responsive', it will keep all the tags in a single line.
       */
      maxTagCount?: number | 'responsive';

      /**
       * The menu's DOM props.
       */
      menuProps?: HTMLAttributes;

      /**
       * Size of select menu.
       */
      menuSize?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * Whether to allow selecting multiple values.
       */
      multiple?: boolean;

      /**
       * Options that can be selected. See `SelectOption` properties for more details.
       */
      options?: Array<SelectOption | SelectGroupOption>;

      /**
       * Placeholder text for the select input.
       * @since 2.25.0
       */
      placeholder?: string;

      /**
       * Placement of the options menu.
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
       * Whether options can be fetched asynchronously.
       * If true, filtering and tags won't work on options.
       */
      remote?: boolean;

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
       * Render function for each option tag.
       */
      renderTag?: (props: {
        option: SelectBaseOption;
        handleClose: () => void;
      }) => VNodeChild;

      /**
       * Whether to reset the menu status on options change (e.g., scroll status).
       */
      resetMenuOnOptionsChange?: boolean;

      /**
       * Whether to show or open the option menu.
       */
      show?: boolean;

      /**
       * Whether to show the dropdown arrow.
       */
      showArrow?: boolean;

      /**
       * Whether to show checkmark for selected options.
       */
      showCheckmark?: boolean;

      /**
       * Whether to show the menu on focus.
       */
      showOnFocus?: boolean;

      /**
       * Size of the select input.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * Validation status of the select input.
       */
      status?: 'success' | 'warning' | 'error';

      /**
       * Whether users can create new options. Used with filterable.
       */
      tag?: boolean;

      /**
       * Container node of the menu.
       * Can be a string or HTMLElement, or false to keep the menu not detached.
       */
      to?: string | HTMLElement | false;

      /**
       * The value of the select input.
       * Can be a string, number, or array of strings/numbers.
       */
      value?: Array<string | number> | string | number | null;

      /**
       * Field name of option value.
       */
      valueField?: string;

      /**
       * Whether to enable virtual scrolling for the options menu.
       */
      virtualScroll?: boolean;
    }>(),
    {
      consistentMenuWidth: true,
      childrenField: 'children',
      clearable: false,
      clearFilterAfterSelect: true,
      defaultValue: null,
      disabled: false,
      ellipsisTagPopoverProps: undefined,
      filterable: false,
      filter: undefined,
      hasError: false,
      id: undefined,
      ignoreComposition: true,
      inputProps: undefined,
      keyboard: true,
      labelField: 'label',
      loading: false,
      maxTagCount: undefined,
      menuProps: undefined,
      menuSize: 'medium',
      multiple: false,
      options: () => [],
      placeholder: 'Please Select',
      placement: 'bottom-start',
      remote: false,
      renderLabel: undefined,
      renderOption: undefined,
      renderTag: undefined,
      resetMenuOnOptionsChange: true,
      show: undefined,
      showArrow: true,
      showCheckmark: true,
      showOnFocus: false,
      size: 'medium',
      status: undefined,
      tag: false,
      to: undefined,
      value: undefined,
      valueField: undefined,
      virtualScroll: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the value of the select is updated.
     */
    (
      e: 'update:value',
      // TODO: change value type
      value: never,
      option: SelectBaseOption | null | SelectBaseOption[],
    ): void;

    /**
     * Emitted when the menu is shown or hidden.
     */
    (e: 'update:show', show: boolean): void;

    /**
     * Emitted when the input field is blurred.
     */
    (e: 'blur'): void;

    /**
     * Emitted when the input is cleared.
     */
    (e: 'clear'): void;

    /**
     * Emitted when the input field is focused.
     */
    (e: 'focus'): void;

    /**
     * Emitted when the options menu is scrolled.
     */
    (e: 'scroll', value: Event): void;

    /**
     * Emitted when a search is conducted.
     */
    (e: 'search', value: string): void;
  }>();

  const select = ref<InstanceType<typeof NSelect> | null>(null);

  defineExpose({
    focus: () => select.value?.focus(),
    blur: () => select.value?.blur(),
    focusInput: () => select.value?.blur(),
    blurInput: () => select.value?.blur(),
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
  <NSelect
    v-bind="$attrs"
    :id="id"
    ref="select"
    class="c-select"
    :consistent-menu-width="consistentMenuWidth"
    :children-field="childrenField"
    :clearable="clearable"
    :clear-filter-after-select="clearFilterAfterSelect"
    :default-value="defaultValue"
    :disabled="disabled"
    :ellipsis-tag-popover-props="ellipsisTagPopoverProps"
    :filterable="filterable"
    :filter="filter"
    :has-error="hasError"
    :ignore-composition="ignoreComposition"
    :input-props="calculatedInputProps"
    :keyboard="keyboard"
    :label-field="labelField"
    :loading="loading"
    :max-tag-count="maxTagCount"
    :menu-props="menuProps"
    :menu-size="menuSize"
    :multiple="multiple"
    :options="options"
    :placeholder="placeholder"
    :placement="placement"
    :remote="remote"
    :render-label="renderLabel"
    :render-option="renderOption"
    :render-tag="renderTag"
    :reset-menu-on-options-change="resetMenuOnOptionsChange"
    :show="show"
    :show-arrow="showArrow"
    :show-checkmark="showCheckmark"
    :show-on-focus="showOnFocus"
    :size="size"
    :status="calculatedStatus"
    :tag="tag"
    :to="to"
    :value="value"
    :value-field="valueField"
    :virtual-scroll="virtualScroll"
    @update:show="
      (v) => {
        emit('update:show', v);
      }
    "
    @update:value="
      (v, o) => {
        emit('update:value', v, o);
      }
    "
    @blur="
      () => {
        emit('blur');
      }
    "
    @clear="
      () => {
        emit('clear');
      }
    "
    @focus="
      () => {
        emit('focus');
      }
    "
    @scroll="
      (event) => {
        emit('scroll', event);
      }
    "
    @search="
      (v) => {
        emit('search', v);
      }
    "
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #action>
      <slot name="action"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <template #arrow>
      <slot name="arrow"></slot>
    </template>
  </NSelect>
</template>
