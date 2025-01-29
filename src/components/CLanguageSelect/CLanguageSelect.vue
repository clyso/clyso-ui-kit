<script setup lang="ts">
  import { I18nLocale } from '../../types/i18n';
  import CSelect from '../CSelect/CSelect.vue';

  const props = withDefaults(
    defineProps<{
      value: I18nLocale;
      size?: 'tiny' | 'small' | 'medium' | 'large';
    }>(),
    {
      size: 'medium',
    },
  );
  const emit = defineEmits<{
    (e: 'update:value', value: I18nLocale): void;
  }>();

  function emitInput(value: I18nLocale) {
    emit('update:value', value);
  }

  const options = Object.values(I18nLocale).map((locale) => ({
    label: locale.toUpperCase(),
    value: locale,
  }));
</script>

<template>
  <CSelect
    class="c-language-select"
    :value="props.value"
    :options="options"
    :size="size"
    @update:value="emitInput"
  />
</template>

<style scoped lang="scss">
  .c-language-select {
    min-width: 70px;
  }
</style>
