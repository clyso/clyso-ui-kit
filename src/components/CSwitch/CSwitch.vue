<script setup lang="ts">
  import { NSwitch } from 'naive-ui';
  import { computed, ref, type StyleValue } from 'vue';

  // https://www.naiveui.com/en-US/dark/components/switch#Switch-Props
  const props = withDefaults(
    defineProps<{
      /**
       * State of the switch.
       */
      value: boolean;
      /**
       * Size of the gap between label and switch. It can be specified either as number or as a pixel value.
       */
      gap?: string | number;
      /**
       * Position of the label.
       */
      labelPlacement?: 'start' | 'end';
      /**
       * Alignment of the switch element.
       */
      align?: 'center' | 'start';
      /**
       * Whether the switch is disabled.
       */
      isDisabled?: boolean;
      /**
       * The size of the switch.
       */
      size?: 'small' | 'medium' | 'large';
      /**
       * Whether the switch is in a loading state.
       */
      loading?: boolean;
      /**
       * Whether the switch has rounded corners.
       */
      round?: boolean;
    }>(),
    {
      gap: 12,
      labelPlacement: 'start',
      align: 'center',
      isDisabled: false,
      size: 'medium',
      loading: false,
      round: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Callback when the component's value changes.
     */
    (e: 'update:value', value: boolean): void;
    /**
     * Emitted when the switch receives focus.
     */
    (e: 'focus'): void;
    /**
     * Emitted when the switch loses focus.
     */
    (e: 'blur'): void;
  }>();

  function convertToStyleValue(value: string | number) {
    return typeof value === 'number' ? `${value}px` : value;
  }

  const switcher = ref<HTMLInputElement | null>(null);

  defineExpose({
    focus: () => switcher.value?.focus(),
    blur: () => switcher.value?.blur(),
  });

  const switcherStyles = computed<StyleValue>(() => ({
    gap: convertToStyleValue(props.gap),
    flexDirection: props.labelPlacement === 'start' ? 'row' : 'row-reverse',
    alignItems: props.align === 'center' ? 'center' : 'flex-start',
  }));

  function toggle() {
    if (props.isDisabled) {
      return;
    }

    emit('update:value', !props.value);
  }

  const isFocused = ref(false);

  function handleFocus() {
    if (props.isDisabled || isFocused.value) {
      return;
    }

    isFocused.value = true;
    emit('focus');
  }

  function handleBlur(event: FocusEvent) {
    if (
      props.isDisabled ||
      (event.relatedTarget &&
        switcher.value?.contains(event.relatedTarget as Node))
    ) {
      return;
    }

    isFocused.value = false;
    emit('blur');
  }

  type SwitchSlots = {
    /**
     * Content for the label.
     */
    default?(): unknown;
    /**
     * Content when the switch is checked.
     */
    checked(): unknown;
    /**
     * Icon of switch button when checked.
     */
    'checked-icon'(): unknown;
    /**
     * Icon of switch button.
     */
    icon(): unknown;
    /**
     * Content when the switch is unchecked.
     */
    unchecked(): unknown;
    /**
     * Icon of switch button when unchecked.
     */
    'unchecked-icon'(): unknown;
  };

  defineSlots<SwitchSlots>();
</script>

<template>
  <div
    ref="switcher"
    class="c-switch"
    :tabindex="isDisabled ? -1 : 0"
    :style="switcherStyles"
    @focus.capture="handleFocus"
    @blur.capture="handleBlur"
    @keydown.enter="toggle"
    @click="toggle"
  >
    <div
      v-if="$slots.default"
      class="c-switch__label"
    >
      <slot></slot>
    </div>

    <NSwitch
      class="c-switch__control"
      v-bind="$attrs"
      :value="value"
      :disabled="isDisabled"
      :round="round"
      :size="size"
      :loading="loading"
      tabindex="-1"
    >
      <template #checked>
        <slot name="checked"></slot>
      </template>
      <template #checked-icon>
        <slot name="checked-icon"></slot>
      </template>
      <template #icon>
        <slot name="icon"></slot>
      </template>
      <template #unchecked>
        <slot name="unchecked"></slot>
      </template>
      <template #unchecked-icon>
        <slot name="unchecked-icon"></slot>
      </template>
    </NSwitch>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-switch {
    display: inline-flex;
    justify-content: flex-start;
    align-items: flex-start;

    &:focus-visible {
      ::v-deep(.c-switch__rail) {
        outline: 2px solid var(--primary-color);
      }
    }
  }
</style>
