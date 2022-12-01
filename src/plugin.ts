
import { App } from 'vue';
import Notifications from './Notifications.vue';
import { params } from './params';
import { NotificationsPluginOptions } from './types';
import { notify } from './notify';

export function install(app: App, args: NotificationsPluginOptions = {}): void {
  Object.entries(args).forEach((entry) => params.set(...entry));
  const name = args.name || 'notify';

  app.config.globalProperties['$' + name] = notify;
  app.component(args.componentName || 'Notifications', Notifications);
}
