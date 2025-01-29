<script setup lang="ts">
  import { NProgress } from 'naive-ui';
  import type { CSSProperties } from 'vue';

  // https://www.naiveui.com/en-US/dark/components/progress#Progress-Slots
  withDefaults(
    defineProps<{
      /**
       * 'line' typed progress's border-radius. Keep half of default height if not passed.
       */
      borderRadius?: number | string;
      /**
       * The gap between circles when type is 'multiple-circle', suppose viewbox size is 100.
       */
      circleGap?: number;
      /**
       * Progress color. { stops: string[] } indicates a gradient color. stops array must have length of 2.
       * The first element is gradient start color. The second element is gradient end color.
       */
      color?: string | string[];
      /**
       * 'line' typed progress's fill's border-radius. Keep border-radius if not passed.
       */
      fillBorderRadius?: number | string;
      /**
       * The gap degree of half circle, 0 ~ 360.
       */
      gapDegree?: number;
      /**
       * The gap offset degree.
       */
      gapOffsetDegree?: number;
      /**
       * 'line' typed progress's height. Keep default height if not passed.
       */
      height?: number;
      /**
       * Indicator placement.
       */
      indicatorPlacement?: 'inside' | 'outside';
      /**
       * Indicator text color.
       */
      indicatorTextColor?: string;
      /**
       * Offset degree of circular progress, only works with circle typed progress.
       */
      offsetDegree?: number;
      /**
       * Percentage value.
       */
      percentage?: number | number[];
      /**
       * Processing status.
       */
      processing?: boolean;
      /**
       * Rail color.
       */
      railColor?: string | string[];
      /**
       * Rail style.
       */
      railStyle?: string | CSSProperties | Array<string | CSSProperties>;
      /**
       * Whether to display indicators.
       */
      showIndicator?: boolean;
      /**
       * Progress status. Options are 'default', 'success', 'error', 'warning' and 'info'.
       */
      status?: 'default' | 'success' | 'error' | 'warning' | 'info';
      /**
       * Progress width.
       */
      strokeWidth?: number;
      /**
       * Progress type. Options are 'line', 'circle', 'multiple-circle' and 'dashboard'.
       */
      type?: 'line' | 'circle' | 'multiple-circle' | 'dashboard';
      /**
       * Progress unit.
       */
      unit?: string;
    }>(),
    {
      borderRadius: undefined,
      circleGap: 1,
      color: undefined,
      fillBorderRadius: undefined,
      gapDegree: 75,
      gapOffsetDegree: 0,
      height: undefined,
      indicatorPlacement: 'outside',
      indicatorTextColor: undefined,
      offsetDegree: 0,
      percentage: 0,
      processing: false,
      railColor: undefined,
      railStyle: undefined,
      showIndicator: true,
      status: 'default',
      strokeWidth: 7,
      type: 'line',
      unit: '%',
    },
  );
</script>

<template>
  <NProgress
    class="c-progress"
    v-bind="$attrs"
    :border-radius="borderRadius"
    :circle-gap="circleGap"
    :color="color"
    :fill-border-radius="fillBorderRadius"
    :gap-degree="gapDegree"
    :gap-offset-degree="gapOffsetDegree"
    :height="height"
    :indicator-placement="indicatorPlacement"
    :indicator-text-color="indicatorTextColor"
    :offset-degree="offsetDegree"
    :percentage="percentage"
    :processing="processing"
    :rail-color="railColor"
    :rail-style="railStyle"
    :show-indicator="showIndicator"
    :status="status"
    :stroke-width="strokeWidth"
    :type="type"
    :unit="unit"
  >
    <template
      v-for="slot of Object.keys($slots)"
      #[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </NProgress>
</template>
