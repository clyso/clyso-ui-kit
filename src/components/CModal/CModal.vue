<script setup lang="ts">
  import { NModal } from 'naive-ui';
  import CTile from '../CTile/CTile.vue';

  withDefaults(
    defineProps<{
      /**
       * Controls whether the modal is shown or hidden.
       */
      isShown: boolean;

      /**
       * Whether the modal should automatically focus when shown.
       */
      autoFocus?: boolean;

      /**
       * Determines if pressing ESC will close the modal.
       */
      closeOnEsc?: boolean;

      /**
       * Defines the target element or selector to teleport the modal to.
       */
      to?: string | HTMLElement;

      /**
       * Whether loading skeletons are shown. Used for initial load.
       */
      isLoading?: boolean;

      /**
       * Whether a processing spinner is shown. Used for processing actions.
       */
      isProcessing?: boolean;

      /**
       * Whether the modal has a close button.
       */
      hasCloseBtn?: boolean;

      /**
       * Specifies the size of the modal. Can be 'small', 'medium', or 'large'.
       */
      size?: 'small' | 'medium' | 'large';

      /**
       * Defines the width of the modal. If not provided, the default size will be used.
       */
      width?: number;

      /**
       * Determines whether clicking on the mask area closes the modal.
       */
      maskClosable?: boolean;
    }>(),
    {
      autoFocus: true,
      closeOnEsc: true,
      to: 'body',
      isLoading: false,
      isProcessing: false,
      hasCloseBtn: true,
      size: 'medium',
      width: undefined,
      maskClosable: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emits when the modal visibility is updated.
     */
    (e: 'update:isShown', value: boolean): void;

    /**
     * Emits when the ESC key is pressed.
     */
    (e: 'esc'): void;

    /**
     * Emits when the mask area is clicked.
     */
    (e: 'maskClick'): void;

    /**
     * Emits when the modal is closed.
     */
    (e: 'close'): void;

    /**
     * Emits after the modal has finished leaving.
     */
    (e: 'afterLeave'): void;
  }>();

  function handleIsShownUpdate(value: boolean) {
    emit('update:isShown', value);

    if (!value) {
      emit('close');
    }
  }
</script>

<template>
  <NModal
    :show="isShown"
    :auto-focus="autoFocus"
    :close-on-esc="closeOnEsc"
    :to="to"
    :mask-closable="maskClosable"
    transform-origin="center"
    class="c-modal"
    @esc="emit('esc')"
    @mask-click="emit('maskClick')"
    @update:show="handleIsShownUpdate"
    @after-leave="emit('afterLeave')"
  >
    <CTile
      :is-loading="isLoading"
      :is-processing="isProcessing"
      :is-closable="hasCloseBtn"
      class="c-modal__content"
      :class="`c-modal__content--${size}`"
      :style="{ maxWidth: `${width}px` }"
      role="dialog"
      aria-modal="true"
      :aria-busy="isLoading"
      @close="handleIsShownUpdate(false)"
    >
      <template
        v-if="$slots.title"
        #title
      >
        <slot name="title"></slot>
      </template>
      <template
        v-if="$slots.header"
        #header
      >
        <slot name="header"></slot>
      </template>
      <!--Used when hasCloseBtn is false-->
      <template
        v-if="$slots['header-extra']"
        #header-extra
      >
        <slot name="header-extra"></slot>
      </template>

      <slot></slot>

      <template
        v-if="$slots.footer"
        #footer
      >
        <slot name="footer"></slot>
      </template>
      <template
        v-if="$slots.actions"
        #actions
      >
        <slot name="actions"></slot>
      </template>
      <template
        v-if="isProcessing && $slots.processing"
        #processing
      >
        <slot name="processing"></slot>
      </template>

      <template
        v-if="$slots.loading"
        #loading
      >
        <slot name="loading"></slot>
      </template>
      <template
        v-if="$slots['loading-header']"
        #loading-header
      >
        <slot name="loading-header"></slot>
      </template>
      <template
        v-if="$slots['loading-content']"
        #loading-content
      >
        <slot name="loading-content"></slot>
      </template>
      <template
        v-if="$slots['loading-footer']"
        #loading-footer
      >
        <slot name="loading-footer"></slot>
      </template>
      <template
        v-if="$slots['loading-actions']"
        #loading-actions
      >
        <slot name="loading-actions"></slot>
      </template>
    </CTile>
  </NModal>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-modal {
    &__content {
      width: 100%;
      max-width: 600px;

      &--small {
        max-width: 400px;
      }

      &--large {
        max-width: 800px;
      }
    }
  }

  :global(.c-modal-mask) {
    backdrop-filter: blur(2px);
  }

  :global(.c-modal-scroll-content) {
    padding: utils.unit(6);

    @include utils.mobile {
      padding: utils.unit(2);
    }
  }
</style>
