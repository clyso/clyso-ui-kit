<script setup lang="ts" generic="T extends string">
  import { computed, ref, watch } from 'vue';

  const props = withDefaults(
    defineProps<{
      /**
       * The name of the icon to be displayed.
       * This should correspond to a specific icon within your icon set.
       */
      name: string;
      /**
       * Whether the icon should be displayed inline with text.
       * If set to `true`, the icon will align with the surrounding text. If `false` - the icon will be of its real size.
       * If set, native `width` and `height` won't be used.
       */
      isInline?: boolean;

      /**
       * Width of an icon in pixels
       */
      width?: number;

      /**
       * Height of an icon in pixels
       */
      height?: number;
    }>(),
    {
      isInline: false,
      width: undefined,
      height: undefined,
    },
  );

  const symbolId = computed(() => `#icon-${props.name}`);
  const iconClass = computed(() => `c-icon--${props.name}`);
  const viewBox = ref<DOMRect | null>(null);

  function setViewBox() {
    const svgElement = document.querySelector(
      symbolId.value,
    ) as SVGSymbolElement | null;

    if (!svgElement) {
      return;
    }

    viewBox.value = svgElement.viewBox.baseVal;
  }

  const dimensions = computed(() => {
    if (props.width && props.height) {
      return { width: props.width, height: props.height };
    }

    if (!viewBox.value) {
      return { width: 0, height: 0 };
    }

    const { width, height } = viewBox.value;

    return { width, height };
  });

  const viewBoxString = computed(() => {
    if (!viewBox.value) {
      return '';
    }

    const { x, y, width, height } = viewBox.value;

    return `${x} ${y} ${width} ${height}`;
  });

  watch(() => props.name, setViewBox, { immediate: true });
</script>

<template>
  <svg
    class="c-icon"
    :class="[iconClass, { 'c-icon--inline': isInline }]"
    aria-hidden="true"
    :height="dimensions.height"
    :width="dimensions.width"
    :viewBox="viewBoxString"
  >
    <use
      ref="symbol"
      :href="symbolId"
    ></use>
  </svg>
</template>

<style lang="scss" scoped>
  .c-icon {
    display: block;
    fill: currentColor;

    &:focus {
      outline: none;
    }

    &--inline {
      width: 1em;
      height: 1em;
    }
  }
</style>
