<script setup lang="ts">
  import { computed } from 'vue';
  import CIcon from '../CIcon/CIcon.vue';

  interface CSkeletonProps {
    /**
     * Skeleton type. Options are 'default', 'text', 'chart' and 'bar-chart'.
     */
    type?: 'default' | 'text' | 'chart' | 'bar-chart';
    /**
     * Repeat frequency.
     */
    repeat?: number;
    /**
     * Skeleton width.
     */
    width?: string | number;
    /**
     * Skeleton height.
     */
    height?: string | number;
    /**
     * Skeleton border radius.
     */
    borderRadius?: string | number;
    /**
     * Vertical Padding.
     */
    paddingBlock?: string | number;
    /**
     * Distance after Skeleton.
     */
    marginBottom?: string | number;
    /**
     * Wheather Skeleton has rounded corners.
     */
    isRound?: boolean;
    /**
     * Height of chart group.
     */
    chartGroupHeight?: string | number;
    /**
     * Width of chart.
     */
    chartWidth?: string | number;
    /**
     * Height of chart.
     */
    chartHeight?: string | number;
  }

  const props = withDefaults(defineProps<CSkeletonProps>(), {
    type: 'default',
    repeat: 1,
    width: undefined,
    height: '14px',
    borderRadius: undefined,
    paddingBlock: undefined,
    marginBottom: undefined,
    isRound: false,
    chartGroupHeight: undefined,
    chartWidth: undefined,
    chartHeight: undefined,
  });

  function convertToStyleValue(value: string | number | undefined) {
    return typeof value === 'number' ? `${value}px` : value;
  }

  const itemsArray = computed(() => Array.from(Array(props.repeat).keys()));
  const widthValue = computed(() => convertToStyleValue(props.width));
  const heightValue = computed(() => convertToStyleValue(props.height));
  const borderRadiusValue = computed(
    () => convertToStyleValue(props.borderRadius) ?? heightValue.value,
  );
  const paddingBlockValue = computed(() =>
    convertToStyleValue(props.paddingBlock),
  );
  const marginBottomValue = computed(() =>
    convertToStyleValue(props.marginBottom),
  );
  const chartGroupHeightValue = computed(() =>
    convertToStyleValue(props.chartGroupHeight),
  );
  const chartWidthValue = computed(() => convertToStyleValue(props.chartWidth));
  const chartHeightValue = computed(() =>
    convertToStyleValue(props.chartHeight),
  );

  const isChart = computed(
    () => props.type === 'chart' || props.type === 'bar-chart',
  );
  const chartIcon = computed(() => {
    if (props.type === 'chart') {
      return 'area-chart';
    }

    return 'bar-chart';
  });
</script>

<template>
  <div
    :style="{
      width: widthValue,
      marginBottom: marginBottomValue,
      paddingTop: paddingBlockValue,
      paddingBottom: paddingBlockValue,
    }"
    class="c-skeleton"
  >
    <slot>
      <div
        v-if="type === 'text'"
        class="c-skeleton__type-group c-skeleton__type-group--text"
      >
        <div
          v-for="item in itemsArray"
          :key="item"
          :style="{ borderRadius: borderRadiusValue }"
          class="c-skeleton__item"
        ></div>
      </div>

      <div
        v-else-if="isChart"
        :style="{ height: chartGroupHeightValue }"
        class="c-skeleton__type-group c-skeleton__type-group--chart"
      >
        <CIcon
          :style="{ width: chartWidthValue, height: chartHeightValue }"
          :name="chartIcon"
        />
      </div>

      <div
        v-else
        class="c-skeleton__type-group c-skeleton__type-group--default"
      >
        <div
          v-for="item in itemsArray"
          :key="item"
          :style="{
            height: heightValue,
            borderRadius:
              isRound && itemsArray.length === 1 ? '50%' : borderRadiusValue,
          }"
          class="c-skeleton__item"
        ></div>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-skeleton {
    position: relative;

    ::v-deep(*:empty) {
      position: relative;
      background-color: var(--skeleton-color);
      overflow: hidden;
      border-radius: utils.$border-radius;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: linear-gradient(
          90deg,
          transparent,
          var(--skeleton-alt-color),
          transparent
        );
        animation: skeleton-animate-wave 1.75s infinite;
      }
    }

    &__type-group {
      display: flex;
      flex-direction: column;

      &--text {
        padding-top: 5.2px;
        padding-bottom: 5.2px;
        gap: 10.4px;

        .c-skeleton__item {
          height: 12px;
          border-radius: 12px;
        }
      }

      &--default {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      &--chart {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          fill: var(--skeleton-color);
          animation: skeleton-animate-svg 1.75s linear infinite;
        }
      }
    }

    &__item {
      height: 14px;
      gap: utils.unit(3);
    }
  }

  @keyframes skeleton-animate-wave {
    0% {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(100%);
    }
  }

  @keyframes skeleton-animate-svg {
    0%,
    100% {
      opacity: 1;
    }

    50% {
      opacity: 0.3;
    }
  }
</style>
