import Notifications from './Notifications.vue';
import { events } from './events';
import { params } from './params';
import { App } from 'vue';

export interface NotificationOptions {
  id?: number;
  title?: string;
  text?: string;
  type?: string;
  group?: string;
  duration?: number;
  speed?: number;
  data?: unknown;
  clean?: boolean;
  clear?: boolean;
  ignoreDuplicates?: boolean;
}

export type NotificationItem = Pick<NotificationOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
  length: number;
}

export interface NotificationPluginOptions {
  name?: string;
  componentName?: string;
  velocity?: any;
}

export const notify = (args: NotificationOptions | string): void => {
  if (typeof args === 'string') {
    args = { title: '', text: args };
  }

  if (typeof args === 'object') {
    events.emit('add', args);
  }
};

notify.close = function(id: unknown) {
  events.emit('close', id);
};

export default {
  install: (app: App, args: NotificationPluginOptions = {}): void => {
    Object.entries(args).forEach((entry) => params.set(...entry));

    const name = args.name || 'notify';

    app.config.globalProperties['$' + name] = notify;

    app.component(args.componentName || 'notifications', Notifications);
  },
};
