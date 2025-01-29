<script setup lang="ts">
  import NotificationWrapper from './NotificationWrapper.vue';
  import { useNotification } from '../../composables';

  const { notifications } = useNotification();
</script>

<template>
  <div class="c-notification-provider">
    <TransitionGroup
      class="notification-list"
      tag="div"
      name="notification-list"
    >
      <NotificationWrapper
        v-for="notification in notifications"
        :key="notification.value.id"
        :notification="notification"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
  @use '../../styles/utils' as utils;

  .c-notification-provider {
    z-index: 4000;
    pointer-events: none;
    top: 0;
    right: 0;
    height: 100vh;
    padding: utils.unit(6) utils.unit(8);
    overflow-y: auto;
    width: 400px;
    position: fixed;

    @include utils.mobile {
      padding: utils.unit(4) utils.unit(3);
      left: 0;
      width: 100%;
    }
  }

  .notification-list {
    &-move, /* apply transition to moving elements */
    &-enter-active,
    &-leave-active {
      transition: all utils.$transition-duration ease;
    }

    &-enter-from {
      opacity: 0;
      transform: translateX(50%);
      margin: 0;

      @include utils.mobile {
        transform: translateY(-50%);
      }
    }

    &-leave-to {
      opacity: 0;
      transform: translateX(50%);
      margin: 0;
    }

    /* ensure leaving items are taken out of layout flow so that moving
       animations can be calculated correctly. */
    .notification-list-leave-active:not(:only-child):not(:last-child) {
      ::v-deep(.c-notification) {
        position: absolute;
      }
    }
  }
</style>
