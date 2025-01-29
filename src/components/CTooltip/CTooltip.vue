<script setup lang="ts">
  import { ref } from 'vue';
  import { NTooltip } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/tooltip#Tooltip-Props
  withDefaults(
    defineProps<{
      /**
       * The event that triggers the tooltip (e.g., 'hover', 'focus', 'click').
       */
      trigger?: 'hover' | 'click' | 'focus' | 'manual';
      /**
       * The position of the tooltip (e.g., 'top', 'bottom', 'left', 'right').
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
       * Controls the visibility of the tooltip.
       */
      show?: boolean;
      /**
       * Tooltip vanish delay when trigger is hover.
       */
      duration?: number;
      /**
       * Delay before showing the tooltip.
       */
      delay?: number;
      /**
       * Disable the tooltip.
       */
      disabled?: boolean;
      /**
       * Whether to show an arrow pointing to the target.
       */
      showArrow?: boolean;
      /**
       * 'trigger' means popover's width will follow its trigger's width.
       */
      width?: number | 'trigger';
    }>(),
    {
      trigger: 'hover',
      placement: 'top',
      show: undefined,
      duration: 100,
      delay: 100,
      disabled: false,
      showArrow: false,
      width: undefined,
    },
  );

  const emit = defineEmits<{
    /**
     * Callback on show status changes.
     */
    (e: 'update:show', value: boolean): void;
    /**
     * Callback function triggered when clickoutside.
     */
    (e: 'clickoutside', event: MouseEvent): void;
  }>();

  const tooltip = ref<InstanceType<typeof NTooltip> | null>(null);

  defineExpose({
    /**
     * Set show status in uncontrolled mode.
     */
    setShow: (isShown: boolean) => tooltip.value?.setShow(isShown),
    /**
     * Sync tooltip position.
     */
    syncPosition: () => tooltip.value?.syncPosition(),
  });

  type TooltipSlots = {
    /**
     * The content inside tooltip.
     */
    default(): unknown;
    /**
     * The element or component that triggers tooltip.
     */
    trigger(): unknown;
    /**
     * The footer content of the tooltip.
     */
    footer(): unknown;
    /**
     * The header content of the tooltip.
     */
    header(): unknown;
  };

  defineSlots<TooltipSlots>();
</script>

<template>
  <NTooltip
    ref="tooltip"
    class="c-tooltip"
    v-bind="$attrs"
    :trigger="trigger"
    :placement="placement"
    :show-arrow="showArrow"
    :disabled="disabled"
    :delay="delay"
    :duration="duration"
    :show="show"
    @clickoutside="(event) => emit('clickoutside', event)"
    @update:show="(v) => emit('update:show', v)"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
    <template #header>
      <slot name="header"></slot>
    </template>
  </NTooltip>
</template>
