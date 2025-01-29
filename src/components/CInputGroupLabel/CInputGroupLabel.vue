<script setup lang="ts">
  import { NInputGroupLabel } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/input#InputGroupLabel-Slots
  withDefaults(
    defineProps<{
      /**
       * Size of the label.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';
    }>(),
    {
      size: 'medium',
    },
  );
</script>

<template>
  <NInputGroupLabel
    :size="size"
    class="c-input-group-label"
  >
    <slot></slot>
  </NInputGroupLabel>
</template>
