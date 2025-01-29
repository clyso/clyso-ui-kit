<script setup lang="ts">
  import type { CSSProperties } from 'vue';
  import CIcon from '../CIcon/CIcon.vue';

  withDefaults(
    defineProps<{
      /**
       * A boolean value indicating the current state or condition.
       */
      value: boolean;

      /**
       * An optional object to define the inline CSS styles for the icon.
       * Should be a valid CSSProperties object.
       */
      iconStyle?: CSSProperties;
    }>(),
    {
      iconStyle: undefined,
    },
  );
</script>

<template>
  <span class="c-boolean-indicator">
    <CIcon
      v-if="value"
      key="true"
      :style="iconStyle"
      class="c-boolean-indicator__icon c-boolean-indicator__icon--true"
      name="checkmark-circle"
      :is-inline="true"
    />
    <CIcon
      v-else
      key="false"
      :style="iconStyle"
      class="c-boolean-indicator__icon c-boolean-indicator__icon--false"
      name="close-circle"
      :is-inline="true"
    />
  </span>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-boolean-indicator {
    &__icon {
      width: 18px;
      height: 18px;

      &--true {
        color: var(--success-color);
      }

      &--false {
        color: var(--text-color-3);
      }
    }
  }
</style>
