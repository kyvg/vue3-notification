export interface NotificationOptions {
  title?: string;
  text?: string;
  type?: string;
  group?: string;
  duration?: number;
  speed?: number;
  data?: object;
  clean?: boolean;
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $notify: (data: NotificationOptions) => void;
  }
}

export default VueNotification;
