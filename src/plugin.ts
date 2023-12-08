
import type { App } from 'vue';
import Notifications from '@/components/Notifications';
import { params } from '@/params';
import type { NotificationsPluginOptions } from '@/types';
import { notify } from '@/notify';
import { COMPONENT_NAME } from '@/constants';

export function install(app: App, args: NotificationsPluginOptions = {}): void {
  Object.entries(args).forEach((entry) => params.set(...entry));
  const name = args.name || 'notify';

  app.config.globalProperties['$' + name] = notify;
  app.component(args.componentName || COMPONENT_NAME, Notifications);
}
