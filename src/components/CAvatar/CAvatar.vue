<script setup lang="ts">
  import { NAvatar } from 'naive-ui';
  import { computed, type ImgHTMLAttributes, type VNodeChild } from 'vue';
  import CIcon from '../CIcon/CIcon.vue';

  // https://www.naiveui.com/en-US/dark/components/avatar#Avatar-Slots

  const props = withDefaults(
    defineProps<{
      /**
       * The name for the Initials
       */
      name?: string;

      /**
       * Whether to display an avatar with a border.
       */
      bordered?: boolean;

      /**
       * The background color of the avatar.
       */
      color?: string;

      /**
       * Image URL to show when the avatar fails to load.
       */
      fallbackSrc?: string;

      /**
       * The props of the img element inside the component.
       */
      imgProps?: ImgHTMLAttributes;

      /**
       * Intersection observer's config to be applied when lazy=true.
       */
      intersectionObserverOptions?: {
        root?: Element | Document | string | null;
        rootMargin?: string;
        threshold?: number | number[];
      };

      /**
       * Load image after it enters viewport.
       * When used alone, it will be assigned the property value of HTMLImageElement.loading.
       * Alternatively, it can be used in conjunction with the intersection-observer-options configuration to achieve lazy loading.
       */
      lazy?: boolean;

      /**
       * Object-fit type of the image in the container.
       */
      objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

      /**
       * Render function of fallback content.
       */
      renderFallback?: () => VNodeChild;

      /**
       * Render function of placeholder.
       */
      renderPlaceholder?: () => VNodeChild;

      /**
       * Whether to display a rounded avatar.
       */
      round?: boolean;

      /**
       * Avatar's size.
       */
      size?: 'small' | 'medium' | 'large' | number;

      /**
       * Avatar's image source.
       */
      src?: string;
    }>(),
    {
      name: '',
      bordered: false,
      color: undefined,
      fallbackSrc: undefined,
      imgProps: undefined,
      intersectionObserverOptions: undefined,
      lazy: false,
      objectFit: 'cover',
      renderFallback: undefined,
      renderPlaceholder: undefined,
      round: false,
      size: 'medium',
      src: undefined,
    },
  );

  const emit = defineEmits<{
    (e: 'error', value: Event): void;
  }>();

  const initials = computed<string>(() =>
    props.name
      .trim()
      .split(' ')
      .map((nameItem) => nameItem[0].toUpperCase())
      .join(''),
  );
</script>

<template>
  <NAvatar
    class="c-avatar"
    :class="`c-avatar--${props.size}`"
    :name="name"
    :bordered="bordered"
    :color="color"
    :fallback-src="fallbackSrc"
    :img-props="imgProps"
    :intersection-observer-options="intersectionObserverOptions"
    :lazy="lazy"
    :object-fit="objectFit"
    :render-fallback="renderFallback"
    :render-placeholder="renderPlaceholder"
    :round="round"
    :size="size"
    :src="src"
    @focus="(event) => emit('error', event)"
  >
    <slot>
      <template v-if="!src && name">
        {{ initials }}
      </template>
      <CIcon
        v-else-if="!src"
        class="c-avatar__icon"
        name="person"
        :is-inline="true"
      />
    </slot>
  </NAvatar>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-avatar {
    flex-shrink: 0;
    @include utils.apply-styles(utils.$text-large);

    &--small {
      @include utils.apply-styles(utils.$text-small);
    }

    &--medium {
      @include utils.apply-styles(utils.$text);
    }

    &__icon {
      width: 18px;
      height: 18px;
    }
  }
</style>
