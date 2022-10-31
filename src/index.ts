import { Plugin } from 'vue';
import { install } from './plugin';
export { notify, useNotification } from './notify';
export { NotificationsOptions, NotificationsPluginOptions } from './types';

export default {
  install,
} as Plugin;
