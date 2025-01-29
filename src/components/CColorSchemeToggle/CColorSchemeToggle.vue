<script setup lang="ts">
  import { computed } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import { ColorScheme } from '../../types/theme';
  import CIcon from '../CIcon/CIcon.vue';

  const props = defineProps<{
    /**
     * The current color scheme
     */
    value: ColorScheme;
  }>();

  const emit = defineEmits<{
    /**
     * Fires when value is updated
     */
    (e: 'update:value', value: ColorScheme): void;
  }>();

  const isDark = computed(() => props.value === ColorScheme.DARK);

  function emitInput() {
    emit('update:value', isDark.value ? ColorScheme.LIGHT : ColorScheme.DARK);
  }
</script>

<template>
  <CButton
    class="c-color-scheme-toggle"
    ghost
    circle
    :bordered="false"
    @click="emitInput"
  >
    <template #icon>
      <CIcon
        class="c-color-scheme-toggle__icon"
        :is-inline="true"
        :name="isDark ? 'sunny' : 'moon'"
      />
    </template>
  </CButton>
</template>

<style scoped lang="scss">
  .c-color-scheme-toggle {
    display: inline-flex;

    &__icon {
      fill: var(--text-color-base);
    }
  }
</style>
