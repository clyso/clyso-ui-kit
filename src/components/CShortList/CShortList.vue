<script setup lang="ts" generic="T">
  import { computed, ref } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

  const props = withDefaults(
    defineProps<{
      /**
       * List of items to be displayed.
       */
      list: T[];
      /**
       * Item key that should be displayed.
       */
      itemKey: (item: T) => string | number;
      /**
       * The maximum number of items in the list.
       */
      max?: number;
      /**
       * Size of the list.
       */
      size?: 'small' | 'medium';
      /**
       * Whether the list items have a marker.
       */
      hasMarker?: boolean;
    }>(),
    {
      max: 5,
      size: 'medium',
      hasMarker: true,
    },
  );

  const visibleItems = computed(() => props.list.slice(0, props.max));
  const collapsedItems = computed(() =>
    props.list.slice(props.max, props.list.length),
  );

  const isCollapsedShown = ref(false);
</script>

<template>
  <div
    class="c-short-list"
    :class="{
      'c-short-list--small': size === 'small',
      'c-short-list--no-marker': !hasMarker,
    }"
  >
    <ul class="c-short-list__list">
      <li
        v-for="item in visibleItems"
        :key="itemKey(item)"
        class="c-short-list__item"
      >
        <slot v-bind="{ item }">
          {{ itemKey(item) }}
        </slot>
      </li>

      <CCollapseTransition
        :show="!isCollapsedShown && collapsedItems.length > 0"
      >
        <li class="replications-c-short-list__item">...</li>
      </CCollapseTransition>

      <CCollapseTransition :show="isCollapsedShown">
        <li
          v-for="item in collapsedItems"
          :key="itemKey(item)"
          class="c-short-list__item"
        >
          <slot v-bind="{ item }">
            {{ itemKey(item) }}
          </slot>
        </li>
      </CCollapseTransition>
    </ul>

    <div
      v-if="collapsedItems.length"
      class="c-short-list__show"
      :class="{ 'c-short-list__show--shown': isCollapsedShown }"
    >
      <CButton
        quaternary
        class="c-short-list__show-button"
        size="tiny"
        @click="isCollapsedShown = !isCollapsedShown"
      >
        <template #icon>
          <CIcon
            class="c-short-list__show-icon"
            :is-inline="true"
            name="chevron-down"
          />
        </template>
      </CButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-short-list {
    &--small {
      .c-short-list__item {
        @include utils.apply-styles(utils.$text-small);
      }
    }

    &--no-marker {
      .c-short-list__item::before {
        content: none;
      }
    }

    &__item {
      &::before {
        content: '- ';
      }
    }

    &__show {
      margin-top: - utils.unit(1);
      display: flex;
      justify-content: center;

      &--shown {
        .c-short-list__show-icon {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
