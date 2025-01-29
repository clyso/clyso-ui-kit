<script setup lang="ts">
  import { NBadge } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/badge#Badge-Slots
  withDefaults(
    defineProps<{
      /**
       * Badge color.
       */
      color?: string;
      /**
       * Show badge as dot.
       */
      dot?: boolean;
      /**
       * The maximum number of the badge when its value overflows.
       */
      max?: number;
      /**
       * Offset of the badge from the left and top of the default position.
       */
      offset?: [string | number, string | number];
      /**
       * Show processing status.
       */
      processing?: boolean;
      /**
       * Whether to display the badge, even if provided value equals 0.
       */
      showZero?: boolean;
      /**
       * Whether the badge should be shown altogether.
       */
      show?: boolean;
      /**
       * Type of the badge.
       */
      type?: 'default' | 'success' | 'error' | 'warning' | 'info';
      /**
       * Badge's value.
       */
      value?: string | number;
    }>(),
    {
      color: undefined,
      dot: false,
      max: undefined,
      offset: undefined,
      processing: false,
      showZero: false,
      show: true,
      type: 'default',
      value: undefined,
    },
  );
</script>

<template>
  <NBadge
    class="c-badge"
    :color="color"
    :dot="dot"
    :max="max"
    :offset="offset"
    :processing="processing"
    :show-zero="showZero"
    :show="show"
    :type="type"
    :value="value"
  >
    <slot></slot>
  </NBadge>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-badge {
    ::v-deep(.c-badge-sup) {
      @include utils.apply-styles(utils.$text-tiny);
    }
  }
</style>
