<script setup lang="ts">
  import { computed, inject, readonly, ref } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import {
    DASHBOARD_NAV_META_INJECT_KEY,
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    getDefaultNavMeta,
    LOCAL_STORAGE_SIDEBAR_MINIMIZED_KEY,
  } from '../../constants/dashboard';

  const navMeta = inject(
    DASHBOARD_NAV_META_INJECT_KEY,
    readonly(ref(getDefaultNavMeta())),
  );
  const updateNavMeta = inject(
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    (value) => value,
  );

  const isSideMenuMinimized = computed({
    get() {
      return navMeta.value.isSideMenuMinimized;
    },
    set(value: boolean) {
      localStorage.setItem(
        LOCAL_STORAGE_SIDEBAR_MINIMIZED_KEY,
        JSON.stringify(value),
      );
      updateNavMeta({ isSideMenuMinimized: value });
    },
  });

  const isSideMenuOpen = computed({
    get() {
      return navMeta.value.isSideMenuOpen;
    },
    set(value: boolean) {
      updateNavMeta({ isSideMenuOpen: value });
    },
  });
</script>

<template>
  <!-- Stop Propagation for click is required to avoid onOuterClick event to be triggered -->
  <CButton
    v-if="navMeta.isMobile"
    class="dashboard-sidebar-toggle dashboard-sidebar-toggle--toggler"
    size="large"
    :quaternary="!isSideMenuOpen"
    :secondary="isSideMenuOpen"
    circle
    @click.stop="isSideMenuOpen = !isSideMenuOpen"
  >
    <CIcon
      v-if="isSideMenuOpen"
      :is-inline="true"
      name="close"
    />
    <CIcon
      v-else
      :is-inline="true"
      name="menu"
    />
  </CButton>
  <CButton
    v-else
    class="dashboard-sidebar-toggle dashboard-sidebar-toggle--minimizer"
    size="large"
    quaternary
    circle
    @click="isSideMenuMinimized = !isSideMenuMinimized"
  >
    <CIcon
      v-if="isSideMenuMinimized"
      :is-inline="true"
      name="list"
    />
    <CIcon
      v-else
      :is-inline="true"
      name="filter"
    />
  </CButton>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .dashboard-sidebar-toggle {
    :deep(.c-icon) {
      width: 24px;
      height: 24px;
    }
  }
</style>
