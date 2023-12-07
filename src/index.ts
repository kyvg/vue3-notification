import { Plugin } from 'vue';
import { install } from './plugin';
export { notify, useNotification } from './notify';
export type { NotificationsOptions, NotificationsPluginOptions, NotificationItem } from './types';
import Notifications from '@/components/Notifications.vue';
export { Notifications };
export type Notifications = typeof Notifications

export default {
  install,
} as Plugin;
