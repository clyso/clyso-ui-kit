<script setup lang="ts">
  import { NRadio } from 'naive-ui';

  defineOptions({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Radio',
  });

  // https://www.naiveui.com/en-US/dark/components/radio#Radio-Props,-RadioButton-Props
  withDefaults(
    defineProps<{
      /**
       * The checked state of the radio button.
       */
      checked?: boolean;

      /**
       * The default checked state of the radio button when uncontrolled.
       */
      defaultChecked?: boolean;

      /**
       * Whether the radio button is disabled.
       */
      disabled?: boolean;

      /**
       * The label for the radio button. If not set, default slot content is rendered.
       * If both are provided, the default slot content takes precedence.
       */
      label?: string;

      /**
       * The name attribute of the radio button. If not set, the name from the radio group will be used.
       */
      name?: string;

      /**
       * The size of the radio button. Options are 'small', 'medium', or 'large'.
       */
      size?: 'small' | 'medium' | 'large';

      /**
       * The value of the radio button when checked. This can be a string, number, or boolean.
       */
      value?: string | number | boolean;
    }>(),
    {
      checked: undefined,
      defaultChecked: false,
      disabled: false,
      label: undefined,
      name: undefined,
      size: 'medium',
      value: undefined,
    },
  );

  const emit = defineEmits<{
    (e: 'update:checked', value: boolean): void;
    (e: 'change', event: Event): void;
  }>();
</script>

<template>
  <NRadio
    class="c-radio"
    v-bind="$attrs"
    :checked="checked"
    :default-checked="defaultChecked"
    :disabled="disabled"
    :label="label"
    :name="name"
    :size="size"
    :value="value"
    @change="(event) => emit('change', event)"
    @update:checked="(value) => emit('update:checked', value)"
  >
    <slot></slot>
  </NRadio>
</template>
