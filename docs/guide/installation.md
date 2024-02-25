---
aside: false
title: 'Installation'
---

# Installation

- **Step 1**: Install `@kyvg/vue3-notification` locally
::: code-group

```bash [npm]
npm install --save @kyvg/vue3-notification
```

```bash [yarn]
yarn add @kyvg/vue3-notification
```

:::

- **Step 2**: Add dependencies to your `main.js`:

```javascript
import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'

const app = createApp()
app.use(Notifications)
```

- **Step 3**: Add the global component to your `App.vue`:

```vue
<template>
  <!-- your code -->

  <notifications />
</template>
```
