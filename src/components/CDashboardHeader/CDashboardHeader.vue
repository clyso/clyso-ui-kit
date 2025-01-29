<script setup lang="ts">
  import type { DropdownOption } from 'naive-ui/es/dropdown/src/interface';
  import { computed, inject, onMounted, readonly, ref, watch } from 'vue';
  import { NMenu } from 'naive-ui';
  import CDropdown from '../CDropdown/CDropdown.vue';
  import CAvatar from '../CAvatar/CAvatar.vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';
  import { vOuterClick } from '../../directives/outerClick';
  import {
    DASHBOARD_NAV_META_INJECT_KEY,
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    getDefaultNavMeta,
  } from '../../constants/dashboard';
  import DashboardSidebarToggle from '../CDashboardSidebar/DashboardSidebarToggle.vue';

  withDefaults(
    defineProps<{
      /**
       * Array of dropdown options to be displayed in the menu.
       */
      options: DropdownOption[];

      /**
       * The name of the user to be displayed in the user menu.
       * Defaults to an empty string.
       */
      userName?: string;

      /**
       * The email of the user to be displayed in the user menu.
       * Defaults to an empty string.
       */
      userEmail?: string;

      /**
       * Determines whether the side menu is visible.
       * Defaults to `true`.
       */
      hasSideMenu?: boolean;

      /**
       * Determines whether the user menu is visible.
       * Defaults to `true`.
       */
      hasUserMenu?: boolean;
    }>(),
    {
      userName: '',
      userEmail: '',
      hasSideMenu: true,
      hasUserMenu: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when a dropdown option is selected.
     */
    (e: 'select:option', value: string): void;
  }>();

  const navMeta = inject(
    DASHBOARD_NAV_META_INJECT_KEY,
    readonly(ref(getDefaultNavMeta())),
  );
  const updateNavMeta = inject(
    DASHBOARD_UPDATE_NAV_META_FN_INJECT_KEY,
    (value) => value,
  );

  const headerContent = ref<HTMLElement | null>(null);

  function updateHeaderHeight() {
    updateNavMeta({ headerHeight: headerContent.value?.offsetHeight ?? 0 });
  }

  onMounted(() => {
    updateHeaderHeight();
  });

  watch(
    () => navMeta.value.viewportWidth,
    () => updateHeaderHeight(),
  );

  watch(
    () => navMeta.value.isSideMenuOpen,
    () => {
      if (!navMeta.value.isSideMenuOpen) {
        return;
      }

      updateIsTopMenuOpen(false);
    },
  );

  const isTopMenuOpen = computed(
    () => navMeta.value.isMobile && navMeta.value.isTopMenuOpen,
  );

  function updateIsTopMenuOpen(value: boolean) {
    updateNavMeta({ isTopMenuOpen: value });
  }

  function handleOptionSelect(key: string) {
    if (isTopMenuOpen.value) {
      updateIsTopMenuOpen(false);
    }

    emit('select:option', key);
  }
</script>

<template>
  <header
    class="c-dashboard-header"
    :class="{ 'c-dashboard-header--top-menu-open': isTopMenuOpen }"
  >
    <div
      ref="headerContent"
      class="c-dashboard-header__content"
    >
      <div class="c-dashboard-header__start">
        <div
          v-if="hasSideMenu"
          class="c-dashboard-header__nav-toggle"
        >
          <DashboardSidebarToggle />
        </div>

        <slot name="start"></slot>
      </div>

      <div
        v-if="!navMeta.isMobile"
        class="c-dashboard-header__end"
      >
        <slot name="end"></slot>

        <CDropdown
          v-if="hasUserMenu"
          trigger="click"
          :options="options"
          :show-arrow="true"
          @select="handleOptionSelect"
        >
          <CAvatar
            class="c-dashboard-header__avatar"
            round
            :name="userName || userEmail"
          />
        </CDropdown>
      </div>
      <!-- Stop Propagation for click is required to avoid onOuterClick event to be triggered -->
      <CButton
        v-else
        class="c-dashboard-header__top-menu-toggle"
        ghost
        :bordered="false"
        circle
        @click.stop="updateIsTopMenuOpen(!isTopMenuOpen)"
      >
        <template #icon>
          <CIcon
            :is-inline="true"
            name="ellipsis-vertical"
          />
        </template>
      </CButton>
    </div>

    <CCollapseTransition :show="isTopMenuOpen">
      <div
        v-if="isTopMenuOpen"
        v-outer-click="() => updateIsTopMenuOpen(false)"
        class="header-menu"
      >
        <div
          v-if="userName || userEmail"
          class="header-menu__user-menu header-menu__block"
        >
          <CAvatar
            class="header-menu__user-menu-avatar"
            round
            :name="userName || userEmail"
          />
          <span class="header-menu__user-name">{{ userName }}</span>
          <span class="header-menu__user-email">{{ userEmail }}</span>
        </div>
        <div class="header-menu__end-menu header-menu__block">
          <slot name="end"></slot>
        </div>
        <NMenu
          v-if="isTopMenuOpen && hasUserMenu"
          class="header-menu__options-menu"
          :options="options"
          @update:value="handleOptionSelect"
        />
      </div>
    </CCollapseTransition>
  </header>
  <div
    class="c-dashboard-header-filler"
    :style="{ height: navMeta.headerHeight + 'px' }"
  ></div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-dashboard-header {
    transition:
      background-color utils.$transition-duration,
      box-shadow utils.$transition-duration;
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;

    &--top-menu-open {
      background-color: var(--menu-color);
      box-shadow: 0 4px 20px var(--menu-shadow);
    }

    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: utils.unit(6) utils.unit(8);
      gap: utils.unit(6);

      @include utils.tablet-only {
        padding: utils.unit(6);
      }

      @include utils.mobile {
        padding: utils.unit(3);
      }
    }

    &__start {
      display: flex;
      align-items: center;
    }

    &__end {
      display: flex;
      align-items: center;
      gap: utils.unit(2);
    }

    &__desktop {
      @include utils.touch {
        display: none;
      }
    }

    &__avatar {
      cursor: pointer;
    }

    &__nav-toggle {
      margin-right: utils.unit(5);

      @include utils.mobile {
        margin-right: utils.unit(4);
      }
    }
  }

  .header-menu {
    border-bottom: 1px solid var(--menu-alt-color);

    &__block {
      padding: utils.unit(3) utils.unit(4);

      @include utils.touch {
        padding: utils.unit(3) utils.unit(6);
      }
    }

    &__end-menu {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: min-content;
      gap: utils.unit(2);
    }

    &__user-menu {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
      grid-column-gap: utils.unit(3);
      align-items: center;
    }

    &__user-menu-avatar {
      grid-row: 1 / -1;
    }

    &__user-name {
      @include utils.apply-styles(utils.$text-small);
    }

    &__user-email {
      @include utils.apply-styles(utils.$text-tiny);
      color: var(--text-color-1);
    }
  }
</style>
