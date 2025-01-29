<script setup lang="ts">
  withDefaults(
    defineProps<{
      hasSideMenu?: boolean;
    }>(),
    {
      hasSideMenu: true,
    },
  );
</script>

<template>
  <article
    class="c-dashboard-page"
    :class="{ 'c-dashboard-page--no-side-menu': !hasSideMenu }"
  >
    <div
      v-if="$slots.breadcrumbs"
      class="c-dashboard-page__breadcrumbs"
    >
      <slot name="breadcrumbs"></slot>
    </div>

    <h1
      v-if="$slots.title"
      class="c-dashboard-page__title"
    >
      <slot name="title"></slot>
    </h1>

    <div class="c-dashboard-page__content">
      <slot></slot>
    </div>
  </article>
</template>

<style scoped lang="scss">
  @use '../../styles/utils' as utils;

  .c-dashboard-page {
    height: 100%;
    padding: 0 utils.unit(8) utils.unit(15) utils.unit(2);

    &--no-side-menu {
      padding: 0 utils.unit(8) utils.unit(15);
    }

    @include utils.tablet-only {
      padding: utils.unit(2) utils.unit(6) utils.unit(15) utils.unit(6);
    }

    @include utils.mobile {
      padding: utils.unit(2) utils.unit(3) utils.unit(10) utils.unit(3);
    }

    &__breadcrumbs {
      margin-bottom: utils.unit(4);
    }

    &__title {
      @include utils.apply-styles(utils.$text-h1);
      margin-bottom: utils.unit(4);
      padding-top: utils.unit(1);

      @include utils.tablet-only {
        @include utils.apply-styles(utils.$text-h2);
        padding-top: 0;
      }

      @include utils.mobile {
        @include utils.apply-styles(utils.$text-h3);
        padding-top: 0;
      }
    }
  }
</style>
