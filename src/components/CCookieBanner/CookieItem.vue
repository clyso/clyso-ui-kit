<script setup lang="ts" generic="T extends string">
  import { computed } from 'vue';
  import type { CookieBannerItem } from '../../types/cookieBanner';
  import CSwitch from '../CSwitch/CSwitch.vue';

  const props = defineProps<{
    item: CookieBannerItem<T>;
    isEnabled: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update', value: boolean): void;
  }>();

  const isSwitchDisabled = computed(
    () => props.item.isMandatory || props.item.isDisabled,
  );

  function handleSwitch(value: boolean) {
    if (isSwitchDisabled.value) {
      return;
    }

    emit('update', value);
  }
</script>

<template>
  <div class="cookie-item">
    <div class="cookie-item__info">
      <h5 class="cookie-item__title">
        {{ item.title }}
      </h5>

      <p class="cookie-item__description">
        {{ item.description }}
      </p>
    </div>
    <div class="cookie-item__control">
      <CSwitch
        :value="isEnabled"
        :disabled="item.isMandatory || item.isDisabled"
        @update:value="handleSwitch"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .cookie-item {
    display: flex;
    gap: utils.unit(4);

    &__title {
      margin-bottom: utils.unit(1);
      font-family: utils.$font-primary;
      font-weight: utils.$font-weight-normal;
    }

    &__description {
      color: var(--text-color-3);
    }
  }
</style>
