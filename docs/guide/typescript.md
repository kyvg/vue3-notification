---
title: 'TypeScript Support'
---
# TypeScript Support

This library is written with TypeScript. Since the notification component is registered globally, you need to register its types.

You can do this manually:
```ts
import type { FunctionalComponent } from 'vue';
import type { Notifications } from '@kyvg/vue3-notification';
declare module 'vue' {
  export interface GlobalComponents {
    Notifications: FunctionalComponent<Notifications>;
  }
}
```
Or, you can use built-in `unplugin-vue-components` resolver. This resolver allows you to seamlessly integrate this library with Vue projects using [`unplugin-vue-components`](https://github.com/unplugin/unplugin-vue-components). It automates the import of components, making your development process more efficient.

## Installation
To get started, install the necessary packages using npm or yarn:
```bash
npm install --save @kyvg/vue3-notification unplugin-vue-components
# or
yarn add @kyvg/vue3-notification unplugin-vue-components
```
## Configuration
To configure the resolver, update your Vue project's plugin settings. For example, in a Vite project, modify vite.config.js:
```js
import Components from 'unplugin-vue-components/vite';
import NotificationsResolver from '@kyvg/vue3-notification/auto-import-resolver';

export default {
  plugins: [
    Components({
      resolvers: [NotificationsResolver()],
    }),
  ],
}
```
Specify the custom component's name if you have configured it:
```js
// main.js
app.use(Notifications, { componentName: "Alert" });
```
::: warning
Note that component name should be in PascalCase
:::
```js
import Components from 'unplugin-vue-components/vite';
import NotificationsResolver from '@kyvg/vue3-notification/auto-import-resolver';

export default {
  plugins: [
    Components({
      resolvers: [NotificationsResolver("Alert")],
    }),
  ],
}
```
