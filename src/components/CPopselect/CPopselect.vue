<script setup lang="ts">
  import {
    NPopselect,
    type SelectGroupOption,
    type SelectOption,
  } from 'naive-ui';
  import type { SelectBaseOption } from 'naive-ui/es/select/src/interface';

  // https://www.naiveui.com/en-US/dark/components/popselect#Popselect-Props
  withDefaults(
    defineProps<{
      /**
       * Whether to show popselect.
       */
      show?: boolean;
      /**
       * The popselect trigger type.
       */
      trigger?: 'hover' | 'click' | 'focus' | 'manual';
      /**
       * The selected value(s) of the popselect in controlled mode. Can be a single value or an array if `multiple` is enabled.
       */
      value?: string | number | (string | number)[] | null;
      /**
       * A list of options to display in the popselect dropdown. Each option must have a `label` and a `value`.
       */
      options: Array<SelectOption | SelectGroupOption>;
      /**
       * Placeholder text to display when no value is selected.
       */
      placeholder?: string;
      /**
       * Whether the popselect is disabled or not.
       */
      disabled?: boolean;
      /**
       * Whether the popselect allows multiple selections.
       */
      multiple?: boolean;
      /**
       * Whether the select menu is scrollable.
       */
      scrollable?: boolean;
      /**
       * Size of the Popselect.
       */
      size?: 'small' | 'medium' | 'large';
      /**
       * Whether to enable virtual scrolling.
       */
      virtualScroll?: boolean;
      /**
       * Whether the value is clearable.
       */
      clearable?: boolean;
    }>(),
    {
      show: undefined,
      trigger: 'hover',
      value: null,
      options: () => [],
      placeholder: 'Please Select',
      disabled: false,
      multiple: false,
      scrollable: false,
      size: 'medium',
      clearable: false,
    },
  );

  const emit = defineEmits<{
    /**
     * Callback of value updating.
     */
    (
      e: 'update:value',
      // TODO: change value type
      value: never,
      option: SelectBaseOption | null | SelectBaseOption[],
    ): void;
  }>();

  type PopselectSlots = {
    /**
     * The content inside popover.
     */
    default(): unknown;
    /**
     * Header menu slot.
     */
    header(): unknown;
    /**
     * Options menu slot.
     */
    action(): unknown;
    /**
     * Empty state slot for the options menu.
     */
    empty(): unknown;
  };

  defineSlots<PopselectSlots>();
</script>

<template>
  <NPopselect
    class="c-popselect"
    v-bind="$attrs"
    :show="show"
    :trigger="trigger"
    :value="value"
    :options="options"
    :placeholder="placeholder"
    :disabled="disabled"
    :multiple="multiple"
    :scrollable="scrollable"
    :size="size"
    :clearable="clearable"
    @update:value="
      (v, o) => {
        emit('update:value', v, o);
      }
    "
  >
    <template #default>
      <slot></slot>
    </template>
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #action>
      <slot name="action"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
  </NPopselect>
</template>
