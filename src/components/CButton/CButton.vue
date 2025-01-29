<script setup lang="ts">
  import { NButton } from 'naive-ui';
  import type { VNodeChild } from 'vue';
  import type { ButtonType } from '../../types/button';

  // https://www.naiveui.com/en-US/dark/components/button#Button-Props
  withDefaults(
    defineProps<{
      /**
       * The type attribute of the button's DOM.
       */
      attrType?: 'button' | 'submit' | 'reset';

      /**
       * Whether the button is displayed as block.
       */
      block?: boolean;

      /**
       * Whether the button shows the border.
       */
      bordered?: boolean;

      /**
       * Whether the button is round.
       */
      circle?: boolean;

      /**
       * Button color (support #FFF, #FFFFFF, yellow, rgb(0, 0, 0) formatted colors).
       */
      color?: string;

      /**
       * Whether the button's border is a dashed line.
       */
      dashed?: boolean;

      /**
       * Whether the button is disabled.
       */
      disabled?: boolean;

      /**
       * Whether the button is focusable.
       */
      focusable?: boolean;

      /**
       * Whether the button is ghost.
       */
      ghost?: boolean;

      /**
       * Whether to follow button's native focus behavior.
       * Since Safari's button can't be focused by click, Naive UI uses some tricks to make it focusable on Safari.
       * If you don't need the behavior or need the button to be draggable, you can enable the prop.
       * @default Browser is not Safari
       * @version 2.28.3
       */
      nativeFocusBehavior?: boolean;

      /**
       * The position of the icon in the button.
       */
      iconPlacement?: 'left' | 'right';

      /**
       * Whether it supports keyboard operation.
       */
      keyboard?: boolean;

      /**
       * Whether the button is quaternary button.
       */
      quaternary?: boolean;

      /**
       * Whether the button shows the loading status.
       */
      loading?: boolean;

      /**
       * Render function that renders button icon.
       * @version 2.34.0
       */
      renderIcon?: () => VNodeChild;

      /**
       * Whether the button shows rounded corners.
       */
      round?: boolean;

      /**
       * Whether the button is secondary button.
       */
      secondary?: boolean;

      /**
       * Button size.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * Whether to use strong text in the button.
       */
      strong?: boolean;

      /**
       * Whether the button is tertiary button.
       */
      tertiary?: boolean;

      /**
       * Whether to display as a text button.
       */
      text?: boolean;

      /**
       * Button text color (support #FFF, #FFFFFF, yellow, rgb(0, 0, 0) formatted colors).
       */
      textColor?: string;

      /**
       * Button type.
       */
      type?: ButtonType;

      /**
       * What tag the button should be rendered as.
       */
      tag?: keyof HTMLElementTagNameMap;
    }>(),
    {
      attrType: 'button',
      block: false,
      bordered: true,
      circle: false,
      color: undefined,
      dashed: false,
      disabled: false,
      focusable: true,
      ghost: false,
      nativeFocusBehavior: undefined,
      iconPlacement: 'left',
      keyboard: true,
      quaternary: false,
      loading: false,
      renderIcon: undefined,
      round: false,
      secondary: false,
      size: 'medium',
      strong: false,
      tertiary: false,
      text: false,
      textColor: undefined,
      type: 'default',
      tag: 'button',
    },
  );

  const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
  }>();
</script>

<template>
  <NButton
    class="c-button"
    :attr-type="attrType"
    :block="block"
    :bordered="bordered"
    :circle="circle"
    :color="color"
    :dashed="dashed"
    :disabled="disabled"
    :focusable="focusable"
    :ghost="ghost"
    :native-focus-behavior="nativeFocusBehavior"
    :icon-placement="iconPlacement"
    :keyboard="keyboard"
    :quaternary="quaternary"
    :loading="loading"
    :render-icon="renderIcon"
    :round="round"
    :secondary="secondary"
    :size="size"
    :strong="strong"
    :tertiary="tertiary"
    :text="text"
    :text-color="textColor"
    :type="type"
    :tag="tag"
    v-bind="$attrs"
    @click="(event) => emit('click', event)"
  >
    <slot></slot>

    <template #icon>
      <slot name="icon"></slot>
    </template>
  </NButton>
</template>
