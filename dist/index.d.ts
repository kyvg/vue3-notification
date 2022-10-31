import { Plugin as Plugin_2 } from 'vue';

declare const _default: Plugin_2;
export default _default;

export declare interface NotificationsOptions {
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

export declare interface NotificationsPluginOptions {
    name?: string;
    componentName?: string;
    velocity?: any;
}

export declare const notify: {
    (args: NotificationsOptions | string): void;
    close(id: unknown): void;
};

export declare const useNotification: () => {
    notify: {
        (args: NotificationsOptions | string): void;
        close(id: unknown): void;
    };
};

export { }
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $notify: typeof notify;
  }
}
