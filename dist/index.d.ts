import { AllowedComponentProps } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { PropType } from 'vue';
import { VNodeProps } from 'vue';

declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;

declare type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

declare const _default: Plugin_2;
export default _default;

export declare type NotificationItem = Pick<NotificationsOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
    length: number;
};

declare type NotificationItemExtended = NotificationItemWithTimer & {
    state: NotificationItemState[keyof NotificationItemState];
};

declare type NotificationItemState = typeof STATE;

declare type NotificationItemWithTimer = NotificationItem & {
    timer?: number;
};

export declare const Notifications: __VLS_WithTemplateSlots<DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    group?: string | undefined;
    width?: string | number | undefined;
    reverse?: boolean | undefined;
    position?: string | string[] | undefined;
    classes?: string | undefined;
    animationType?: "css" | "velocity" | undefined;
    animation?: Record<"enter" | "leave", unknown> | undefined;
    animationName?: string | undefined;
    speed?: number | undefined;
    duration?: number | undefined;
    delay?: number | undefined;
    max?: number | undefined;
    ignoreDuplicates?: boolean | undefined;
    closeOnClick?: boolean | undefined;
    pauseOnHover?: boolean | undefined;
    dangerouslySetInnerHtml?: boolean | undefined;
}>, {
    group: string;
    width: number;
    reverse: boolean;
    position: string[];
    classes: string;
    animationType: string;
    animation: {
        enter: (el: Element) => {
            height: number[];
            opacity: number[];
        };
        leave: {
            height: number;
            opacity: number[];
        };
    };
    animationName: string;
    speed: number;
    duration: number;
    delay: number;
    max: number;
    ignoreDuplicates: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    dangerouslySetInnerHtml: boolean;
}>, {}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    click: (item: NotificationItem) => void;
    destroy: (item: NotificationItem) => void;
    start: (item: NotificationItem) => void;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    group?: string | undefined;
    width?: string | number | undefined;
    reverse?: boolean | undefined;
    position?: string | string[] | undefined;
    classes?: string | undefined;
    animationType?: "css" | "velocity" | undefined;
    animation?: Record<"enter" | "leave", unknown> | undefined;
    animationName?: string | undefined;
    speed?: number | undefined;
    duration?: number | undefined;
    delay?: number | undefined;
    max?: number | undefined;
    ignoreDuplicates?: boolean | undefined;
    closeOnClick?: boolean | undefined;
    pauseOnHover?: boolean | undefined;
    dangerouslySetInnerHtml?: boolean | undefined;
}>, {
    group: string;
    width: number;
    reverse: boolean;
    position: string[];
    classes: string;
    animationType: string;
    animation: {
        enter: (el: Element) => {
            height: number[];
            opacity: number[];
        };
        leave: {
            height: number;
            opacity: number[];
        };
    };
    animationName: string;
    speed: number;
    duration: number;
    delay: number;
    max: number;
    ignoreDuplicates: boolean;
    closeOnClick: boolean;
    pauseOnHover: boolean;
    dangerouslySetInnerHtml: boolean;
}>>> & {
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
}, {}>, {
    body?(_: {
        class: (string | undefined)[];
        item: NotificationItemExtended;
        close: () => void;
    }): any;
}>;

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

declare const STATE: {
    readonly IDLE: 0;
    readonly DESTROYED: 2;
};

export declare const useNotification: () => {
    notify: {
        (args: NotificationsOptions | string): void;
        close(id: unknown): void;
    };
};

export { }
