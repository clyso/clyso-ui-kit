<script setup lang="ts">
  import { NAlert } from 'naive-ui';

  // https://www.naiveui.com/en-US/dark/components/alert#Alert-Props
  withDefaults(
    defineProps<{
      /**
       * Determines if the alert should have a border.
       */
      bordered?: boolean;
      /**
       * Determines if the alert can be closed by the user.
       */
      closable?: boolean;
      /**
       * Determines if an icon should be displayed in the alert.
       */
      showIcon?: boolean;
      /**
       * The title of the alert.
       */
      title?: string;
      /**
       * The type of alert.
       */
      type?: 'default' | 'info' | 'success' | 'warning' | 'error';
    }>(),
    {
      bordered: false,
      closable: false,
      showIcon: true,
      title: undefined,
      type: 'default',
    },
  );

  const emit = defineEmits<{
    (e: 'afterLeave'): void;
    (e: 'close'): void;
  }>();

  type AlertSlots = {
    default(): unknown;
    header(): unknown;
    icon(): unknown;
  };

  defineSlots<AlertSlots>();
</script>

<template>
  <NAlert
    class="c-alert"
    :bordered="bordered"
    :closable="closable"
    :show-icon="showIcon"
    :title="title"
    :type="type"
    @after-leave="() => emit('afterLeave')"
    @close="() => emit('close')"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #icon>
      <slot name="icon"></slot>
    </template>
  </NAlert>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-alert :deep(.c-alert-body) {
    .c-alert-body__content {
      @include utils.apply-styles(utils.$text-small);
      margin-right: utils.unit(6);
    }

    .c-alert-body__title {
      @include utils.apply-styles(utils.$text);
      font-weight: utils.$font-weight-bold;
    }

    .c-alert-body__title + .c-alert-body__content {
      margin-top: utils.unit(2);
    }
  }

  .c-alert.c-alert--show-icon :deep(.c-alert-body) {
    padding-left: 52px;
  }
</style>
