import { notify } from './index';

declare module 'vue' {
    export interface ComponentCustomProperties {
        $notify: typeof notify;
    }
}
