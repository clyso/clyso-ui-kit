<script setup lang="ts">
  import { NDatePicker } from 'naive-ui';
  import { ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      /**
       * Value of the input.
       */
      value: [number, number] | null;
      /**
       * Format of the input. For detail please see: https://date-fns.org/v2.23.0/docs/format
       */
      format: string;
      /**
       * Whether the range picker is clearable.
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
      /**
       * Determines the boundary of the end date in the date range
       */
      rangeEndMode?: 'startOfDay' | 'endOfDay';

      /**
       * Placeholder of start date input
       */
      startPlaceholder?: string;

      /**
       * Placeholder of end date input
       */
      endPlaceholder?: string;
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
      rangeEndMode: 'endOfDay',
      startPlaceholder: undefined,
      endPlaceholder: undefined,
    },
  );
  // Other props are listed here:
  // https://www.naiveui.com/en-US/dark/components/date-picker#DateRange-Type-Props

  const emit = defineEmits<{
    /**
     * Emits the updated value of the date range picker.
     */
    (e: 'update:value', value: [number, number] | null): void;
  }>();

  function getEndOfDayMs(startOfDayMs: number): number {
    const millisecondsInADay = 86400000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

    return startOfDayMs + millisecondsInADay - 1;
  }

  function handleValueUpdate(value: [number, number] | null): void {
    if (value === null || props.rangeEndMode === 'startOfDay') {
      emit('update:value', value);

      return;
    }

    emit('update:value', [value[0], getEndOfDayMs(value[1])]);
  }

  const datepicker = ref<InstanceType<typeof NDatePicker> | null>(null);

  defineExpose({
    focus: () => datepicker.value?.focus(),
    blur: () => datepicker.value?.blur(),
  });
</script>

<template>
  <NDatePicker
    ref="datepicker"
    class="c-date-range-picker"
    type="daterange"
    v-bind="$attrs"
    :value="value"
    :format="format"
    :clearable="clearable"
    :disabled="disabled"
    :size="size"
    :placement="placement"
    :first-day-of-week="firstDayOfWeek"
    :panel="panel"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    @update:value="handleValueUpdate"
  >
    <template
      v-for="slot of Object.keys($slots)"
      #[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </NDatePicker>
</template>
