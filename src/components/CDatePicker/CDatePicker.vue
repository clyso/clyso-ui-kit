<script setup lang="ts">
  import { NDatePicker } from 'naive-ui';
  import { ref } from 'vue';

  withDefaults(
    defineProps<{
      /**
       * Date picker type.
       */
      type?:
        | 'date'
        | 'datetime'
        | 'datetimerange'
        | 'month'
        | 'monthrange'
        | 'year'
        | 'yearrange'
        | 'quarter'
        | 'quarterrange'
        | 'week';
      /**
       * Format of the input. For detail please see: https://date-fns.org/v2.23.0/docs/format
       */
      format: string;
      /**
       * Whether the date picker is clearable.
       */
      clearable?: boolean;
      /**
       * Whether the date picker is disabled.
       */
      disabled?: boolean;
      /**
       * Size of the date picker.
       */
      size?: 'small' | 'medium' | 'large';
      /**
       * Panel's placement.
       * @version 2.25.0
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
       * The first day of a week on calendar, 0 means Monday.
       */
      firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * Whether to use date-picker as panel.
       */
      panel?: boolean;
    }>(),
    {
      format: 'yyyy-MM-dd',
      clearable: false,
      disabled: false,
      size: 'medium',
      placement: 'bottom-start',
      firstDayOfWeek: undefined,
      panel: false,
      type: 'date',
    },
  );
  // Other props are listed here:
  // https://www.naiveui.com/en-US/dark/components/date-picker#Date-Type-Props

  const datepicker = ref<InstanceType<typeof NDatePicker> | null>(null);

  defineExpose({
    focus: () => datepicker.value?.focus(),
    blur: () => datepicker.value?.blur(),
  });
</script>

<template>
  <NDatePicker
    ref="datepicker"
    class="c-date-picker"
    :type="type"
    :format="format"
    :clearable="clearable"
    :disabled="disabled"
    :size="size"
    :placement="placement"
    :first-day-of-week="firstDayOfWeek"
    :panel="panel"
    v-bind="$attrs"
  >
    <template
      v-for="slot of Object.keys($slots)"
      #[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </NDatePicker>
</template>
