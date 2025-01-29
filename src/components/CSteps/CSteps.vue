<script setup lang="ts">
  import { NSteps, NStep } from 'naive-ui';
  import type { Step, StepStatus } from '../../types';

  withDefaults(
    defineProps<{
      /**
       * List of steps to be displayed.
       */
      steps: Step[];
      /**
       * Currently active step index.
       */
      current: number;
      /**
       * Steps status. Options are 'process', 'finish', 'error' or 'wait'
       */
      status: StepStatus;
      /**
       * Size of the steps. Options are 'small' and 'medium'.
       */
      size?: 'small' | 'medium';
      /**
       * Wheather steps are aligned vertically.
       */
      vertical?: boolean;
    }>(),
    {
      size: 'medium',
      vertical: false,
    },
  );

  const emit = defineEmits<{
    /**
     * Callback on currently active step index changed. If it's set, step can be switched by click.
     */
    (e: 'update:current', index: number): void;
  }>();
</script>

<template>
  <NSteps
    class="c-steps"
    :current="current"
    :status="status"
    :size="size"
    :vertical="vertical"
    v-bind="$attrs"
    @update:current="(index) => emit('update:current', index)"
  >
    <NStep
      v-for="(step, index) in steps"
      :key="index"
      :disabled="step.isDisabled"
      :title="step.title"
      :description="step.description"
    />

    <slot></slot>

    <template #finish-icon>
      <slot name="finish-icon"></slot>
    </template>

    <template #error-icon>
      <slot name="error-icon"></slot>
    </template>
  </NSteps>
</template>
