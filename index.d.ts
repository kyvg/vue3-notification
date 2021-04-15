import VueNotification, { NotificationOptions, NotificationPluginOptions, notify } from './src/index';

export {
  NotificationOptions,
  NotificationPluginOptions,
  notify,
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $notify: typeof notify;
  }
}

export default VueNotification;
