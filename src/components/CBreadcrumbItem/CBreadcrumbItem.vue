<script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';
  import CSkeleton from '../CSkeleton/CSkeleton.vue';

  withDefaults(
    defineProps<{
      /**
       * The target route to navigate to within app. If `to` is specified, `href` will be ignored.
       */
      to?: RouteLocationRaw;
      /**
       * The URL to navigate to when clicked. Ignored if `to` is specified.
       */
      href?: string;
      /**
       * Specifies where to display the linked URL. Only applicable if `href` or 'to' is specified.
       */
      target?: '_blank' | '_self';
      /**
       * Indicates if the current breadcrumb route is active and disables interaction.
       */
      isActive?: boolean;
      /**
       * Indicates whether the breadcrumb is in a loading state.
       */
      isLoading?: boolean;
      /**
       * Specifies the width of the loading indicator. Can be a number (pixels) or a string (e.g., '50%').
       */
      loadingWidth?: number | string;
    }>(),
    {
      to: undefined,
      href: undefined,
      target: '_self',
      isActive: false,
      isLoading: false,
      loadingWidth: 120,
    },
  );

  const emit = defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<template>
  <li class="c-breadcrumb-item">
    <Transition
      name="opacity"
      mode="out-in"
    >
      <CSkeleton
        v-if="isLoading"
        key="loading"
        :width="loadingWidth"
        :height="9"
        :border-radius="9"
        :padding-block="8"
        class="c-breadcrumb-item__trigger c-breadcrumb-item__trigger--loading"
      />

      <span
        v-else-if="isActive"
        key="active"
        class="c-breadcrumb-item__trigger c-breadcrumb-item__trigger--active"
      >
        <slot></slot>
      </span>

      <RouterLink
        v-else-if="to"
        key="router-link"
        :to="to"
        :target="target"
        class="c-breadcrumb-item__trigger c-breadcrumb-item__trigger--ancestor"
        @click="emit('click')"
      >
        <slot></slot>
      </RouterLink>

      <a
        v-else-if="href"
        key="link"
        :href="href"
        rel="noopener"
        :target="target"
        class="c-breadcrumb-item__trigger c-breadcrumb-item__trigger--ancestor"
        @click="emit('click')"
      >
        <slot></slot>
      </a>

      <button
        v-else
        type="button"
        class="c-breadcrumb-item__trigger c-breadcrumb-item__trigger--ancestor"
        @click="emit('click')"
      >
        <slot></slot>
      </button>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-breadcrumb-item {
    display: inline-flex;
    align-items: baseline;
    margin-right: utils.unit(2);

    &:last-child {
      margin-right: 0;

      &::after {
        content: none;
      }
    }

    &::after {
      content: '/';
      margin-left: utils.unit(2);
      color: var(--text-color-3);
    }

    &__trigger {
      @include utils.button-no-styles;
      padding: utils.unit(1);
      color: var(--text-color-3);
      border-radius: utils.$border-radius;
      transition: utils.$transition-duration;
      line-height: 1.25;

      &--ancestor {
        &:hover {
          background-color: var(--button-color-2-hover);
          color: var(--text-color-2);
        }

        &:active {
          background-color: var(--button-color-2-pressed);
          color: var(--text-color-2);
        }
      }

      &--active {
        color: var(--text-color-1);
        cursor: default;
      }

      &--loading {
        cursor: default;
      }
    }
  }
</style>
