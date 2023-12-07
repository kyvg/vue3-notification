import { Plugin } from 'vue';
import { install } from './plugin';
export { notify, useNotification } from './notify';
export type { NotificationsOptions, NotificationsPluginOptions, NotificationItem } from './types';
import type Notifications from '@/components/Notifications.vue';

export type Notifications = typeof Notifications;

export default {
  install,
} as Plugin;
