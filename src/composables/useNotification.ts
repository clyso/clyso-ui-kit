import { type Ref, ref } from 'vue';
import type { NotificationConfig, NotificationItem } from '../types';

function* getNotificationIdGenerator(): Generator<string, string> {
  let id = 1;

  while (true) {
    yield String(id);
    id++;
  }
}

const notificationIdGenerator = getNotificationIdGenerator();

function generateId() {
  return notificationIdGenerator.next().value;
}

export function configureNotifications() {
  const notifications = ref<Ref<NotificationItem>[]>([]);

  function createNotification(
    config: NotificationConfig,
  ): Ref<NotificationItem> {
    const notificationRef = ref<NotificationItem>({
      id: generateId(),
      ...config,
    });

    notifications.value.unshift(notificationRef);

    return notificationRef;
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(
      (notificationRef) => notificationRef.value.id === id,
    );

    if (index === -1) {
      return;
    }

    notifications.value.splice(index, 1);
  }

  return () => ({
    notifications,
    createNotification,
    removeNotification,
  });
}

const useNotification = configureNotifications();

export default useNotification;
