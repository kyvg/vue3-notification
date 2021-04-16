import { App } from 'vue';

declare const _default: {
    install: (app: App, args?: NotificationPluginOptions) => void;
};
export default _default;

declare interface NotificationOptions_2 {
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
export { NotificationOptions_2 as NotificationOptions }

export declare interface NotificationPluginOptions {
    name?: string;
    componentName?: string;
    velocity?: any;
}

export declare const notify: {
    (args: NotificationOptions_2 | string): void;
    close(id: unknown): void;
};

export { }
}
