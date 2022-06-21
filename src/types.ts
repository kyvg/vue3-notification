
export interface NotificationsOptions {
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
  closeOnClick?: boolean;
}
export interface NotificationsPluginOptions {
  name?: string;
  componentName?: string;
  velocity?: any;
}

export type NotificationItem = Pick<NotificationsOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
  length: number;
}
