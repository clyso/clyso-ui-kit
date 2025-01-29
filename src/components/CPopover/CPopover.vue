<script setup lang="ts">
  import { NPopover } from 'naive-ui';
  import { ref } from 'vue';

  // https://www.naiveui.com/en-US/dark/components/popover#Popover-Methods
  withDefaults(
    defineProps<{
      /**
       * Whether to show popover.
       */
      show?: boolean;
      /**
       * The popover trigger type.
       */
      trigger?: 'hover' | 'click' | 'focus' | 'manual';
      /**
       * Popover placement.
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
       * Popover vanish delay when trigger is hover.
       */
      duration?: number;
      /**
       * Popover showing delay when trigger is hover.
       */
      delay?: number;
      /**
       * Whether the popover can't be activated.
       */
      disabled?: boolean;
      /**
       * Whether to show arrow if set.
       */
      showArrow?: boolean;
      /**
       * 'trigger' means popover's width will follow its trigger's width.
       */
      width?: number | 'trigger';
    }>(),
    {
      show: undefined,
      trigger: 'hover',
      placement: 'top',
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

  const popover = ref<InstanceType<typeof NPopover> | null>(null);

  defineExpose({
    /**
     * Set show status in uncontrolled mode.
     */
    setShow: (isShown: boolean) => popover.value?.setShow(isShown),
    /**
     * Sync popover position.
     */
    syncPosition: () => popover.value?.syncPosition(),
  });

  type PopoverSlots = {
    /**
     * The content inside popover.
     */
    default(): unknown;
    /**
     * The element or component that triggers popover.
     */
    trigger(): unknown;
    /**
     * The footer content of the popover.
     */
    footer(): unknown;
    /**
     * The header content of the popover.
     */
    header(): unknown;
  };

  defineSlots<PopoverSlots>();
</script>

<template>
  <NPopover
    ref="popover"
    class="c-popover"
    v-bind="$attrs"
    :show="show"
    :trigger="trigger"
    :placement="placement"
    :duration="duration"
    :delay="delay"
    :disabled="disabled"
    :show-arrow="showArrow"
    :width="width"
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
  </NPopover>
</template>
