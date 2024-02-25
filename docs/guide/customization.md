---
title: 'Customization'
---

# Customization

## Styling

Vue Notifications comes with default styling, but it's easy to replace with your own.

Specify one or more class hooks via the `classes` prop on the global component:

```vue
<notifications classes="my-notification" />
```

This will add the supplied class/classes to individual notification elements:

```html
<div class="vue-notification-wrapper">
  <div class="vue-notification-template my-notification">
    <div class="notification-title">Info</div>
    <div class="notification-content">You have been logged in</div>
  </div>
</div>
```

Then include custom css rules to style the notifications:

```scss
// style of the notification itself
.my-notification {
  /*...*/

  // style for title line
  .notification-title {
    /*...*/
  }

  // style for content
  .notification-content {
    /*...*/
  }

  // additional styling hook when using`type` parameter, i.e. this.$notify({ type: 'success', message: 'Yay!' })
  &.success {
    /*...*/
  }
  &.info {
    /*...*/
  }
  &.error {
    /*...*/
  }
}
```

Note that the default rules are:

```scss
.vue-notification {
  // styling
  margin: 0 5px 5px;
  padding: 10px;
  font-size: 12px;
  color: #ffffff;

  // default (blue)
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  // types (green, amber, red)
  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24;
  }
}
```

## Content

To completely replace notification content, use Vue's slots system:

```vue
<notifications>
  <template #body="props">
    <div class="my-notification">
      <p class="title">
        {{ props.item.title }}
      </p>
      <button class="close" @click="props.close">
        <i class="fa fa-fw fa-close"></i>
      </button>
      <div v-html="props.item.text"/>
    </div>
  </template>
</notifications>
```

The `props` object has the following members:

| Name  | Type     | Description                          |
| ----- | -------- | ------------------------------------ |
| item  | Object   | Notification object                  |
| close | Function | A function to close the notification |

<a name="velocity_animation"></a>

## Animation

Vue Notification can use the [Velocity](https://github.com/julianshapiro/velocity) library to power the animations using JavaScript.

To use, manually install `velocity-animate` & pass the library to the `vue-notification` plugin (the reason for doing that is to reduce the size of this plugin).

In your `main.js`:

```javascript
import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'
import velocity from 'velocity-animate'

const app = createApp({...})
app.use(Notifications, { velocity })
```

In the template, set the `animation-type` prop:

```vue
<notifications animation-type="velocity" />
```

The default configuration is:

```js
{
  enter: { opacity: [1, 0] },
  leave: { opacity: [0, 1] }
}
```

To assign a custom animation, use the `animation` prop:

```vue
<notifications animation-type="velocity" :animation="animation" />
```

Note that `enter` and `leave` can be an `object` or a `function` that returns an `object`:

```javascript
computed: {
  animation () {
    return {
      /**
       * Animation function
       *
       * Runs before animating, so you can take the initial height, width, color, etc
       * @param  {HTMLElement}  element  The notification element
       */
      enter (element) {
        let height = element.clientHeight
        return {
          // animates from 0px to "height"
          height: [height, 0],

          // animates from 0 to random opacity (in range between 0.5 and 1)
          opacity: [Math.random() * 0.5 + 0.5, 0]
        }
      },
      leave: {
        height: 0,
        opacity: 0
      }
    }
  }
}
```
