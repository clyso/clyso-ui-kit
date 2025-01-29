<script setup lang="ts">
  import { NTag } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/tag#Tag-Props
  withDefaults(
    defineProps<{
      /**
       * Whether the tag has a border.
       */
      bordered?: boolean;

      /**
       * Whether the tag is checkable.
       * Note: This nullifies the `type` property.
       */
      checkable?: boolean;

      /**
       * Whether the tag is checked.
       * Note: Used in conjunction with the `checkable` prop.
       */
      checked?: boolean;

      /**
       * Whether the tag shows a close button.
       */
      closable?: boolean;

      /**
       * Defines custom colors for the tag, including background, border, and text colors.
       * Note: This will override the `type` property's color.
       */
      color?: {
        color?: string;
        borderColor?: string;
        textColor?: string;
      };

      /**
       * Whether the tag is disabled.
       */
      disabled?: boolean;

      /**
       * Whether the tag has rounded corners.
       */
      round?: boolean;

      /**
       * Size of the tag, which can be 'tiny', 'small', 'medium', or 'large'.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * Whether to use strong (bold) text.
       * @since 2.30.0
       */
      strong?: boolean;

      /**
       * Whether the tag triggers a click event when the close button is clicked.
       * @since 2.32.2
       */
      triggerClickOnClose?: boolean;

      /**
       * Type of the tag, which determines its default color scheme.
       * Can be 'default', 'primary', 'info', 'success', 'warning', or 'error'.
       */
      type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
    }>(),
    {
      bordered: true,
      checkable: false,
      checked: false,
      closable: false,
      color: undefined,
      disabled: false,
      round: false,
      size: 'medium',
      strong: false,
      triggerClickOnClose: false,
      type: 'default',
    },
  );

  const emit = defineEmits<{
    /**
     * Emits when the close button is clicked.
     */
    (e: 'close', event: MouseEvent): void;

    /**
     * Emits when the checked status changes.
     */
    (e: 'update:checked', value: boolean): void;
  }>();
</script>

<template>
  <NTag
    class="c-tag"
    :bordered="bordered"
    :checkable="checkable"
    :checked="checked"
    :closable="closable"
    :color="color"
    :disabled="disabled"
    :round="round"
    :size="size"
    :strong="strong"
    :trigger-click-on-close="triggerClickOnClose"
    :type="type"
    v-bind="$attrs"
    @close="
      (event) => {
        emit('close', event);
      }
    "
    @update:checked="
      (event) => {
        emit('update:checked', event);
      }
    "
  >
    <template #avatar>
      <slot name="avatar"></slot>
    </template>
    <template #icon>
      <slot name="icon"></slot>
    </template>

    <slot></slot>
  </NTag>
</template>
