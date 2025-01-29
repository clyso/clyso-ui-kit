<script setup lang="ts">
  import CButton from '../CButton/CButton.vue';
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';
  import CKeyValueInput from '../CKeyValueInput/CKeyValueInput.vue';
  import type { KeyValueItem } from '../../types/keyValue';

  const props = withDefaults(
    defineProps<{
      /**
       * Array of key-value items to be displayed in the list.
       */
      items: KeyValueItem[];

      /**
       * Unique identifier for the key-value list input component.
       */
      id: string;

      /**
       * Whether the component has an error state.
       */
      hasError?: boolean;

      /**
       * A function to determine if a key has an error at a specific index.
       */
      hasKeyError?: (index: number) => boolean;

      /**
       * A function to determine if a value has an error at a specific index.
       */
      hasValueError?: (index: number) => boolean;

      /**
       * Whether the key-value list input is disabled.
       */
      isDisabled?: boolean;

      /**
       * Label for the "Add" button to add new key-value pairs.
       */
      addLabel?: string;

      /**
       * Label for the key field.
       */
      keyLabel?: string;

      /**
       * Label for the value field.
       */
      valueLabel?: string;

      /**
       * Whether labels are shown for key and value fields.
       */
      hasLabels?: boolean;

      /**
       * Whether to show indexes for each key-value pair in the list.
       */
      hasIndexes?: boolean;
    }>(),
    {
      hasError: false,
      hasKeyError: () => false,
      hasValueError: () => false,
      isDisabled: false,
      addLabel: 'Add',
      keyLabel: 'Key',
      valueLabel: 'Value',
      hasLabels: true,
      hasIndexes: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the list of key-value items is updated.
     */
    (e: 'update:items', items: KeyValueItem[]): void;

    /**
     * Emitted when a new key-value item is added.
     */
    (e: 'add'): void;
  }>();

  function setItem(index: number, item: KeyValueItem) {
    if (props.isDisabled) {
      return;
    }

    const newItemsList = [...props.items];

    newItemsList.splice(index, 1, item);

    emit('update:items', newItemsList);
  }

  function deleteItem(index: number) {
    if (props.isDisabled) {
      return;
    }

    const newItemsList = [...props.items];

    newItemsList.splice(index, 1);

    emit('update:items', newItemsList);
  }

  function addItem() {
    if (props.isDisabled || props.hasError) {
      return;
    }

    emit('add');
  }
</script>

<template>
  <div class="c-key-value-list-input">
    <CCollapseTransition :show="items.length > 0">
      <div
        v-if="items.length > 0"
        class="c-key-value-list-input__list"
      >
        <CKeyValueInput
          v-for="(item, index) in items"
          :id="id"
          :key="index"
          class="c-key-value-list-input__item"
          :item="item"
          :is-disabled="isDisabled"
          :index="hasIndexes ? index : undefined"
          :has-key-error="hasError && hasKeyError(index)"
          :has-value-error="hasError && hasValueError(index)"
          :key-label="keyLabel"
          :value-label="valueLabel"
          :has-labels="hasLabels"
          :has-delete="true"
          @update:item="(itemParam) => setItem(index, itemParam)"
          @delete="() => deleteItem(index)"
        >
          <template
            v-if="$slots.index"
            #index
          >
            <slot
              name="index"
              v-bind="{ index }"
            ></slot>
          </template>

          <template #key-error>
            <slot
              name="key-error"
              v-bind="{ index }"
            ></slot>
          </template>
          <template #value-error>
            <slot
              name="value-error"
              v-bind="{ index }"
            ></slot>
          </template>
        </CKeyValueInput>
      </div>
    </CCollapseTransition>

    <CButton
      v-if="!isDisabled"
      class="c-key-value-list-input__add"
      size="small"
      :disabled="hasError"
      @click="addItem"
    >
      {{ addLabel }}
    </CButton>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-key-value-list-input {
    &__list {
      margin-bottom: utils.unit(3);
    }

    &__item {
      margin-bottom: utils.unit(3);

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
