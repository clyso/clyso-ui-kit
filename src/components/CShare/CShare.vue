<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import CPopover from '../CPopover/CPopover.vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import type { ShareDataObject, ShareMedia, ShareData } from '../../types';
  import { VIEWPORT_DESKTOP } from '../../constants';

  const SHARE_ICON_MAP: Record<ShareMedia, string> = {
    copyLink: 'share-copy',
    telegram: 'share-telegram',
    whatsapp: 'share-whatsapp',
    xTwitter: 'share-xtwitter',
    facebook: 'share-facebook',
  };
  const SUCCESS_ICON_NAME = 'checkmark-circle';
  const ERROR_ICON_NAME = 'alert-circle';

  const props = withDefaults(
    defineProps<{
      /**
       * Title, text and url of content to share
       */
      data: ShareData;
      /**
       * Source of shared content
       * Options are 'copyLink', 'telegram', 'whatsapp', 'xTwitter' or 'facebook'
       */
      mediaList?: ShareMedia[];
      /**
       * Text that is shown in case of successful copying process
       */
      copyTooltipSuccessText?: string;
      /**
       * Text that is shown in case of share failure
       */
      failedText?: string;
      /**
       * Wheater Share component is disabled
       */
      isDisabled?: boolean;
    }>(),
    {
      mediaList: () => [
        'copyLink',
        'telegram',
        'whatsapp',
        'xTwitter',
        'facebook',
      ],
      copyTooltipSuccessText: 'Copied!',
      failedText: 'Failed!',
      isDisabled: false,
    },
  );

  const isNative = ref(false);

  onMounted(() => {
    const isMobile = window.innerWidth < VIEWPORT_DESKTOP;

    isNative.value = window.navigator.share !== undefined && isMobile;
  });

  function getIcon(media: ShareMedia) {
    return SHARE_ICON_MAP[media];
  }

  const isMediaListShown = ref(false);
  const isLoading = ref(false);
  const isFailed = ref<boolean>(false);
  const tooltipType = ref<'media' | 'status'>('media');
  const isCopySuccess = ref<boolean>(false);
  const tooltipText = ref<string>('');
  const statusIcon = ref<string>('');
  const copyStatusTimeout = ref<number | null>(null);

  const isMediaTooltip = computed(() => tooltipType.value === 'media');

  const isStatusShown = computed(() => isCopySuccess.value || isFailed.value);
  const isTooltipShown = computed(
    () => isMediaListShown.value || isStatusShown.value,
  );

  function resetStatus() {
    isCopySuccess.value = false;
    isFailed.value = false;

    if (copyStatusTimeout.value === null) {
      return;
    }

    clearTimeout(copyStatusTimeout.value);
    copyStatusTimeout.value = null;
  }

  function delayStatusReset() {
    copyStatusTimeout.value = window.setTimeout(resetStatus, 1500);
  }

  function showSuccess() {
    tooltipType.value = 'status';
    tooltipText.value = props.copyTooltipSuccessText;
    statusIcon.value = SUCCESS_ICON_NAME;
    isCopySuccess.value = true;
  }

  function showError() {
    tooltipType.value = 'status';
    tooltipText.value = props.failedText;
    statusIcon.value = ERROR_ICON_NAME;
    isFailed.value = true;
  }

  async function copyData(dataObject: ShareDataObject) {
    resetStatus();

    try {
      await window.navigator.clipboard.writeText(dataObject.url);

      showSuccess();
    } catch {
      showError();
    } finally {
      delayStatusReset();
    }
  }

  async function shareToMediaBase(
    callback: (shareObject: ShareDataObject) => void | Promise<void>,
  ) {
    if (typeof props.data !== 'function') {
      callback(props.data);

      return;
    }

    isLoading.value = true;

    try {
      const shareObject = await props.data();

      await callback(shareObject);
    } catch {
      showError();
      delayStatusReset();
    } finally {
      isLoading.value = false;
    }
  }

  function hideMediaList() {
    if (!isMediaListShown.value) {
      return;
    }

    isMediaListShown.value = false;
  }

  function showMediaList() {
    if (isMediaListShown.value) {
      return;
    }

    tooltipType.value = 'media';
    isMediaListShown.value = true;
  }

  function shareToMedia(media: ShareMedia) {
    hideMediaList();

    if (media === 'copyLink') {
      shareToMediaBase((dataObject) => copyData(dataObject));

      return;
    }

    if (media === 'telegram') {
      shareToMediaBase(({ url, title, text }) => {
        const telegramText = `${title ?? ''}${title && text ? '\n' : ''}${text ?? ''}`;
        const telegramUrl = new URL('https://t.me/share/url');

        telegramUrl.searchParams.append('text', telegramText);
        telegramUrl.searchParams.append('url', url);

        window.open(telegramUrl);
      });

      return;
    }

    if (media === 'whatsapp') {
      shareToMediaBase(({ url, title, text }) => {
        const whatsappText = `${title ?? ''}${title && text ? '\n' : ''}${text ?? ''}${title || text ? '\n' : ''}${url}`;
        const whatsappUrl = new URL('https://wa.me/');

        whatsappUrl.searchParams.append('text', whatsappText);

        window.open(whatsappUrl);
      });
    }

    if (media === 'xTwitter') {
      shareToMediaBase(({ url, title, text }) => {
        const twitterText = `${title ?? ''}${title && text ? '\n' : ''}${text ?? ''}`;
        const twitterUrl = new URL('https://twitter.com/intent/tweet');

        twitterUrl.searchParams.append('text', twitterText);
        twitterUrl.searchParams.append('url', url);

        window.open(twitterUrl);
      });
    }

    if (media === 'facebook') {
      shareToMediaBase(({ url }) => {
        const facebookUrl = new URL(
          'https://www.facebook.com/sharer/sharer.php',
        );

        facebookUrl.searchParams.append('u', url);

        window.open(facebookUrl);
      });
    }
  }

  async function nativeShare() {
    if (!isNative.value) {
      isFailed.value = true;
      delayStatusReset();

      return;
    }

    if (typeof props.data !== 'function') {
      window.navigator.share(props.data);

      return;
    }

    isLoading.value = true;

    try {
      window.navigator.share(await props.data());
    } catch {
      showError();
      delayStatusReset();
    } finally {
      isLoading.value = false;
    }
  }

  function share() {
    if (isNative.value) {
      nativeShare();

      return;
    }

    showMediaList();
  }

  function handleClickOutside() {
    if (!isMediaTooltip.value) {
      return;
    }

    setTimeout(hideMediaList);
  }
</script>

<template>
  <CPopover
    :show="isTooltipShown"
    trigger="manual"
    @clickoutside="handleClickOutside"
  >
    <template #trigger>
      <slot v-bind="{ share, isLoading, isDisabled }">
        <CButton
          class="cart-actions__download"
          tertiary
          :loading="isLoading"
          :disabled="isDisabled"
          @click="share"
        >
          <template #icon>
            <CIcon
              :is-inline="true"
              name="share"
            />
          </template>

          <slot name="share-button-text"> Share </slot>
        </CButton>
      </slot>
    </template>

    <div
      v-if="isMediaTooltip || isLoading"
      key="media"
      class="c-share__media-list"
    >
      <CButton
        v-for="media in mediaList"
        :key="media"
        quaternary
        class="c-share__media-button"
        :class="`c-share__media-button--${media}`"
        circle
        size="large"
        @click="() => shareToMedia(media)"
      >
        <template #icon>
          <CIcon
            :is-inline="true"
            class="c-share__media-icon"
            :name="getIcon(media)"
          />
        </template>
      </CButton>
    </div>
    <div
      v-else-if="!isLoading"
      key="status"
      class="c-share__status"
    >
      <CIcon
        :is-inline="true"
        class="c-share__status-icon"
        :class="{
          'c-share__status-icon--success': isCopySuccess,
          'c-share__status-icon--error': isFailed,
        }"
        :name="statusIcon"
      />
      {{ tooltipText }}
    </div>
  </CPopover>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-share {
    &__media-list {
      display: flex;
      align-items: center;
      gap: utils.unit(2);
    }

    &__media-button {
      --n-icon-size: 24px !important;

      &--copyLink {
        .c-share__media-icon {
          color: var(--text-color-3);
        }
      }

      &--xTwitter {
        .c-share__media-icon {
          color: var(--text-color-base);
          height: 20px;
        }
      }
    }

    &__status {
      display: flex;
      align-items: center;
      gap: utils.unit(1);
    }

    &__status-icon {
      width: 20px;
      height: 20px;

      &--success {
        color: var(--success-color);
      }

      &--error {
        color: var(--error-color);
      }
    }
  }
</style>
