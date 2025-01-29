<script setup lang="ts">
  import { NCarousel } from 'naive-ui';
  import { type CSSProperties, ref } from 'vue';

  defineOptions({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Carousel',
  });

  // https://www.naiveui.com/en-US/dark/components/carousel#Carousel-Props
  withDefaults(
    defineProps<{
      /**
       * Whether to scroll automatically.
       */
      autoplay?: boolean;

      /**
       * Whether to center the current view carousel.
       * @version 2.24.0
       */
      centeredSlides?: boolean;

      /**
       * Current index.
       * @version 2.24.0
       */
      currentIndex?: number;

      /**
       * Default index.
       * @version 2.24.0
       */
      defaultIndex?: number;

      /**
       * Carousel shows the direction.
       */
      direction?: 'horizontal' | 'vertical';

      /**
       * Dot placement in the panel.
       * @version 2.24.0
       */
      dotPlacement?: 'top' | 'bottom' | 'left' | 'right';

      /**
       * Dot style.
       * @version 2.24.0
       */
      dotType?: 'dot' | 'line';

      /**
       * Whether to switch the carousel by dragging the mouse.
       * @version 2.24.0
       */
      draggable?: boolean;

      /**
       * Transition effect when switching between carousel.
       * @version 2.24.0, 'card' 2.24.2
       */
      effect?: 'slide' | 'fade' | 'card' | 'custom';

      /**
       * Auto play interval (ms).
       */
      interval?: number;

      /**
       * Whether to switch the carousel by pressing the key, it only works when the focus is on Dots.
       * @version 2.24.0
       */
      keyboard?: boolean;

      /**
       * Whether to loop.
       * @version 2.24.0
       */
      loop?: boolean;

      /**
       * Whether to switch the carousel through the mouse wheel.
       * @version 2.24.0
       */
      mousewheel?: boolean;

      /**
       * Next slide's style.
       * @version 2.27.0
       */
      nextSlideStyle?: CSSProperties | string;

      /**
       * Previous slide's style.
       * @version 2.27.0
       */
      prevSlideStyle?: CSSProperties | string;

      /**
       * Whether to show arrow buttons.
       * @version 2.24.0
       */
      showArrow?: boolean;

      /**
       * Whether to show dots.
       * @version 2.24.0
       */
      showDots?: boolean;

      /**
       * Number of carousels displayed on per view.
       * @version 2.24.0
       */
      slidesPerView?: 'auto' | number;

      /**
       * The spacing between the carousels.
       * @version 2.24.0
       */
      spaceBetween?: number;

      /**
       * Whether to switch the carousel by touch.
       * @version 2.24.0
       */
      touchable?: boolean;

      /**
       * The style of the transition effect.
       * @version 2.24.0
       */
      transitionStyle?: {
        transitionDuration?: string;
        transitionTimingFunction?: string;
      };

      /**
       * Custom transition effect properties, reference.
       * @version 2.24.0
       */
      transitionProps?: object;

      /**
       * The method of manual switching.
       */
      trigger?: 'click' | 'hover';
    }>(),
    {
      autoplay: false,
      centeredSlides: false,
      currentIndex: undefined,
      defaultIndex: 0,
      direction: 'horizontal',
      dotPlacement: 'bottom',
      dotType: 'dot',
      draggable: false,
      effect: 'slide',
      interval: 5000,
      keyboard: false,
      loop: true,
      mousewheel: false,
      nextSlideStyle: undefined,
      prevSlideStyle: undefined,
      showArrow: false,
      showDots: true,
      slidesPerView: 1,
      spaceBetween: 0,
      touchable: true,
      transitionStyle: undefined,
      transitionProps: undefined,
      trigger: 'click',
    },
  );

  const emit = defineEmits<{
    (e: 'update:currentIndex', currentIndex: number, lastIndex: number): void;
  }>();

  const carousel = ref<InstanceType<typeof NCarousel> | null>(null);

  defineExpose({
    /**
     * Slide to index.
     */
    to: (index: number): void => carousel.value?.to(index),
    /**
     * Slide to previous page.
     */
    prev: (): void => carousel.value?.prev(),
    /**
     * Slide to next page.
     */
    next: (): void => carousel.value?.next(),
    /**
     * Get current index.
     */
    getCurrentIndex: (): number => carousel.value?.getCurrentIndex() ?? 0,
  });
</script>

<template>
  <NCarousel
    ref="carousel"
    class="c-carousel"
    :autoplay="autoplay"
    :centered-slides="centeredSlides"
    :current-index="currentIndex"
    :default-index="defaultIndex"
    :direction="direction"
    :dot-placement="dotPlacement"
    :dot-type="dotType"
    :draggable="draggable"
    :effect="effect"
    :interval="interval"
    :keyboard="keyboard"
    :loop="loop"
    :mousewheel="mousewheel"
    :next-slide-style="nextSlideStyle"
    :prev-slide-style="prevSlideStyle"
    :show-arrow="showArrow"
    :show-dots="showDots"
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :touchable="touchable"
    :transition-style="transitionStyle"
    :transition-props="transitionProps"
    :trigger="trigger"
    @update:current-index="
      (currentIndex, lastIndex) =>
        emit('update:currentIndex', currentIndex, lastIndex)
    "
  >
    <slot></slot>

    <template #arrow="scope">
      <slot
        name="arrow"
        v-bind="scope"
      ></slot>
    </template>

    <template #dots="scope">
      <slot
        name="dots"
        v-bind="scope"
      ></slot>
    </template>
  </NCarousel>
</template>
