<script setup lang="ts">
  import {
    type DropdownDividerOption,
    type DropdownGroupOption,
    type DropdownRenderOption,
    NDropdown,
  } from 'naive-ui';
  import {
    type DropdownMenuProps,
    type DropdownOption,
    type NodeProps,
  } from 'naive-ui/es/dropdown/src/interface';
  import { type VNode, type VNodeChild } from 'vue';

  withDefaults(
    defineProps<{
      /**
       * The array of dropdown options.
       * Can include different types like options, groups, dividers, or custom render options.
       */
      options: Array<
        | DropdownOption
        | DropdownGroupOption
        | DropdownDividerOption
        | DropdownRenderOption
      >;

      /**
       * Whether to use an animation when showing dropdown options.
       */
      animated?: boolean;

      /**
       * Whether to apply the inverted style to the dropdown.
       */
      inverted?: boolean;

      /**
       * Field name for children options in grouped dropdowns.
       */
      childrenField?: string;

      /**
       * Whether the dropdown supports keyboard operation.
       * Note: Be cautious about conflicts with other components that handle keyboard input.
       */
      keyboard?: boolean;

      /**
       * Field name for the unique key of each dropdown option.
       */
      keyField?: string;

      /**
       * Field name for the label of dropdown options.
       */
      labelField?: string;

      /**
       * A function to generate HTML attributes for dropdown options.
       */
      nodeProps?: NodeProps;

      /**
       * A function to generate HTML attributes for the dropdown menu.
       */
      menuProps?: DropdownMenuProps;

      /**
       * Function to render icons for dropdown options.
       */
      renderIcon?: (option: DropdownOption) => VNodeChild;

      /**
       * Function to render labels for dropdown options.
       */
      renderLabel?: (option: DropdownOption) => VNodeChild;

      /**
       * Function to render the entire dropdown option node.
       */
      renderOption?: (props: {
        node: VNode;
        option: DropdownOption | DropdownGroupOption;
      }) => VNodeChild;

      /**
       * The size of the dropdown component.
       */
      size?: 'small' | 'medium' | 'large' | 'huge';

      /**
       * The trigger for dropdown.
       */
      trigger?: 'click' | 'hover' | 'focus' | 'manual';

      /**
       * Show dropdown flag when manual trigger is selected
       */
      show?: boolean;

      placement?:
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-start'
        | 'top-end'
        | 'left-start'
        | 'left-end'
        | 'right-start'
        | 'right-end'
        | 'bottom-start'
        | 'bottom-end';
    }>(),
    {
      animated: true,
      inverted: false,
      childrenField: 'children',
      keyboard: true,
      keyField: 'key',
      labelField: 'label',
      nodeProps: undefined,
      menuProps: undefined,
      renderIcon: undefined,
      renderLabel: undefined,
      renderOption: undefined,
      size: 'medium',
      trigger: 'click',
      show: undefined,
      placement: undefined,
    },
  );

  const emit = defineEmits<{
    /**
     * Triggered when a click occurs outside of the dropdown.
     */
    (e: 'clickoutside', event: MouseEvent): void;

    /**
     * Triggered when an option is selected in the dropdown.
     */
    (e: 'select', key: string, option?: DropdownOption): void;
  }>();
</script>

<template>
  <NDropdown
    class="c-dropdown"
    v-bind="$attrs"
    :options="options"
    :animated="animated"
    :inverted="inverted"
    :children-field="childrenField"
    :keyboard="keyboard"
    :key-field="keyField"
    :label-field="labelField"
    :node-props="nodeProps"
    :menu-props="menuProps"
    :render-icon="renderIcon"
    :render-label="renderLabel"
    :render-option="renderOption"
    :size="size"
    :trigger="trigger"
    :show="show"
    :placement="placement"
    @clickoutside="(event) => emit('clickoutside', event)"
    @select="(key, option) => emit('select', key, option)"
  >
    <slot></slot>
  </NDropdown>
</template>
