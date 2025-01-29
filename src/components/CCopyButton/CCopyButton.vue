<script setup lang="ts">
  import { ref } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CTooltip from '../CTooltip/CTooltip.vue';

  const props = withDefaults(
    defineProps<{
      /**
       * The text content to be copied when the button is clicked.
       */
      text: string;

      /**
       * The size of the button.
       */
      size?: 'tiny' | 'small' | 'medium' | 'large';

      /**
       * The message to display when the text is successfully copied to the clipboard.
       */
      successText?: string;

      /**
       * The message to display if an error occurs during the copy operation.
       */
      errorText?: string;

      /**
       * The duration (in milliseconds) for which the status message (success or error) is displayed.
       */
      statusDuration?: number;
    }>(),
    {
      size: 'medium',
      successText: 'Copied!',
      errorText: 'Copy failed!',
      statusDuration: 1500,
    },
  );

  const isCopySuccess = ref<boolean>(false);
  const isCopyFailed = ref<boolean>(false);
  const tooltipText = ref<string>('');
  const timeout = ref<number | null>(null);

  function resetStatus() {
    isCopySuccess.value = false;
    isCopyFailed.value = false;

    if (timeout.value === null) {
      return;
    }

    clearTimeout(timeout.value);
    timeout.value = null;
  }

  function delayStatusReset() {
    timeout.value = window.setTimeout(resetStatus, props.statusDuration);
  }

  async function copyText() {
    resetStatus();

    try {
      await window.navigator.clipboard.writeText(props.text);
      tooltipText.value = props.successText;
      isCopySuccess.value = true;
    } catch {
      tooltipText.value = props.errorText;
      isCopyFailed.value = true;
    } finally {
      delayStatusReset();
    }
  }
</script>

<template>
  <CTooltip
    trigger="manual"
    :show="isCopySuccess || isCopyFailed"
  >
    <template #trigger>
      <slot v-bind="{ copyText }">
        <CButton
          quaternary
          circle
          v-bind="$attrs"
          :size="size"
          @click="copyText"
        >
          <template #icon>
            <CIcon
              :is-inline="true"
              name="copy"
            />
          </template>
        </CButton>
      </slot>
    </template>

    {{ tooltipText }}
  </CTooltip>
</template>
