<script setup lang="ts">
  import {
    computed,
    inject,
    onBeforeUpdate,
    onMounted,
    readonly,
    ref,
    watch,
  } from 'vue';
  import type { RouteLocationRaw } from 'vue-router';
  import CTooltip from '../CTooltip/CTooltip.vue';
  import {
    DASHBOARD_NAV_META_INJECT_KEY,
    getDefaultNavMeta,
  } from '../../constants';
  import { GeneralHelper } from '../../helpers';

  const props = withDefaults(
    defineProps<{
      /**
       * Route to destination.
       */
      to?: RouteLocationRaw;
      /**
       * Wheater tooltip is shown.
       */
      isTooltipOnOverflow?: boolean;
      /**
       * Tooltip delay on hover.
       */
      tooltipDelayMs?: number;
    }>(),
    {
      to: undefined,
      isTooltipOnOverflow: true,
      tooltipDelayMs: 1000,
    },
  );

  const isLink = computed(() => props.to !== undefined);
  const text = ref<HTMLElement | null>(null);
  const isTextOverflown = ref(false);
  const isOverflowTooltipShown = computed(
    () => isTextOverflown.value && props.isTooltipOnOverflow,
  );

  function getOverflowStatus() {
    if (!text.value) {
      isTextOverflown.value = false;

      return;
    }

    isTextOverflown.value = text.value.offsetWidth < text.value.scrollWidth;
  }

  const debouncedGetOverflowStatus = GeneralHelper.debounce(
    getOverflowStatus,
    1000,
  );

  onMounted(getOverflowStatus);

  onBeforeUpdate(debouncedGetOverflowStatus);

  const navMeta = inject(
    DASHBOARD_NAV_META_INJECT_KEY,
    readonly(ref(getDefaultNavMeta())),
  );

  watch(() => navMeta.value.viewportWidth, debouncedGetOverflowStatus);

  type TableCellLinkSlots = {
    /**
     * Text content inside Table Cell link.
     */
    default(): unknown;
    /**
     * Table Cell Link icon.
     */
    icon?(): unknown;
    /**
     * Table Cell Link tooltip.
     */
    tooltip?(): unknown;
  };

  defineSlots<TableCellLinkSlots>();
</script>

<template>
  <component
    :is="isLink ? 'RouterLink' : 'div'"
    :to="to"
    class="c-table-cell-link"
    :class="{ 'c-table-cell-link--link': isLink }"
  >
    <CTooltip
      :delay="tooltipDelayMs"
      :disabled="!isOverflowTooltipShown"
    >
      <template #trigger>
        <div class="c-table-cell-link__content">
          <span
            v-if="$slots.icon"
            class="c-table-cell-link__icon"
          >
            <slot name="icon"></slot>
          </span>

          <span
            ref="text"
            class="c-table-cell-link__value"
          >
            <slot></slot>
          </span>
        </div>
      </template>

      <slot
        v-if="$slots.tooltip"
        name="tooltip"
      ></slot>
      <slot v-else></slot>
    </CTooltip>
  </component>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;
  @use 'sass:math';

  $indent: utils.unit(1);
  $indent-vertical: math.div($indent, 2);

  .c-table-cell-link {
    position: relative;
    display: inline-grid;
    vertical-align: top;

    &::before {
      position: absolute;
      left: -$indent;
      right: -$indent;
      bottom: -$indent-vertical;
      top: -$indent-vertical;
      z-index: 0;
      border-radius: utils.$border-radius;
      transition: background-color utils.$transition-duration;
    }

    &--link {
      &::before {
        content: '';
      }

      &:hover::before {
        background-color: var(--button-color-2-hover);
      }

      &:active::before {
        background-color: var(--button-color-2-pressed);
      }
    }

    &__content {
      position: relative;
      display: flex;
      white-space: nowrap;
      gap: utils.unit(3);
      align-items: center;
      z-index: 1;
      min-width: 0;
    }

    &__icon {
      flex-shrink: 0;
    }

    &__value {
      @include utils.ellipsis;
    }
  }
</style>
