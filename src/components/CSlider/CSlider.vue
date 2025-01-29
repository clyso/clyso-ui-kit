<script setup lang="ts">
  import { NSlider } from 'naive-ui';
  import { computed } from 'vue';

  // https:// www.naiveui.com/en-US/dark/components/slider#Slider-Props
  type SliderValue = number | number[];
  type SliderFormatTooltip = (value: number) => string | number;

  const props = withDefaults(
    defineProps<{
      /**
       * Whether the slider is disabled.
       */
      disabled?: boolean;
      /**
       * Format of the tooltip.
       */
      formatTooltip?: SliderFormatTooltip;
      /**
       * Whether the slider can be controlled by keyboard.
       */
      keyboard?: boolean;
      /**
       * Max value of the slider.
       */
      max?: number;
      /**
       * Min value of the slider.
       */
      min?: number;
      /**
       * Whether value is maximum value.
       */
      isMaxValue?: boolean;
      /**
       * Tooltip's placement.
       * Options are 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left' and 'left-end'
       */
      placement?:
        | 'top-start'
        | 'top'
        | 'top-end'
        | 'right-start'
        | 'right'
        | 'right-end'
        | 'bottom-start'
        | 'bottom'
        | 'bottom-end'
        | 'left-start'
        | 'left'
        | 'left-end';
      /**
       * Whether to reverse the track.
       */
      isReversed?: boolean;
      /**
       * Whether the slider uses range value.
       */
      isRange?: boolean;
      /**
       * Whether to always show tooltip. Only work with non-range slider.
       */
      showTooltip?: boolean;
      /**
       * Step of the slider.
       */
      step?: number | 'mark';
      /**
       * Whether to show tooltip.
       */
      tooltip?: boolean;
      /**
       * Whether to enable vertical mode.
       */
      vertical?: boolean;
      /**
       * Value of the slider.
       */
      value: SliderValue;
    }>(),
    {
      disabled: false,
      formatTooltip: undefined,
      keyboard: true,
      max: 100,
      min: 0,
      isMaxValue: true,
      placement: undefined,
      isReversed: false,
      isRange: false,
      showTooltip: false,
      step: 1,
      tooltip: true,
      vertical: false,
    },
  );

  const emit = defineEmits<{
    /**
     * Callback on value update.
     */
    (e: 'update:value', value: SliderValue): void;
  }>();

  const computedReversed = computed<boolean>(
    () => props.isReversed || (!props.isRange && !props.isMaxValue),
  );

  function getMinValue(value: number) {
    return props.min + props.max - value;
  }

  const computedValue = computed<SliderValue>(() => {
    if (props.isMaxValue || props.isRange) {
      return props.value;
    }

    return getMinValue(props.value as number);
  });

  function handleUpdateValue(value: SliderValue) {
    if (props.isMaxValue || props.isRange) {
      emit('update:value', value);

      return;
    }

    emit('update:value', getMinValue(value as number));
  }

  const computedFormatTooltip = computed<SliderFormatTooltip | undefined>(
    () => {
      if (props.isMaxValue || props.isRange) {
        return props.formatTooltip;
      }

      return (value) =>
        props.formatTooltip?.(getMinValue(value)) ?? getMinValue(value);
    },
  );
</script>

<template>
  <NSlider
    ref="input"
    class="c-input"
    v-bind="$attrs"
    :disabled="disabled"
    :keyboard="keyboard"
    :placement="placement"
    :value="computedValue"
    :range="isRange"
    :reverse="computedReversed"
    :max="max"
    :min="min"
    :tooltip="tooltip"
    :format-tooltip="computedFormatTooltip"
    :vertical="vertical"
    @update:value="handleUpdateValue"
  >
    <template #thumb>
      <slot name="thumb"></slot>
    </template>
  </NSlider>
</template>

<style lang="scss" scoped>
  .c-slider {
    cursor: pointer;

    &--disabled {
      cursor: not-allowed;
    }
  }
</style>
