<script setup lang="ts">
  import { computed, inject, readonly, ref } from 'vue';
  import { useLink } from 'vue-router';
  import MenuItem from './DashboardMenuItem.vue';
  import type {
    BooleanOrBooleanFn,
    DashboardExpandEventMeta,
    DashboardMenuGroup,
    DashboardMenuItem,
    DashboardMenuLinkItem,
    DashboardMenuSublistItem,
  } from '../../types/dashboard';
  import { DashboardMenuItemType } from '../../types/dashboard';
  import {
    DASHBOARD_NAV_META_INJECT_KEY,
    getDefaultNavMeta,
  } from '../../constants/dashboard';

  const props = defineProps<{
    /**
     * Array of menu groups to be displayed in the dashboard menu.
     * Each group contains a list of menu items.
     */
    items: DashboardMenuGroup[];
  }>();

  const emit = defineEmits<{
    /**
     * Emitted when a menu group is expanded.
     */
    (e: 'expand', meta: DashboardExpandEventMeta): void;

    /**
     * Emitted when a menu item is selected. `key` is the unique key of the selected menu item.
     */
    (e: 'select', key: string): void;
  }>();

  const navMeta = inject(
    DASHBOARD_NAV_META_INJECT_KEY,
    readonly(ref(getDefaultNavMeta())),
  );
  const isMenuCollapsed = computed(
    () =>
      !navMeta.value.isMobile &&
      navMeta.value.isSideMenuMinimized &&
      !navMeta.value.isSideMenuHovered,
  );

  // TODO: refactor
  const activeKeys = computed(() => {
    const { items: groups } = props;
    const activeKeysRes: string[] = [];

    const isActiveLink = (
      menuItem: DashboardMenuSublistItem | DashboardMenuLinkItem,
    ): boolean => {
      if (menuItem.isActive === undefined) {
        const { isActive } = useLink({ to: menuItem.to });

        return isActive.value;
      }

      return typeof menuItem.isActive === 'function'
        ? menuItem.isActive()
        : Boolean(menuItem.isActive);
    };

    const matchedGroup = groups.find((group) => {
      const matchedItem = group.children.find((item) => {
        if (item.type === DashboardMenuItemType.BUTTON) {
          const matchedSubitem = item.children.find((subItem) =>
            isActiveLink(subItem),
          );

          if (!matchedSubitem) {
            return false;
          }

          activeKeysRes.push(matchedSubitem.key);

          return true;
        }

        return isActiveLink(item);
      });

      if (!matchedItem) {
        return false;
      }

      activeKeysRes.push(matchedItem.key);

      return true;
    });

    if (!matchedGroup) {
      return [];
    }

    activeKeysRes.push(matchedGroup.key);

    return activeKeysRes;
  });

  function isGroupActive(key: string): boolean {
    return activeKeys.value.includes(key);
  }

  function getHidden(item: { isHidden?: BooleanOrBooleanFn }) {
    return typeof item.isHidden === 'function'
      ? item.isHidden()
      : Boolean(item.isHidden);
  }

  function isGroupHidden(group: DashboardMenuGroup): boolean {
    return (
      getHidden(group) ||
      group.children.every((childItem) => isItemHidden(childItem))
    );
  }

  function isItemHidden(item: DashboardMenuItem): boolean {
    const isHidden = getHidden(item);

    if (!('children' in item)) {
      return isHidden;
    }

    return getHidden(item) || item.children.every((child) => getHidden(child));
  }
</script>

<template>
  <nav class="c-dashboard-menu">
    <template
      v-for="(group, idx) in items"
      :key="idx"
    >
      <div
        v-if="!isGroupHidden(group)"
        class="menu-group"
        :class="{ 'menu-group--active': isGroupActive(group.key) }"
      >
        <span
          v-if="group.title"
          :class="{ 'menu-group__title--menu-collapsed': isMenuCollapsed }"
          class="menu-group__title"
          >{{ group.title }}</span
        >
        <ul class="menu-group__list menu-list">
          <template
            v-for="item in group.children"
            :key="item.key"
          >
            <MenuItem
              v-if="!isItemHidden(item)"
              :is-menu-collapsed="isMenuCollapsed"
              :item="item"
              :active-keys="activeKeys"
              @expand="emit('expand', $event)"
              @select="emit('select', $event)"
            />
          </template>
        </ul>
      </div>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-dashboard-menu {
    display: flex;
    flex-direction: column;
    padding: utils.unit(3) utils.unit(2);
    color: var(--side-menu-font-color);

    @include utils.touch {
      padding: utils.unit(6) utils.unit(2);
    }
  }

  .menu-group {
    padding: utils.unit(3) 0;

    &--active {
      .menu-group__title {
        color: var(--primary-color);
      }
    }

    &__title {
      padding-left: utils.unit(5);
      margin-bottom: utils.unit(2);
      display: block;
      text-transform: uppercase;
      @include utils.apply-styles(utils.$text-caption);
      position: relative;
      overflow: hidden;
      transition: color utils.$transition-duration;
      white-space: nowrap;

      &::before {
        content: '';
        @include utils.absolute-fit;
        background-image: linear-gradient(
          to left,
          var(--menu-color) 30%,
          transparent
        );
        opacity: 0;
        transition: opacity utils.$transition-duration;
      }

      &--menu-collapsed::before {
        opacity: 1;
      }
    }
  }
</style>
