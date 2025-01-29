<script setup lang="ts">
  import { type ButtonProps, NPopconfirm } from 'naive-ui';
  import { ref } from 'vue';

  withDefaults(
    defineProps<{
      /**
       * Trigger type. Options are 'hover', 'click', 'focus' or 'manual'
       */
      trigger?: 'hover' | 'click' | 'focus' | 'manual';

      /**
       * Cancel button's DOM props.
       */
      negativeButtonProps?: ButtonProps;

      /**
       * Cancel button text.
       */
      negativeText?: string | null;

      /**
       * Confirm button's DOM props.
       */
      positiveButtonProps?: ButtonProps;

      /**
       * Confirm button text.
       */
      positiveText?: string | null;

      /**
       * Whether to show the icon.
       */
      showIcon?: boolean;
    }>(),
    {
      trigger: undefined, // click
      negativeButtonProps: undefined,
      positiveButtonProps: undefined,
      negativeText: 'Cancel',
      positiveText: 'Confirm',
      showIcon: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Callback for confirmation.
     */
    (e: 'positiveClick'): void;
    /**
     * Callback for cancel.
     */
    (e: 'negativeClick'): void;
  }>();

  const popconfirm = ref<InstanceType<typeof NPopconfirm> | null>(null);

  defineExpose({
    /**
     * Set show status in uncontrolled mode.
     */
    setShow: (isShown: boolean) => popconfirm.value?.setShow(isShown),
    /**
     * Sync popconfirm position.
     */
    syncPosition: () => popconfirm.value?.syncPosition(),
  });

  type PopconfirmSlots = {
    /**
     * The content inside popconfirm.
     */
    default(): unknown;
    /**
     * The element or component that triggers popconfirm.
     */
    trigger(): unknown;
    /**
     * Custom action.
     */
    action(): unknown;
    /**
     * Popconfirm icon.
     */
    icon(): unknown;
  };

  defineSlots<PopconfirmSlots>();
</script>

<template>
  <NPopconfirm
    ref="popconfirm"
    class="c-popconfirm"
    v-bind="$attrs"
    :trigger="trigger"
    :negative-button-props="negativeButtonProps"
    :negative-text="negativeText"
    :positive-button-props="positiveButtonProps"
    :positive-text="positiveText"
    :show-icon="showIcon"
    @positive-click="() => emit('positiveClick')"
    @negative-click="() => emit('negativeClick')"
  >
    <slot></slot>

    <template #trigger>
      <slot name="trigger"></slot>
    </template>

    <template #action>
      <slot name="action"></slot>
    </template>

    <template #icon>
      <slot name="icon"></slot>
    </template>
  </NPopconfirm>
</template>
