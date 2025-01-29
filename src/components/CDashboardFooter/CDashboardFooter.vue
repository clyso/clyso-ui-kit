<script setup lang="ts">
  import { type DashboardFooterLink } from '../../types';
  import CButton from '../CButton/CButton.vue';

  withDefaults(
    defineProps<{
      /**
       * Array of custom footer links. If provided, these links will be displayed in the footer.
       * Defaults to the `DASHBOARD_FOOTER_LINKS` constant.
       */
      links: DashboardFooterLink[];

      /**
       * Determines whether the footer content is centered.
       * Defaults to `true`, aligning the content to the center of the footer.
       */
      isCentered?: boolean;
    }>(),
    {
      isCentered: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when a link in the footer is clicked.
     * @param id - The ID of the clicked link.
     */
    (e: 'click', id: string): void;
  }>();
</script>

<template>
  <footer class="c-dashboard-footer">
    <div :class="isCentered ? 'container' : 'inner'">
      <div class="c-dashboard-footer__content">
        <div class="c-dashboard-footer__main">
          <nav class="footer-nav">
            <ul class="footer-nav__links">
              <li
                v-for="link in links"
                :key="link.id"
                class="footer-nav__link-item bordered-right"
              >
                <component
                  :is="link.url ? 'a' : 'div'"
                  target="_blank"
                  :href="link.url"
                  rel="noopener noreferrer"
                  class="footer-nav__link"
                >
                  <CButton
                    text
                    size="small"
                    :tag="link.url ? 'span' : undefined"
                    @click="() => emit('click', link.id)"
                  >
                    {{ link.text }}
                  </CButton>
                </component>
              </li>
            </ul>
          </nav>

          <div
            v-if="$slots.copyright || $slots.address"
            class="footer-copyright"
          >
            <span
              v-if="$slots.copyright"
              class="footer-copyright__copyright bordered-right"
            >
              <slot name="copyright"></slot>
            </span>
            <span
              v-if="$slots.address"
              class="footer-copyright__address"
            >
              <slot name="address"></slot>
            </span>
          </div>
        </div>

        <slot name="logo"></slot>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-dashboard-footer {
    &__content {
      padding: utils.unit(8) 0;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: utils.unit(6);

      @include utils.mobile {
        flex-direction: column-reverse;
      }
    }
  }

  .footer-nav {
    margin-bottom: utils.unit(6);

    &__links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: utils.unit(3) utils.unit(8);

      @include utils.mobile {
        flex-direction: column;
      }
    }
  }

  .footer-copyright {
    color: var(--text-color-3);
    display: flex;
    align-items: center;
    gap: utils.unit(1) utils.unit(8);
    @include utils.apply-styles(utils.$text-small);

    @include utils.mobile {
      flex-direction: column;
      text-align: center;
    }
  }

  .bordered-right {
    position: relative;

    &:last-child::after {
      content: none;
    }

    &::after {
      content: '';
      @include utils.absolute-y-center;
      right: - utils.unit(4);
      height: 24px;
      border-right: 1px solid var(--border-color);

      @include utils.mobile {
        content: none;
      }
    }
  }
</style>
