<script setup lang="ts">
  import { computed } from 'vue';
  import CSlider from '../CSlider/CSlider.vue';

  const props = withDefaults(
    defineProps<{
      /**
       * The current value of the slider.
       */
      value: number;

      /**
       * Whether the slider represents the maximum value.
       */
      isMaxValue?: boolean;

      /**
       * Whether the slider is reversed (decreasing value from left to right).
       */
      isReversed?: boolean;

      /**
       * The maximum value of the slider.
       */
      max?: number;

      /**
       * The minimum value of the slider.
       */
      min?: number;

      /**
       * The middle value of the slider. If not provided, the middle is calculated.
       */
      middle?: number;

      /**
       * Whether the slider is disabled.
       */
      disabled?: boolean;
    }>(),
    {
      isMaxValue: true,
      isReversed: false,
      max: 100,
      min: 0,
      middle: undefined,
      disabled: false,
    },
  );

  const emit = defineEmits<{
    /**
     * Emits the updated slider value.
     */
    (e: 'update:value', value: number): void;
  }>();

  const length = computed(() => props.max - props.min);
  const gradualMiddle = computed(() => {
    if (props.middle !== undefined) {
      return props.middle;
    }

    return Math.ceil(length.value * 0.5);
  });
  const gradualStartLength = computed(() => gradualMiddle.value - props.min);
  const gradualEndLength = computed(
    () => length.value - gradualStartLength.value,
  );
  const linearHalfLength = computed(() => length.value / 2);
  const linearMiddle = computed(() => props.min + linearHalfLength.value);

  const linearValue = computed<number>(() => convertToLinear(props.value));

  function handleLinearValueUpdate(value: number | number[]) {
    if (Array.isArray(value)) {
      return;
    }

    emit('update:value', convertToExponential(value));
  }

  function convertToLinear(value: number) {
    if (value <= gradualMiddle.value) {
      return (
        props.min +
        Math.ceil(
          linearHalfLength.value *
            ((value - props.min) / gradualStartLength.value),
        )
      );
    }

    return (
      linearMiddle.value +
      Math.ceil(
        linearHalfLength.value *
          ((value - gradualMiddle.value) / gradualEndLength.value),
      )
    );
  }

  function convertToExponential(value: number) {
    if (value <= linearMiddle.value) {
      return (
        props.min +
        Math.ceil(
          gradualStartLength.value *
            ((value - props.min) / linearHalfLength.value),
        )
      );
    }

    return (
      gradualMiddle.value +
      Math.ceil(
        gradualEndLength.value *
          ((value - linearMiddle.value) / linearHalfLength.value),
      )
    );
  }
</script>

<template>
  <CSlider
    ref="input"
    class="c-slider-gradual"
    :value="linearValue"
    :is-reversed="isReversed"
    :is-max-value="isMaxValue"
    :max="max"
    :min="min"
    :disabled="disabled"
    :format-tooltip="() => value"
    @update:value="handleLinearValueUpdate"
  >
    <template
      v-if="$slots.thumb"
      #thumb
    >
      <slot name="thumb"></slot>
    </template>
  </CSlider>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-slider-gradual {
    &:not(.c-slider--active) {
      ::v-deep(.c-slider-handle-wrapper) {
        transition:
          right utils.$transition-duration,
          left utils.$transition-duration;
      }

      ::v-deep(.c-slider-rail__fill) {
        transition: width utils.$transition-duration;
      }
    }
  }
</style>
