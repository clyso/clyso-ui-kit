<script setup lang="ts">
  import CCollapseTransition from '../CCollapseTransition/CCollapseTransition.vue';

  const emit = defineEmits<{
    /**
     * Emitted when the form is submitted.
     */
    (e: 'submit'): void;
  }>();
</script>

<template>
  <form
    class="c-form"
    novalidate
    @submit.prevent="emit('submit')"
  >
    <CCollapseTransition :show="$slots.error !== undefined">
      <div
        v-if="$slots.error"
        class="c-form__error"
      >
        <slot name="error"></slot>
      </div>
    </CCollapseTransition>

    <div class="c-form__fields">
      <slot></slot>
    </div>

    <div
      v-if="$slots.actions"
      class="c-form__actions"
    >
      <slot name="actions"></slot>
    </div>
  </form>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-form {
    display: block;

    &__fields {
      margin-bottom: utils.unit(9);

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__error {
      margin-bottom: utils.unit(4);
    }

    &__actions {
      margin-top: utils.unit(9);
    }
  }
</style>
