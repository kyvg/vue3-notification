import { AllowedComponentProps } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import type { Plugin as Plugin_2 } from 'vue';
import { PropType } from 'vue';
import { VNodeProps } from 'vue';

declare const _default: Plugin_2;
export default _default;

export declare type NotificationItem = Pick<NotificationsOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
    length: number;
};

export declare const Notifications: DefineComponent<{
    group: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: PropType<string | string[]>;
        default: () => string[];
    };
    classes: {
        type: StringConstructor;
        default: string;
    };
    animationType: {
        type: PropType<"css" | "velocity">;
        default: string;
        validator(value: unknown): boolean;
    };
    animation: {
        type: PropType<Record<"enter" | "leave", unknown>>;
        default(): {
            enter: (el: Element) => {
                height: number[];
                opacity: number[];
            };
            leave: {
                height: number;
                opacity: number[];
            };
        };
    };
    animationName: {
        type: StringConstructor;
        default: string;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    ignoreDuplicates: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    pauseOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    dangerouslySetInnerHtml: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    click: (item: NotificationItem) => boolean;
    destroy: (item: NotificationItem) => boolean;
    start: (item: NotificationItem) => boolean;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    group: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: PropType<string | string[]>;
        default: () => string[];
    };
    classes: {
        type: StringConstructor;
        default: string;
    };
    animationType: {
        type: PropType<"css" | "velocity">;
        default: string;
        validator(value: unknown): boolean;
    };
    animation: {
        type: PropType<Record<"enter" | "leave", unknown>>;
        default(): {
            enter: (el: Element) => {
                height: number[];
                opacity: number[];
            };
            leave: {
                height: number;
                opacity: number[];
            };
        };
    };
    animationName: {
        type: StringConstructor;
        default: string;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    ignoreDuplicates: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    pauseOnHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    dangerouslySetInnerHtml: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: ((item: NotificationItem) => any) | undefined;
    onDestroy?: ((item: NotificationItem) => any) | undefined;
    onStart?: ((item: NotificationItem) => any) | undefined;
}, {
    speed: number;
    group: string;
    duration: number;
    ignoreDuplicates: boolean;
    closeOnClick: boolean;
    reverse: boolean;
    width: string | number;
    position: string | string[];
    classes: string;
    animationType: "css" | "velocity";
    animation: Record<"enter" | "leave", unknown>;
    animationName: string;
    delay: number;
    max: number;
    pauseOnHover: boolean;
    dangerouslySetInnerHtml: boolean;
}, {}>;

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
