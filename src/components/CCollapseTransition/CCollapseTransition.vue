<script setup lang="ts">
  import { NCollapseTransition } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/collapse-transition#CollapseTransition-Props
  withDefaults(
    defineProps<{
      /**
       * Whether to play animation on first mounted.
       */
      appear?: boolean;
      /**
       * Whether to show content.
       */
      show?: boolean;
    }>(),
    {
      appear: false,
      show: true,
    },
  );
</script>

<template>
  <NCollapseTransition
    class="c-collapse-transition"
    :appear="appear"
    :show="show"
  >
    <slot></slot>
  </NCollapseTransition>
</template>
