<script setup lang="ts">
  import { provide, computed } from 'vue';
  import type { DescriptionListProps } from '../../types/descriptionList';
  import { DESCRIPTION_ITEM_CONFIG_INJECT_KEY } from '../../constants/descriptionList';

  const props = withDefaults(defineProps<DescriptionListProps>(), {
    direction: 'column',
    rows: 3,
    columns: 3,
    labelPlacement: 'top',
    labelAlignment: 'start',
    size: 'medium',
  });

  provide(
    DESCRIPTION_ITEM_CONFIG_INJECT_KEY,
    computed(() => ({
      labelPlacement: props.labelPlacement,
      labelAlignment: props.labelAlignment,
      size: props.size,
    })),
  );

  const descriptionListCssVars = computed(() => ({
    '--c-desc-list-row': props.rows,
    '--c-desc-list-column': props.columns,
  }));
  const descriptionListClasses = computed(() => [
    `c-description-list--${props.direction}`,
    `c-description-list--${props.size}`,
  ]);
</script>

<template>
  <dl
    class="c-description-list"
    :style="descriptionListCssVars"
    :class="descriptionListClasses"
  >
    <slot></slot>
  </dl>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-description-list {
    display: grid;
    gap: utils.unit(3);

    &--column {
      grid-template-columns: repeat(var(--c-desc-list-column), 1fr);

      @include utils.mobile {
        grid-template-columns: auto;
      }
    }

    &--row {
      grid-template-rows: repeat(var(--c-desc-list-row), 1fr);
      grid-auto-flow: column;

      @include utils.mobile {
        grid-template-rows: auto;
      }
    }

    &--small {
      gap: utils.unit(2);
    }
  }
</style>
