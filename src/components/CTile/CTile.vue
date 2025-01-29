<script setup lang="ts">
  import CSkeleton from '../CSkeleton/CSkeleton.vue';
  import CCloseButton from '../CCloseButton/CCloseButton.vue';
  import CSpin from '../CSpin/CSpin.vue';

  interface CTileProps {
    /**
     * Whether loading skeletons are shown. Used for initial load.
     */
    isLoading?: boolean;
    /**
     * Whether the tile can be closed.
     */
    isClosable?: boolean;
    /**
     * Whether a processing spinner is shown. Used for processing actions.
     */
    isProcessing?: boolean;
  }

  withDefaults(defineProps<CTileProps>(), {
    isLoading: false,
    isClosable: false,
    isProcessing: false,
  });

  const emit = defineEmits<{
    /**
     * Emitted when the tile is closed.
     */
    (e: 'close'): void;
  }>();
</script>

<template>
  <div class="c-tile">
    <Transition
      name="opacity"
      mode="out-in"
    >
      <div
        v-if="isLoading"
        key="loading"
        class="c-tile__loading"
      >
        <slot name="loading">
          <div
            v-if="$slots.header || $slots.title || $slots['header-extra']"
            class="c-tile__header"
          >
            <slot name="loading-header">
              <template v-if="$slots.title || $slots['header-extra']">
                <CSkeleton
                  v-if="$slots.title"
                  :padding-block="3"
                  :height="17"
                  :width="200"
                />
                <CSkeleton
                  v-if="$slots['header-extra']"
                  :padding-block="3"
                  width="40%"
                />
              </template>

              <CSkeleton
                v-else
                :padding-block="3"
                width="100%"
              />
            </slot>
          </div>

          <div class="c-tile__content">
            <slot name="loading-content">
              <template v-if="$slots.default">
                <CSkeleton
                  type="text"
                  :repeat="3"
                />
                <CSkeleton
                  type="text"
                  width="70%"
                />
              </template>
            </slot>
          </div>

          <div
            v-if="$slots.footer || $slots.actions"
            class="c-tile__footer"
          >
            <slot name="loading-footer">
              <div
                v-if="$slots.actions"
                class="c-tile__actions"
              >
                <slot name="loading-actions">
                  <CSkeleton
                    :width="60"
                    :height="28"
                    :border-radius="4"
                  />
                  <CSkeleton
                    :width="80"
                    :height="28"
                    :border-radius="4"
                  />
                </slot>
              </div>
              <CSkeleton
                v-else
                :padding-block="3"
                width="100%"
              />
            </slot>
          </div>
        </slot>
      </div>

      <div
        v-else
        key="content"
        class="c-tile__main"
      >
        <header
          v-if="$slots.header || $slots.title || $slots['header-extra']"
          class="c-tile__header"
        >
          <div
            v-if="$slots.header || $slots.title"
            class="c-tile__header-main"
          >
            <h4
              v-if="$slots.title"
              class="c-tile__title"
            >
              <slot name="title"></slot>
            </h4>
            <slot name="header"></slot>
          </div>

          <div
            v-if="$slots['header-extra']"
            class="c-tile__header-extra"
          >
            <slot name="header-extra"></slot>
          </div>
        </header>

        <div class="c-tile__content">
          <slot></slot>
        </div>

        <footer
          v-if="$slots.footer || $slots.actions"
          class="c-tile__footer"
        >
          <slot name="footer"></slot>

          <div
            v-if="$slots.actions"
            class="c-tile__actions"
          >
            <slot name="actions"></slot>
          </div>
        </footer>
      </div>
    </Transition>

    <CCloseButton
      v-if="isClosable"
      size="large"
      class="c-tile__close-button"
      @click="emit('close')"
    />

    <div
      v-if="isProcessing"
      class="c-tile__processing"
    >
      <slot name="processing">
        <CSpin size="large" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;
  @use 'sass:math';

  $card-padding: utils.unit(4);
  $gap: utils.unit(6);
  $half-gap: math.div($gap, 2);

  .c-tile {
    display: grid;
    position: relative;
    background-color: var(--card-color);
    border: 1px solid var(--card-border-color);
    border-radius: utils.$border-radius;
    transition: utils.$transition-duration;
    padding: $card-padding;

    &__close-button {
      position: absolute;
      right: utils.unit(1);
      top: utils.unit(1);
    }

    &__loading {
      display: flex;
      flex-direction: column;
    }

    &__main {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: $gap;
      padding-bottom: $half-gap;

      &:last-child {
        padding-bottom: 0;
      }
    }

    &__title {
      margin-bottom: utils.unit(2);
      @include utils.apply-styles(utils.$text-h4);
      font-weight: utils.$font-weight-normal;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: utils.unit(2);

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__content {
      padding: $half-gap 0;
      flex-grow: 1;

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }
    }

    &__footer {
      padding-top: $half-gap;
      display: flex;
      align-items: center;

      &:first-child {
        padding-top: 0;
      }
    }

    &__actions {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: flex-end;
      gap: utils.unit(2);
    }

    &__processing {
      @include utils.absolute-fit;
      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        content: '';
        @include utils.absolute-fit;
        background: var(--body-color);
        opacity: 0.6;
      }
    }
  }
</style>
