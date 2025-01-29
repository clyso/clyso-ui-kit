<script setup lang="ts">
  import { NRadioGroup } from 'naive-ui';

  withDefaults(
    defineProps<{
      /**
       * The current selected value of the radio group.
       * Can be a string, number, boolean, or null.
       */
      value?: string | number | boolean | null;

      /**
       * Whether all radio buttons in the group are disabled.
       */
      disabled?: boolean;

      /**
       * The name attribute for all radio buttons in the group.
       */
      name?: string;

      /**
       * The size of the radio buttons in the group.
       * Options are 'small', 'medium', or 'large'.
       */
      size?: 'small' | 'medium' | 'large';

      /**
       * The default selected value when the radio group is uncontrolled.
       */
      defaultValue?: string | number | boolean | null;
    }>(),
    {
      value: null,
      disabled: false,
      name: undefined,
      size: 'medium',
      defaultValue: undefined,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the value of the radio group changes.
     */
    (e: 'update:value', value: never): void;
  }>();
</script>

<template>
  <NRadioGroup
    class="c-radio-group"
    v-bind="$attrs"
    :value="value"
    :disabled="disabled"
    :name="name"
    :size="size"
    :default-value="defaultValue"
    @update:value="(newValue) => emit('update:value', newValue)"
  >
    <slot></slot>
  </NRadioGroup>
</template>
