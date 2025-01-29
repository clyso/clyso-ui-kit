<script setup lang="ts">
  import { NTabs, NTab } from 'naive-ui';
  import { type Tab } from '../../types/tabs';

  // TODO: pass types with $attrs
  // https://www.naiveui.com/en-US/dark/components/tabs#Tabs-Props
  withDefaults(
    defineProps<{
      value: string;
      tabs: Tab[];
      size?: 'small' | 'medium' | 'large';
      type?: 'bar' | 'line' | 'card' | 'segment';
      trigger?: 'hover' | 'click';
    }>(),
    {
      size: 'medium',
      type: 'card',
      trigger: 'click',
    },
  );

  const emit = defineEmits<{
    (e: 'click', value: string): void;
    (e: 'update:value', value: string): void;
  }>();

  function handleClick(tab: Tab) {
    if (tab?.isDisabled) {
      return;
    }

    emit('click', tab.name);
  }
</script>

<template>
  <NTabs
    class="c-tabs"
    v-bind="$attrs"
    :value="value"
    :size="size"
    :type="type"
    animated
    :trigger="trigger"
    @update:value="
      (newTab) => {
        emit('update:value', newTab);
      }
    "
  >
    <NTab
      v-for="tab in tabs"
      :key="tab.name"
      :disabled="tab.isDisabled"
      :name="tab.name"
      @click="() => handleClick(tab)"
    >
      <slot :name="tab.name">
        {{ tab.label }}
      </slot>
    </NTab>
  </NTabs>
</template>
