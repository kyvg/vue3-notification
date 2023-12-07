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

declare const _default_2: DefineComponent<    {
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
click: (item: NotificationItem_2) => boolean;
destroy: (item: NotificationItem_2) => boolean;
start: (item: NotificationItem_2) => boolean;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<    {
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
onClick?: ((item: NotificationItem_2) => any) | undefined;
onDestroy?: ((item: NotificationItem_2) => any) | undefined;
onStart?: ((item: NotificationItem_2) => any) | undefined;
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

export declare type NotificationItem = Pick<NotificationsOptions, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
    length: number;
};

declare type NotificationItem_2 = Pick<NotificationsOptions_2, 'id' | 'title' | 'text' | 'type' | 'speed' | 'data'> & {
    length: number;
}

export declare type Notifications = typeof _default_2;

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

declare interface NotificationsOptions_2 {
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
