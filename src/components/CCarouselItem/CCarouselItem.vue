<script setup lang="ts">
  import { NCarouselItem } from 'naive-ui';

  defineOptions({
    name: 'CarouselItem',
  });

  // https://www.naiveui.com/en-US/dark/components/input#InputGroupLabel-Slots
</script>

<template>
  <NCarouselItem class="c-carousel-item">
    <slot></slot>
  </NCarouselItem>
</template>
