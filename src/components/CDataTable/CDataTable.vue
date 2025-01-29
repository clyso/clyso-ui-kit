<script setup lang="ts">
  import { NDataTable } from 'naive-ui';
  import { computed, onMounted, ref, useSlots, watch } from 'vue';
  import CResult from '../CResult/CResult.vue';
  import type {
    DataTableBaseColumn,
    DataTableFilterState,
    DataTableProps,
    DataTableRowData,
    DataTableSortOrder,
    DataTableSortState,
    OnUpdateCheckedRowKeys,
    OnUpdateExpandedRowKeys,
    OnUpdateFilters,
  } from '../../types/dataTable';

  // https:// www.naiveui.com/en-US/dark/components/data-table#DataTable-Props
  const props = withDefaults(
    defineProps<{
      /**
       * The data to be displayed in the table.
       */
      data: DataTableRowData[];

      /**
       * The columns to be displayed in the table.
       * Columns should be defined with the Naive UI `NDataTable` format.
       */
      columns: DataTableProps['columns'];

      /**
       * Pagination configuration. Can be set to `false` for no pagination.
       */
      pagination?: DataTableProps['pagination'];

      /**
       * Whether the data table is remote, meaning the data is fetched from an external source.
       */
      isRemote?: boolean;

      /**
       * Whether the data table is in a controlled state.
       */
      isControlled?: boolean;

      /**
       * Whether the table is showing an error state.
       */
      hasError?: boolean;

      /**
       * Whether the table is loading.
       */
      isLoading?: boolean;

      /**
       * The current sorting state for the table.
       */
      sorter?: DataTableSortState | null;

      /**
       * Whether to show the expand column when using expandable rows.
       * This can be set to `false` if you want to use custom expansion buttons elsewhere.
       */
      showExpandColumn?: boolean;
    }>(),
    {
      isRemote: false,
      isControlled: false,
      hasError: false,
      isLoading: false,
      pagination: undefined,
      sorter: null,
      showExpandColumn: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the checked row keys are updated.
     * @param value - The updated checked row keys.
     */
    'update:checked-row-keys': Parameters<OnUpdateCheckedRowKeys>;

    /**
     * Emitted when the expanded row keys are updated.
     * @param value - The updated expanded row keys.
     */
    'update:expanded-row-keys': Parameters<OnUpdateExpandedRowKeys>;

    /**
     * Emitted when the filters are updated.
     * @param value - The updated filters.
     */
    'update:filters': Parameters<OnUpdateFilters>;

    /**
     * Emitted when the current page is updated.
     * @param page - The new page number.
     */
    'update:page': [page: number];

    /**
     * Emitted when the page size is updated.
     * @param pageSize - The new page size.
     */
    'update:page-size': [pageSize: number];

    /**
     * Emitted when the sorter state is updated.
     * @param sorter - The new sorter state.
     */
    'update:sorter': [sorter: DataTableSortState | null];

    /**
     * Emitted when a retry action is triggered (e.g., on error).
     */
    retry: [];
  }>();

  const dataTable = ref<InstanceType<typeof NDataTable> | null>(null);

  defineExpose({
    scrollTo: (options: {
      left?: number;
      top?: number;
      behavior?: ScrollBehavior;
    }) => dataTable.value?.scrollTo(options),
    clearFilters: () => dataTable.value?.clearFilters(),
    clearSorter: () => dataTable.value?.clearSorter(),
    filters: (filters: DataTableFilterState | null) =>
      dataTable.value?.filters(filters),
    page: (page: number) => dataTable.value?.page(page),
    sort: (columnKey: string | number, order: DataTableSortOrder) =>
      dataTable.value?.sort(columnKey, order),
  });

  defineSlots<{
    empty(props: Record<string, unknown>): unknown;
    error(props: Record<string, unknown>): unknown;
    loading(props: Record<string, unknown>): unknown;
    [k: string]: (props: {
      rowData: DataTableRowData;
      rowIndex: number;
    }) => unknown;
  }>();

  const slots = useSlots();
  const computedColumns = computed(() =>
    props.columns?.map((column) => {
      if (!('key' in column)) {
        return column;
      }

      const computedColumn = { ...column } as DataTableBaseColumn;

      if (props.isControlled && computedColumn.sorter) {
        computedColumn.sortOrder =
          props.sorter?.columnKey &&
          computedColumn.key === props.sorter.columnKey
            ? props.sorter.order
            : false;
      }

      const slotKey = computedColumn.key;
      const columnSlot = slots[slotKey];

      if (!columnSlot) {
        return computedColumn;
      }

      return {
        ...computedColumn,
        render: (rowData: DataTableRowData, rowIndex: number) =>
          columnSlot({ rowData, rowIndex }),
      };
    }),
  );
  const computedData = computed(() => {
    if (props.hasError) {
      return [];
    }

    return props.data;
  });
  const computedPagination = computed(() => {
    if (props.hasError) {
      return undefined;
    }

    return props.pagination;
  });

  function handleSorterUpdate(newSorter: DataTableSortState) {
    if (!props.isControlled) {
      emit('update:sorter', newSorter);

      return;
    }

    emit('update:sorter', newSorter.order ? newSorter : null);
  }

  const expandedColumnIndex = computed(() => {
    const index =
      props.columns?.findIndex((column) => column.type === 'expand') ?? -1;

    return index + 1;
  });

  const hasExpand = computed(() => expandedColumnIndex.value !== 0);

  function applyExpandColumnHiddenStyles() {
    const styleClass = 'expand-hidden';
    let styleEl = dataTable.value?.$el.querySelector(`style.${styleClass}`);

    if (props.showExpandColumn || expandedColumnIndex.value === 0) {
      styleEl?.remove();

      return;
    }

    const hiddenStyles = `colgroup col:nth-child(${expandedColumnIndex.value}) {
      width: 0!important;
      min-width: 0!important;
    }`;

    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.className = styleClass;
      dataTable.value?.$el.appendChild(styleEl);
    }

    styleEl.textContent = hiddenStyles;
  }

  watch(
    [() => expandedColumnIndex.value, () => props.showExpandColumn],
    applyExpandColumnHiddenStyles,
  );

  onMounted(applyExpandColumnHiddenStyles);
</script>

<template>
  <NDataTable
    ref="dataTable"
    :class="{
      [`c-data-table--${$attrs.size}`]: $attrs.size,
      'c-data-table--expand-hidden': hasExpand && !showExpandColumn,
    }"
    :style="
      $attrs.size === 'tiny'
        ? {
            '--n-th-padding': '4px',
            '--n-td-padding': '4px',
          }
        : undefined
    "
    v-bind="$attrs"
    :remote="isRemote || isControlled"
    :data="computedData"
    :loading="isLoading"
    :columns="computedColumns"
    :pagination="computedPagination"
    @update:checked-row-keys="
      (...args) => emit('update:checked-row-keys', ...args)
    "
    @update:expanded-row-keys="
      (...args) => emit('update:expanded-row-keys', ...args)
    "
    @update:filters="(...args) => emit('update:filters', ...args)"
    @update:page="(...args) => emit('update:page', ...args)"
    @update:sorter="handleSorterUpdate"
    @update:page-size="(...args) => emit('update:page-size', ...args)"
  >
    <template #empty>
      <slot
        v-if="hasError"
        name="error"
      >
        <CResult
          type="error"
          @positive-click="emit('retry')"
        />
      </slot>
      <slot
        v-else
        name="empty"
      >
        <CResult type="empty" />
      </slot>
    </template>
    <template #loading>
      <slot name="loading"></slot>
    </template>
  </NDataTable>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-data-table {
    &--tiny {
      :deep(.c-data-table-table) {
        @include utils.apply-styles(utils.$text-caption);

        .c-data-table-tbody {
          font-weight: utils.$font-weight-normal;
        }
      }
    }
  }

  .c-data-table--expand-hidden {
    ::v-deep([data-col-key='__n_expand__'] > *) {
      display: none;
    }
  }
</style>
