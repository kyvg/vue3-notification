import { Plugin } from 'vue';
import { install } from './plugin';
export { notify, useNotification } from './notify';
export type { NotificationsOptions, NotificationsPluginOptions, NotificationItem } from './types';

export default {
  install,
} as Plugin;
