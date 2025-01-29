<script setup lang="ts" generic="T extends FileUploadItem">
  import { computed } from 'vue';
  import CButton from '../CButton/CButton.vue';
  import CIcon from '../CIcon/CIcon.vue';
  import CProgress from '../CProgress/CProgress.vue';
  import CSpin from '../CSpin/CSpin.vue';
  import { type FileUploadItem, FileUploadStatus } from '../../types';
  import { GeneralHelper } from '../../helpers';

  const props = withDefaults(
    defineProps<{
      /**
       * The file upload item to display.
       */
      item: T;
      /**
       * Whether to display the retry button (displayed when error state, default is true).
       */
      hasRetry?: boolean;
      /**
       * Whether to display the delete button (displayed when success, default is true).
       */
      hasDelete?: boolean;
      /**
       * Whether to display the cancel button (displayed during upload, default is true).
       */
      hasCancel?: boolean;
    }>(),
    {
      hasRetry: true,
      hasDelete: true,
      hasCancel: true,
    },
  );

  const emit = defineEmits<{
    /**
     * Emitted when the delete button is clicked.
     */
    (e: 'delete'): void;
    /**
     * Emitted when the cancel button is clicked.
     */
    (e: 'cancel'): void;
    /**
     * Emitted when the retry button is clicked.
     */
    (e: 'retry'): void;
  }>();

  const itemSize = computed<string | null>(() =>
    props.item.size ? GeneralHelper.formatBytes(props.item.size) : null,
  );

  const isDefault = computed(
    () => props.item.status === FileUploadStatus.DEFAULT,
  );
  const isPending = computed(
    () => props.item.status === FileUploadStatus.PENDING,
  );
  const isError = computed(() => props.item.status === FileUploadStatus.ERROR);
  const isSuccess = computed(
    () => props.item.status === FileUploadStatus.SUCCESS,
  );
  const isUploading = computed(
    () => props.item.status === FileUploadStatus.UPLOADING,
  );
  const isDeleting = computed(
    () => props.item.status === FileUploadStatus.DELETING,
  );

  const hasRetryButton = computed(() => props.hasRetry && isError.value);
  const hasCancelButton = computed(() => props.hasCancel && isUploading.value);
  const hasDeleteButton = computed(
    () =>
      props.hasDelete &&
      (isDefault.value ||
        isPending.value ||
        isDeleting.value ||
        isError.value ||
        isSuccess.value),
  );

  const hasProgress = computed(
    () => isError.value || isSuccess.value || isUploading.value,
  );
  const progressStatus = computed(() => {
    if (isSuccess.value) {
      return 'success';
    }

    if (isError.value) {
      return 'error';
    }

    return 'info';
  });
  const progressPercentage = computed(() =>
    isSuccess.value || isError.value ? 100 : props.item.uploadProgress,
  );
  const name = computed(() => props.item.name);
</script>

<template>
  <div class="c-upload-item">
    <div class="c-upload-item__top">
      <CIcon
        class="c-upload-item__icon"
        name="document"
      />

      <span class="c-upload-item__name">
        {{ name }}
      </span>

      <div class="c-upload-item__actions">
        <CButton
          v-if="hasRetryButton"
          secondary
          type="warning"
          size="tiny"
          class="action-button action-button--retry"
          @click="emit('retry')"
        >
          <template #icon>
            <CIcon
              :is-inline="true"
              name="refresh"
            />
          </template>
        </CButton>

        <CButton
          v-if="hasDeleteButton"
          secondary
          type="error"
          size="tiny"
          class="action-button action-button--delete"
          :loading="isDeleting"
          @click="emit('delete')"
        >
          <template #icon>
            <CIcon
              :is-inline="true"
              name="trash"
            />
          </template>
        </CButton>

        <CButton
          v-if="hasCancelButton"
          secondary
          type="error"
          size="tiny"
          class="action-button action-button--cancel"
          @click="emit('cancel')"
        >
          <template #icon>
            <CIcon
              :is-inline="true"
              name="close"
            />
          </template>
        </CButton>
      </div>
    </div>

    <div class="c-upload-item__bottom">
      <span class="c-upload-item__size">
        {{ itemSize }}
      </span>

      <div class="upload-status">
        <div
          v-if="isPending"
          class="upload-status__item upload-status__item--pending"
        >
          <CSpin
            :size="12"
            class="upload-status__icon upload-status__icon--pending"
          />
          <slot name="pending-text">Pending</slot>
        </div>
        <span
          v-else-if="isUploading"
          class="upload-status__item upload-status__item--percentage"
        >
          {{ progressPercentage }}%
        </span>
        <div
          v-else-if="isError"
          class="upload-status__item upload-status__item--error"
        >
          <CIcon
            class="upload-status__icon upload-status__icon--error"
            name="close-circle"
            :is-inline="true"
          />
          <slot name="error-text">Upload failed</slot>
        </div>
        <div
          v-else-if="isSuccess"
          class="upload-status__item upload-status__item--success"
        >
          <CIcon
            class="upload-status__icon upload-status__icon--success"
            name="checkmark-circle"
            :is-inline="true"
          />
          <slot name="success-text">Uploaded</slot>
        </div>
      </div>
    </div>

    <CProgress
      v-if="hasProgress"
      class="c-upload-item__progress"
      :status="progressStatus"
      :percentage="progressPercentage"
      :show-indicator="false"
      :height="2"
      :processing="isUploading"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-upload-item {
    position: relative;
    padding: utils.unit(2);
    border-radius: utils.$border-radius;
    overflow: hidden;
    border: 1px solid var(--border-color);

    &__top {
      display: flex;
      gap: utils.unit(3);
      align-items: center;
      margin-bottom: utils.unit(1);
    }

    &__icon {
      color: var(--text-color-3);
      flex-shrink: 0;
      width: 24px;
      height: 24px;
    }

    &__name {
      font-weight: utils.$font-weight-medium;
      @include utils.ellipsis;
    }

    &__actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: utils.unit(2);
    }

    &__pending-spin {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }

    &__bottom {
      padding-left: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 20px;
    }

    &__size {
      @include utils.apply-styles(utils.$text-caption);
      color: var(--text-color-3);
    }

    &__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
    }

    ::v-deep(.c-spin-body) {
      display: block;
    }
  }

  .upload-status {
    @include utils.apply-styles(utils.$text-caption);
    color: var(--text-color-3);

    &__item {
      display: flex;
      gap: utils.unit(1);
      align-items: center;
    }

    &__icon {
      width: 16px;
      height: 16px;

      &--error {
        color: var(--error-color);
      }

      &--success {
        color: var(--success-color);
      }
    }
  }
</style>
