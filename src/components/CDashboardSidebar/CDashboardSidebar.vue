<script setup lang="ts">
  import { computed, inject, readonly, ref, type StyleValue, watch } from 'vue';
  import {
    DASHBOARD_NAV_META_INJECT_KEY,
    DASHBOARD_SIDEBAR_MINIMIZED_WIDTH,
    DASHBOARD_SIDEBAR_MOBILE_WIDTH,
    DASHBOARD_SIDEBAR_WIDTH,
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    getDefaultNavMeta,
  } from '../../constants/dashboard';
  import DashboardSidebarToggle from './DashboardSidebarToggle.vue';
  import { vOuterClick } from '../../directives/outerClick';

  const navMeta = inject(
    DASHBOARD_NAV_META_INJECT_KEY,
    readonly(ref(getDefaultNavMeta())),
  );
  const updateNavMeta = inject(
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    (value) => value,
  );

  function onHover() {
    if (navMeta.value.isMobile) {
      return;
    }

    updateNavMeta({ isSideMenuHovered: true });
  }

  function onLeave() {
    updateNavMeta({ isSideMenuHovered: false });
  }

  const sidebarStyles = computed<StyleValue>(() => {
    if (navMeta.value.isMobile) {
      return {
        width: `${DASHBOARD_SIDEBAR_MOBILE_WIDTH}px`,
        transform: navMeta.value.isSideMenuOpen
          ? 'translateX(0)'
          : `translateX(-${DASHBOARD_SIDEBAR_MOBILE_WIDTH}px)`,
      };
    }

    return {
      top: `${navMeta.value.headerHeight}px`,
      height: `calc(100vh - ${navMeta.value.headerHeight}px)`,
      width: `${
        navMeta.value.isSideMenuMinimized && !navMeta.value.isSideMenuHovered
          ? DASHBOARD_SIDEBAR_MINIMIZED_WIDTH
          : DASHBOARD_SIDEBAR_WIDTH
      }px`,
    };
  });

  function closeSideMenu() {
    if (!navMeta.value.isMobile || !navMeta.value.isSideMenuOpen) {
      return;
    }

    updateNavMeta({ isSideMenuOpen: false });
  }

  watch(
    () => navMeta.value.isTopMenuOpen,
    () => {
      if (!navMeta.value.isTopMenuOpen) {
        return;
      }

      closeSideMenu();
    },
  );

  const isToggleShown = computed(
    () =>
      !navMeta.value.isMobile &&
      navMeta.value.scrollTop > navMeta.value.headerHeight,
  );
</script>

<template>
  <aside
    v-outer-click="closeSideMenu"
    :style="sidebarStyles"
    class="c-dashboard-sidebar"
  >
    <span class="c-dashboard-sidebar__menu-arrow"></span>
    <Transition name="opacity">
      <DashboardSidebarToggle v-if="isToggleShown" />
    </Transition>

    <div
      class="c-dashboard-sidebar__menu"
      @mouseenter="onHover"
      @focusin="onHover"
      @mouseleave="onLeave"
      @focusout="onLeave"
    >
      <div class="c-dashboard-sidebar__menu-content">
        <slot></slot>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  $z-menu-index: 10;

  .c-dashboard-sidebar {
    padding: 0 utils.unit(4) utils.unit(4);
    height: 100vh;
    position: fixed;
    left: 0;
    transition: utils.$transition-duration;
    display: grid;
    z-index: $z-menu-index;

    @include utils.touch {
      padding: 0;
    }

    &__menu-arrow {
      width: 12px;
      height: 12px;
      background-color: var(--menu-color);
      top: 82px;
      left: 46px;
      position: fixed;
      transform-origin: center center;
      transform: rotate(45deg);
      border-top: 1px solid var(--menu-alt-color);
      border-left: 1px solid var(--menu-alt-color);
      z-index: $z-menu-index;

      @include utils.touch {
        display: none;
      }
    }

    :deep(.dashboard-sidebar-toggle) {
      position: fixed;
      top: 24px;
      left: 32px;
    }

    &__menu {
      background-color: var(--menu-color);
      border-radius: utils.$border-radius;
      position: relative;
      border: 1px solid var(--menu-alt-color);
      overflow-x: hidden;
      overflow-y: auto;
      overscroll-behavior: contain;

      @include utils.touch {
        border-radius: 0;
        border: 0;
        border-right: 1px solid var(--menu-alt-color);
      }
    }

    &__menu-content {
      z-index: $z-menu-index;
      position: relative;
    }
  }
</style>
