---
title: 'Usage'
---

# Usage

Trigger notifications from your `.vue` files:

```javascript
// simple
this.$notify("Hello user!");

// using options
this.$notify({
  title: "Important message",
  text: "Hello user!",
});
```

Or trigger notifications from other files, for example, your router:

::: code-group
  
```javascript [Composition API]
import { useNotification } from "@kyvg/vue3-notification";

const { notify }  = useNotification()

notify({
  title: "Authorization",
  text: "You have been logged in!",
});
```

```javascript [Options API]
import { notify } from "@kyvg/vue3-notification";

notify({
  title: "Authorization",
  text: "You have been logged in!",
});
```

:::

## Position

Position the component on the screen using the `position` prop:

```vue
<notifications position="bottom right" />
```

It requires a `string` with **two keywords** for vertical and horizontal postion.

Format: `"<vertical> <horizontal>"`.

- Horizontal options: `left`, `center`, `right`
- Vertical options: `top`, `bottom`

Default is `"top right"`.

## Width

Width can be set using a `number` or `string` with optional `%` or `px` extensions:

::: info
Value without extensions will be parsed as `px`
:::

```vue
<notifications :width="100" />
<notifications width="100" />
<notifications width="100%" />
<notifications width="100px" />
```

## Type

Set the `type` of a notification (**warn**, **error**, **success**, etc) by adding a `type` property to the call:

```js
this.$notify({ type: "success", text: "The operation completed" });
```

This will add the `type` (i.e. "success") as a CSS class name to the `.vue-notification` element.

See the [Styling](#styling) section for how to hook onto the class and style the popup.

## Groups

For different classes of notifications, i.e...

- authentication errors (top center)
- app notifications (bottom-right)

...specify the `group` attribute:

```vue
<notifications group="auth" position="top" />
<notifications group="app" position="bottom right" />
```

Trigger a notification for a specific group by specifying it in the API call:

```javascript
this.$notify({ group: "auth", text: "Wrong password, please try again" });
```

## Programatically Closing

::: code-group

```javascript [Composition API]
import { useNotification } from "@kyvg/vue3-notification"

const { notify } = useNotification()

const id = Date.now() // This can be any unique number

notify({
  id,
  text: 'This message will be removed immediately'
})

notify.close(id)
```

```javascript [Options API]

const id = Date.now() // This can be any unique number

this.$notify({
  id,
  text: 'This message will be removed immediately'
});

this.$notify.close(id);
```
:::
