
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

export interface NotificationPluginOptions {
  name?: string;
  componentName?: string;
  velocity?: any;
}

export type NotificationItem = Pick<NotificationOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
  length: number;
}
