<script setup lang="ts">
  import {
    computed,
    onBeforeMount,
    onUnmounted,
    provide,
    readonly,
    ref,
    type StyleValue,
  } from 'vue';
  import type { DashboardNavMeta } from '../../types/dashboard';
  import {
    DASHBOARD_NAV_META_INJECT_KEY,
    DASHBOARD_SIDEBAR_MINIMIZED_WIDTH,
    DASHBOARD_SIDEBAR_MOBILE_WIDTH,
    DASHBOARD_SIDEBAR_WIDTH,
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    getDefaultNavMeta,
  } from '../../constants/dashboard';
  import { VIEWPORT_DESKTOP } from '../../constants/viewport';

  const props = withDefaults(
    defineProps<{
      /**
       * Determines whether the dashboard layout includes a side menu.
       */
      hasSideMenu?: boolean;
    }>(),
    {
      hasSideMenu: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the navigation metadata (`navMeta`) is updated.
     */
    (e: 'update:navMeta', value: DashboardNavMeta): void;
  }>();

  const navMeta = ref(getDefaultNavMeta());

  function updateNavMeta(partialMeta: Partial<DashboardNavMeta>) {
    const newValue = { ...navMeta.value, ...partialMeta };
    const isMobile = newValue.viewportWidth < VIEWPORT_DESKTOP;

    navMeta.value = { ...newValue, isMobile };
    emit('update:navMeta', navMeta.value);
  }

  function updateViewportWidth() {
    navMeta.value.viewportWidth = window.innerWidth;
  }

  function updateScrollTop() {
    navMeta.value.scrollTop = window.scrollY;
  }

  onBeforeMount(() => {
    window.addEventListener('resize', updateViewportWidth);
    // TODO: throttle
    window.addEventListener('scroll', updateScrollTop);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', updateViewportWidth);
    window.removeEventListener('scroll', updateScrollTop);
  });

  provide(DASHBOARD_NAV_META_INJECT_KEY, readonly(navMeta));
  provide(DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY, updateNavMeta);

  const innerStyles = computed<StyleValue>(() => {
    if (!navMeta.value.isMobile) {
      return {};
    }

    return {
      transform: `translateX(${
        navMeta.value.isSideMenuOpen ? DASHBOARD_SIDEBAR_MOBILE_WIDTH : 0
      }px)`,
    };
  });

  const contentStyles = computed<StyleValue>(() => {
    if (navMeta.value.isMobile || !props.hasSideMenu) {
      return {};
    }

    return {
      paddingLeft: `${
        navMeta.value.isSideMenuMinimized
          ? DASHBOARD_SIDEBAR_MINIMIZED_WIDTH
          : DASHBOARD_SIDEBAR_WIDTH
      }px`,
    };
  });
</script>

<template>
  <div class="c-dashboard-layout">
    <slot
      v-if="hasSideMenu"
      name="sidebar"
    >
      Sidebar is required
    </slot>

    <div
      :style="innerStyles"
      class="c-dashboard-layout__inner"
    >
      <slot name="header"> Header is required </slot>

      <div
        :style="contentStyles"
        class="c-dashboard-layout__content"
      >
        <div class="c-dashboard-layout__content-inner">
          <!-- Place CDashboardPage's here  -->
          <slot> Content is required </slot>

          <div
            v-if="$slots.footer"
            class="c-dashboard-layout__footer"
          >
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-dashboard-layout {
    &__inner {
      position: relative;
      transition: transform utils.$transition-duration;
      display: grid;
      grid-template-rows: auto 1fr;
      min-height: 100vh;
    }

    &__content {
      transition: padding utils.$transition-duration;
    }

    &__content-inner {
      height: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
    }

    &__footer {
      padding: 0 utils.unit(8) 0 utils.unit(2);

      @include utils.tablet-only {
        padding: 0 utils.unit(6);
      }

      @include utils.mobile {
        padding: 0 utils.unit(3);
      }
    }
  }
</style>
