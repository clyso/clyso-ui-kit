<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { RouteLocationRaw } from 'vue-router';
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import type {
    DashboardExpandEventMeta,
    DashboardMenuItem,
    DashboardMenuParentItem,
    DashboardMenuSublistItem,
    BooleanOrBooleanFn,
  } from '../../types/dashboard';

  const props = withDefaults(
    defineProps<{
      item: DashboardMenuItem;
      isMenuCollapsed?: boolean;
      activeKeys: string[];
      isSublist?: boolean;
    }>(),
    {
      isMenuCollapsed: false,
      isSublist: false,
    },
  );
  const emit = defineEmits<{
    (e: 'expand', value: DashboardExpandEventMeta): void;
    (e: 'select', key: string): void;
    (e: 'activate', value: boolean): void;
  }>();

  const isParentItem = (
    item: DashboardMenuItem,
  ): item is DashboardMenuParentItem => 'children' in item;
  const isSublistItem = (
    item: DashboardMenuItem,
  ): item is DashboardMenuSublistItem => props.isSublist;

  const isParent = computed(() => isParentItem(props.item));
  // TODO: make button menu items that are not parent
  const isButton = isParent;
  const children = computed(() =>
    isParentItem(props.item) ? props.item.children : [],
  );

  const toLocation = computed<RouteLocationRaw | null>(() =>
    isParentItem(props.item) ? null : props.item.to,
  );

  const isActive = computed(() => props.activeKeys.includes(props.item.key));
  const isExactActive = computed(() => isActive.value && !isParent.value);

  const isExpanded = ref(isActive.value && isParent.value);

  function handleClick() {
    if (isParent.value) {
      isExpanded.value = !isExpanded.value;
      emit('expand', { key: props.item.key, value: isExpanded.value });

      return;
    }

    emit('select', props.item.key);
  }

  const attrs = computed(() =>
    isButton.value
      ? {
          type: 'button',
        }
      : {
          to: toLocation.value,
        },
  );

  function getHidden(item: { isHidden?: BooleanOrBooleanFn }) {
    return typeof item.isHidden === 'function'
      ? item.isHidden()
      : Boolean(item.isHidden);
  }
</script>

<template>
  <li class="dashboard-menu-item">
    <component
      :is="isButton ? 'button' : 'RouterLink'"
      class="menu-item"
      :class="[
        isButton ? 'menu-item--button' : 'menu-item--link',
        {
          'menu-item--sublist': isSublist,
          'menu-item--collapsed': isMenuCollapsed,
          'menu-item--active': isActive,
          'menu-item--exact-active': isExactActive,
        },
      ]"
      v-bind="attrs"
      @click="handleClick"
    >
      <CIcon
        v-if="!isSublistItem(item)"
        class="menu-item__icon"
        :name="item.iconName"
        :is-inline="true"
      />

      <div class="menu-item__content">
        <span class="menu-item__label">{{ item.title }}</span>

        <CIcon
          v-if="isParent"
          class="menu-item__arrow"
          :class="{ 'menu-item__arrow--expanded': isExpanded }"
          name="chevron-down"
          :is-inline="true"
        />
      </div>
    </component>

    <CCollapseTransition :show="isExpanded && isParent">
      <ul
        v-if="isExpanded && isParent"
        class="dashboard-menu-item__sublist"
      >
        <template
          v-for="subItem in children"
          :key="subItem.key"
        >
          <DashboardMenuItem
            v-if="!getHidden(subItem)"
            :is-menu-collapsed="isMenuCollapsed"
            :is-sublist="true"
            :item="subItem"
            :active-keys="activeKeys"
            @expand="emit('expand', $event)"
            @select="emit('select', $event)"
          />
        </template>
      </ul>
    </CCollapseTransition>
  </li>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  $icon-size: 18px;
  $icon-indent: utils.unit(2);

  $list-indent: utils.unit(5);
  $icon-offset-width: $icon-size + $icon-indent;
  $sublist-indent: $list-indent + $icon-offset-width;

  .dashboard-menu-item {
    &__sublist {
      padding-bottom: utils.unit(2);
    }
  }

  .menu-item {
    display: flex;
    width: 100%;
    align-items: center;
    padding: utils.unit(2);
    padding-left: utils.unit(5);
    cursor: pointer;
    @include utils.apply-styles(utils.$text);
    color: inherit;
    line-height: 1;
    overflow: hidden;
    border-radius: utils.$border-radius;
    transition:
      background-color utils.$transition-duration,
      color utils.$transition-duration;

    &:hover {
      background-color: var(--side-menu-option-hover-color);
    }

    &:active {
      background-color: var(--side-menu-option-active-color);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: 1px solid var(--primary-color);
    }

    &--active {
      color: var(--primary-color);
    }

    &--exact-active {
      color: var(--primary-color);
      background-color: var(--side-menu-option-matched-color);

      .menu-item__label::before {
        background-image: linear-gradient(
          to left,
          var(--side-menu-option-matched-color) 30%,
          transparent
        );
      }
    }

    &--button {
      appearance: none;
      background: none;
      border-style: none;
      text-align: inherit;
    }

    &--collapsed {
      .menu-item__arrow {
        opacity: 0;
      }

      .menu-item__label {
        opacity: 0;
      }
    }

    &--sublist {
      padding-left: $sublist-indent;
    }

    &--collapsed.menu-item--sublist {
      .menu-item__content {
        margin-left: -#{$icon-offset-width};
      }

      .menu-item__label {
        opacity: 1;
        width: 32px;

        &::before {
          opacity: 1;
        }
      }
    }

    &__icon {
      width: $icon-size;
      height: $icon-size;
      flex-shrink: 0;
      margin-right: $icon-indent;
    }

    &__content {
      align-items: center;
      display: flex;
      justify-content: space-between;
      flex-grow: 1;
      transition: margin utils.$transition-duration;
    }

    &__label {
      margin-right: utils.unit(2);
      @include utils.apply-styles(utils.$text-small);
      line-height: $icon-size;
      overflow: hidden;
      white-space: nowrap;
      transition: opacity utils.$transition-duration;
      position: relative;

      &:last-child {
        margin-right: 0;
      }

      &::before {
        content: '';
        @include utils.absolute-fit;
        background-image: linear-gradient(
          to left,
          var(--menu-color) 30%,
          transparent
        );
        transition: opacity utils.$transition-duration;
        opacity: 0;
      }
    }

    &__arrow {
      margin-left: utils.unit(2);
      width: 12px;
      height: 12px;
      flex-shrink: 0;
      transition:
        transform utils.$transition-duration,
        opacity utils.$transition-duration;

      &--expanded {
        transform: rotate(180deg);
      }
    }
  }
</style>
