<script setup lang="ts">
  import { h, type Ref } from 'vue';
  import useNotification from '../../composables/useNotification';
  import type { NotificationItem } from '../../types';
  import NotificationToast from './NotificationToast.vue';

  const { removeNotification } = useNotification();

  const props = defineProps<{
    notification: Ref<NotificationItem>;
  }>();

  const Notification = () =>
    h(
      NotificationToast,
      {
        type: props.notification.value.type,
        iconName: props.notification.value.iconName,
        hasIcon: props.notification.value.hasIcon,
        hasPositive: props.notification.value.hasPositive,
        hasNegative: props.notification.value.hasNegative,
        isClosable: props.notification.value.isClosable,
        isAliveOnHover: props.notification.value.isAliveOnHover,
        isDurationProgressShown:
          props.notification.value.isDurationProgressShown,
        duration: props.notification.value.duration,
        onPositiveClick: () => {
          props.notification.value.positiveHandler?.();
        },
        onNegativeClick: () => {
          props.notification.value.negativeHandler?.();
        },
        onClose: () => {
          removeNotification(props.notification.value.id);
        },
      },
      {
        title: props.notification.value.title
          ? () => {
              if (typeof props.notification.value.title === 'string') {
                return props.notification.value.title;
              }

              return props.notification.value.title?.();
            }
          : undefined,
        default: props.notification.value.content
          ? () => {
              if (typeof props.notification.value.content === 'string') {
                return props.notification.value.content;
              }

              return props.notification.value.content?.();
            }
          : undefined,
        'positive-text': props.notification.value.positiveText
          ? () => props.notification.value.positiveText
          : undefined,
        'negative-text': props.notification.value.negativeText
          ? () => props.notification.value.negativeText
          : undefined,
      },
    );
</script>

<template>
  <div class="c-notification-wrapper">
    <Notification />
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-notification-wrapper {
    position: relative;
    margin-bottom: utils.unit(3);

    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
