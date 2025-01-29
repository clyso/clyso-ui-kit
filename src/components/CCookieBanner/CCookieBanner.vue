<script setup lang="ts" generic="T extends string">
  import Cookies from 'js-cookie';
  import { computed, onBeforeMount, ref, type Ref, watch } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import CTile from '../CTile/CTile.vue';
  import CookieItem from './CookieItem.vue';
  import type {
    CookieBannerDict,
    CookieBannerItem,
  } from '../../types/cookieBanner';

  type CookieDict = CookieBannerDict<T>;

  const props = withDefaults(
    defineProps<{
      /**
       * Whether the cookie banner is currently shown.
       */
      isShown: boolean;

      /**
       * An array of items to be displayed in the cookie banner.
       */
      items: CookieBannerItem<T>[];

      /**
       * The distance from the bottom of the page, which positions the banner.
       * @default '24px'
       */
      bottom?: string;

      /**
       * Whether the cookie banner should be aligned to the right.
       * @default false
       */
      isAlignedRight?: boolean;

      /**
       * Whether the banner should include settings options.
       * @default true
       */
      hasSettings?: boolean;

      /**
       * Whether the banner should include a close button.
       * @default false
       */
      hasClose?: boolean;

      /**
       * The domain for which the cookie consent is applicable.
       * If not provided, the domain will default to the current domain.
       */
      domain?: string;

      /**
       * The name of the cookie used to store the user's consent.
       * @default 'cookieConsent'
       */
      cookieName?: string;

      /**
       * The number of days until the cookie expires.
       * @default 60
       */
      expiresInDays?: number;
    }>(),
    {
      bottom: '24px',
      isAlignedRight: false,
      hasSettings: true,
      hasClose: false,
      domain: undefined,
      cookieName: 'cookieConsent',
      expiresInDays: 60,
    },
  );

  const emit = defineEmits<{
    (e: 'update:isShown', value: boolean): void;
    (e: 'consent', value: CookieDict | null): void;
  }>();

  const computedStyle = computed(() => ({
    bottom: props.bottom,
  }));

  const isExtendedBannerShown = ref(false);

  const hasExtendedBanner = computed(() =>
    props.items.some((item) => !item.isMandatory),
  );

  const isBasicBannerShown = computed(
    () => !hasExtendedBanner.value || !isExtendedBannerShown.value,
  );

  function showExtendedBanner() {
    isExtendedBannerShown.value = true;
  }

  const enabledCookies: Ref<CookieDict | null> = ref(null);

  function initCookieBanner() {
    restoreSavedCookies();

    emit('consent', enabledCookies.value);

    if (!checkHasConsent()) {
      open();
      setEnabledCookiesFromItems();

      return;
    }

    isExtendedBannerShown.value = true;
  }

  function restoreSavedCookies() {
    const cookieValue = Cookies.get(props.cookieName);

    if (!cookieValue) {
      return;
    }

    try {
      enabledCookies.value = JSON.parse(cookieValue) as CookieDict;
    } catch {
      enabledCookies.value = null;
    }
  }

  function setEnabledCookiesFromItems() {
    const itemsEntries = props.items.map<[T, boolean]>(({ id, isEnabled }) => [
      id,
      isEnabled,
    ]);

    enabledCookies.value =
      itemsEntries.length === 0
        ? null
        : (Object.fromEntries(itemsEntries) as CookieDict);
  }

  function setEnabledCookie(id: T, value: boolean) {
    enabledCookies.value = (
      enabledCookies.value
        ? { ...enabledCookies.value, [id]: value }
        : { [id]: value }
    ) as CookieDict;
  }

  function checkHasConsent() {
    return Cookies.get(props.cookieName) !== undefined;
  }

  function setCookies(cookieDict: CookieDict) {
    Cookies.set(props.cookieName, JSON.stringify(cookieDict), {
      expires: props.expiresInDays,
      domain: props.domain,
    });
  }

  function acceptAllCookies() {
    const itemsEntries = props.items.map<[T, boolean]>(({ id }) => [id, true]);

    enabledCookies.value =
      itemsEntries.length === 0
        ? null
        : (Object.fromEntries(itemsEntries) as CookieDict);

    if (!enabledCookies.value) {
      return;
    }

    setCookies(enabledCookies.value);
    emit('consent', enabledCookies.value);
    close();
  }

  function rejectAllCookies() {
    const itemsEntries = props.items.map<[T, boolean]>(
      ({ id, isMandatory }) => [id, isMandatory ?? false],
    );

    enabledCookies.value =
      itemsEntries.length === 0
        ? null
        : (Object.fromEntries(itemsEntries) as CookieDict);

    if (!enabledCookies.value) {
      return;
    }

    setCookies(enabledCookies.value);
    emit('consent', enabledCookies.value);
    close();
  }

  function savePreferences() {
    if (!enabledCookies.value) {
      return;
    }

    setCookies(enabledCookies.value);
    emit('consent', enabledCookies.value);
    close();
  }

  function handleCloseButton() {
    if (isExtendedBannerShown.value && checkHasConsent()) {
      close();
    }

    rejectAllCookies();
  }

  function close() {
    emit('update:isShown', false);
  }

  function open() {
    emit('update:isShown', true);
  }

  onBeforeMount(() => {
    initCookieBanner();
  });

  function handleIsShownChange(value: boolean) {
    if (!value) {
      return;
    }

    restoreSavedCookies();

    if (!checkHasConsent()) {
      setEnabledCookiesFromItems();

      return;
    }

    isExtendedBannerShown.value = true;
  }

  watch(() => props.isShown, handleIsShownChange);
</script>

<template>
  <div
    :style="computedStyle"
    :class="{
      'c-cookie-banner--right': isAlignedRight,
    }"
    class="c-cookie-banner"
  >
    <div
      v-if="isShown"
      class="c-cookie-banner__wrapper"
    >
      <CTile
        :is-closable="hasClose"
        class="c-cookie-banner__banner cookie-banner"
        @close="handleCloseButton"
      >
        <Transition
          mode="out-in"
          name="opacity"
        >
          <div
            v-if="isBasicBannerShown"
            key="basic"
            class="basic-banner"
          >
            <h4 class="basic-banner__title cookie-banner__title">
              <slot name="basic-title">
                <slot name="title"> Cookie Preferences </slot>
              </slot>
            </h4>

            <p class="basic-banner__description cookie-banner__description">
              <slot name="basic-description">
                <slot name="description">
                  This website uses cookies to enhance your experience,
                  personalize content, and analyze traffic. By closing this
                  banner, you consent to the use of cookies. For more
                  information or to customize your cookie preferences, please
                  visit our Cookie Settings or Privacy Policy.
                </slot>
              </slot>
            </p>

            <div class="basic-banner__actions cookie-banner__actions">
              <CButton
                v-if="hasSettings && hasExtendedBanner"
                qhost
                class="basic-banner__settings-button"
                size="small"
                @click="showExtendedBanner"
              >
                <slot name="settings-action"> Cookie Settings </slot>
              </CButton>

              <div
                class="basic-banner__agree-actions cookie-banner__agree-actions"
              >
                <CButton
                  class="basic-banner__reject-button"
                  secondary
                  type="primary"
                  size="small"
                  @click="rejectAllCookies"
                >
                  <slot name="basic-reject-action">
                    <slot name="reject-action"> Accept Only Required </slot>
                  </slot>
                </CButton>

                <CButton
                  class="basic-banner__accept-button"
                  secondary
                  type="primary"
                  size="small"
                  @click="acceptAllCookies"
                >
                  <slot name="basic-accept-action">
                    <slot name="accept-action"> Accept All </slot>
                  </slot>
                </CButton>
              </div>
            </div>
          </div>

          <div
            v-else
            key="extended"
            class="extended-banner"
          >
            <h4 class="extended-banner__title cookie-banner__title">
              <slot name="extended-title">
                <slot name="title"> Customize Your Cookie Preferences </slot>
              </slot>
            </h4>

            <p class="extended-banner__description cookie-banner__description">
              <slot name="extended-description">
                <slot name="description">
                  Customize your cookie settings to enhance your experience.
                  Choose the types of cookies you'd like to allow for a
                  personalized browsing experience. Save your preferences below.
                </slot>
              </slot>
            </p>

            <div class="extended-banner__cookie-settings">
              <CookieItem
                v-for="item in items"
                :key="item.id"
                :item="item"
                :is-enabled="enabledCookies?.[item.id] ?? item.isEnabled"
                @update="(event) => setEnabledCookie(item.id, event)"
              />
            </div>

            <div class="extended-banner__actions cookie-banner__actions">
              <div
                class="extended-banner__agree-actions cookie-banner__agree-actions"
              >
                <CButton
                  class="extended-banner__reject-button"
                  qhost
                  size="small"
                  @click="rejectAllCookies"
                >
                  <slot name="extended-reject-action">
                    <slot name="reject-action"> Accept Only Required </slot>
                  </slot>
                </CButton>

                <CButton
                  class="extended-banner__accept-button"
                  qhost
                  size="small"
                  @click="acceptAllCookies"
                >
                  <slot name="extended-accept-action">
                    <slot name="accept-action"> Accept All </slot>
                  </slot>
                </CButton>
              </div>

              <CButton
                secondary
                type="primary"
                class="extended-banner__save-button"
                size="small"
                @click="savePreferences"
              >
                <slot name="save-action"> Save Preferences </slot>
              </CButton>
            </div>
          </div>
        </Transition>
      </CTile>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-cookie-banner {
    position: sticky;
    z-index: 30;
    right: 0;
    left: 0;
    @include utils.container;

    &__wrapper {
      position: relative;
    }

    &--right {
      .c-cookie-banner__banner {
        left: auto;
        right: 0;
      }
    }

    &__banner {
      position: absolute;
      bottom: 0;
      left: 0;
      max-width: 700px;
      min-width: 400px;
      background-color: var(--menu-color);
      box-shadow: var(--menu-shadow);
      border: 1px solid var(--menu-alt-color);

      @include utils.touch {
        width: 100%;
        min-width: 0;
        max-width: 100%;
      }
    }
  }

  .cookie-banner {
    &__title {
      font-family: utils.$font-primary;
      margin-bottom: utils.unit(3);
    }

    &__description {
      margin-bottom: utils.unit(3);
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: utils.unit(2) utils.unit(3);

      @include utils.mobile {
        display: grid;
        grid-template-columns: 1fr;
      }
    }

    &__agree-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: utils.unit(2) utils.unit(3);

      @include utils.mobile {
        grid-template-columns: auto;
      }
    }
  }

  .extended-banner {
    &__description {
      margin-bottom: utils.unit(4);
    }

    &__cookie-settings {
      display: grid;
      gap: utils.unit(4);
      margin-bottom: utils.unit(4);
    }

    &__accept-button {
      order: -1;
    }
  }
</style>
