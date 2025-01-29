<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { DESCRIPTION_ITEM_CONFIG_INJECT_KEY } from '../../constants/descriptionList';
  import type { DescriptionItemConfig } from '../../types/descriptionList';

  const config = inject(
    DESCRIPTION_ITEM_CONFIG_INJECT_KEY,
    computed<DescriptionItemConfig>(() => ({
      labelPlacement: 'top',
      labelAlignment: 'start',
      size: 'medium',
    })),
  );

  const descriptionItemClasses = computed(() => [
    `c-description-item--${config.value.size}`,
    `c-description-item--${config.value.labelPlacement}`,
    `c-description-item--align-label-${config.value.labelAlignment}`,
  ]);
</script>

<template>
  <div
    class="c-description-item"
    :class="descriptionItemClasses"
  >
    <dt class="c-description-item__label">
      <slot name="label"></slot>
    </dt>
    <dd class="c-description-item__value">
      <slot></slot>
    </dd>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-description-item {
    display: grid;

    &--left {
      grid-template-columns: auto minmax(0, 1fr);
      gap: utils.unit(3);

      &.c-description-item--small {
        gap: utils.unit(2);
      }
    }

    &--small {
      @include utils.apply-styles(utils.$text-caption);
    }

    &--large {
      @include utils.apply-styles(utils.$text-large);
    }

    &--align-label-center {
      .c-description-item__label {
        align-content: center;
      }
    }

    &__label {
      font-weight: utils.$font-weight-semibold;
      min-width: 0;
    }

    &__value {
      @include utils.break-word;
      font-weight: utils.$font-weight-normal;
      min-width: 0;
      align-content: center;
    }
  }
</style>
