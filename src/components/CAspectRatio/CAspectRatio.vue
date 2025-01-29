<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    /**
     * The aspect ratio in the format w:h (width:height, e.g '4:3')
     */
    ratio: string;
  }>();

  const paddingTop = computed(() => {
    const [w, h] = props.ratio.split(':').map(Number);

    return `${(h / w) * 100}%`;
  });
</script>

<template>
  <div
    :style="{ paddingTop }"
    class="c-aspect-ratio"
  >
    <div class="c-aspect-ratio__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-aspect-ratio {
    position: relative;

    &__content {
      @include utils.absolute-fit;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
