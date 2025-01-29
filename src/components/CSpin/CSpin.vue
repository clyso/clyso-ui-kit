<script setup lang="ts">
  import { NSpin } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/spin#Spin-Props
  withDefaults(
    defineProps<{
      /**
       * Content Class of the spin.
       */
      contentClass?: string;
      /**
       * Content style of the spin.
       */
      contentStyle?: string | Record<string, unknown>;
      /**
       * Description of the spin.
       */
      description?: string;
      /**
       * Specify whether icon rotates, only working for custom icon.
       */
      rotate?: boolean;
      /**
       * Size of the spin.
       */
      size?: 'small' | 'medium' | 'large' | number;
      /**
       * Specify whether spin is active when spin has content inside. It won't work if you just use spin itself.
       */
      show?: boolean;
      /**
       * Relative width of spin's stroke, assuming the outer radius of spin is 100.
       */
      strokeWidth?: number;
      /**
       * Color of the spin.
       */
      stroke?: string;
      /**
       * Specifies a delay in milliseconds for loading state (prevent flush).
       */
      delay?: number;
    }>(),
    {
      contentClass: undefined,
      contentStyle: undefined,
      description: undefined,
      rotate: true,
      size: 'medium',
      show: true,
      strokeWidth: undefined,
      stroke: undefined,
      delay: undefined,
    },
  );

  type SpinSlots = {
    /**
     * If set, spin will wrap the content.
     */
    default(): unknown;
    /**
     * Description of the spin.
     */
    description(): unknown;
    /**
     * Customize the spin icon.
     */
    icon?(): unknown;
  };

  defineSlots<SpinSlots>();
</script>

<template>
  <NSpin
    class="c-spin"
    :description="description"
    :rotate="rotate"
    :size="size"
    :show="show"
    :stroke-width="strokeWidth"
    :stroke="stroke"
    :delay="delay"
    v-bind="$attrs"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #description>
      <slot name="description"></slot>
    </template>
    <template
      v-if="$slots.icon"
      #icon
    >
      <slot name="icon"></slot>
    </template>
  </NSpin>
</template>
