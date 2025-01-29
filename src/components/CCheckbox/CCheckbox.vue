<script setup lang="ts">
  import { NCheckbox } from 'naive-ui';
  import { ref } from 'vue';

  // https://www.naiveui.com/en-US/dark/components/checkbox#Checkbox-Props
  withDefaults(
    defineProps<{
      /**
       * Whether the checkbox is being checked manually.
       */
      checked?: boolean;

      /**
       * Whether the checkbox is checked by default.
       */
      defaultChecked?: boolean;

      /**
       * Whether the checkbox is disabled.
       */
      disabled?: boolean;

      /**
       * Whether the checkbox gains focus after being checked.
       */
      focusable?: boolean;

      /**
       * Whether the checkbox can have a third indeterminate state.
       */
      indeterminate?: boolean;

      /**
       * Checkbox label.
       */
      label?: string;

      /**
       * The size of the checkbox.
       */
      size?: 'small' | 'medium' | 'large';

      /**
       * The value of the checkbox to be used in a checkbox group.
       */
      value?: string | number;
    }>(),
    {
      checked: false,
      defaultChecked: false,
      disabled: false,
      focusable: true,
      indeterminate: false,
      label: undefined,
      size: 'medium',
      value: undefined,
    },
  );

  const emit = defineEmits<{
    (e: 'update:checked', value: boolean): void;
  }>();

  const checkbox = ref<InstanceType<typeof NCheckbox> | null>(null);

  defineExpose({
    focus: () => checkbox.value?.focus(),
    blur: () => checkbox.value?.blur(),
  });
</script>

<template>
  <NCheckbox
    ref="checkbox"
    class="c-checkbox"
    :checked="checked"
    :default-checked="defaultChecked"
    :disabled="disabled"
    :focusable="focusable"
    :indeterminate="indeterminate"
    :label="label"
    :size="size"
    :value="value"
    @update:checked="(newChecked) => emit('update:checked', newChecked)"
  >
    <slot></slot>
  </NCheckbox>
</template>
