---
title: API Reference
---

<h2> API Reference </h2>

The majority of settings for the Notifications component are configured using props:

```vue
<notifications
  position="bottom right" 
  classes="my-custom-class"
  :width="200"
/>
```

### Props

::: tip
Note that all props are optional.
:::

| Name             | Type          | Default            | Description                                                                                                             |
| ---------------- | ------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| position                | String/Array  | 'top right'        | Part of the screen where notifications will pop out                                                                     |
| width                   | Number/String | 300                | Width of notification holder, can be `%`, `px` string or number.<br>Valid values: '100%', '200px', 200                  |
| classes                 | String/Array  | 'vue-notification' | List of classes that will be applied to notification element                                                            |
| group                   | String        | null               | Name of the notification holder, if specified                                                                           |
| duration                | Number        | 3000               | Time (in ms) to keep the notification on screen (if **negative** - notification will stay **forever** or until clicked) |
| speed                   | Number        | 300                | Time (in ms) to show / hide notifications                                                                               |
| animation-type          | String        | 'css'              | Type of animation, currently supported types are `css` and `velocity`                                                   |
| animation-name          | String        | null               | Animation name required for `css` animation                                                                             |
| animation               | Object        | Custom             | Animation configuration for Velocity animation                                                           |
| max                     | Number        | Infinity           | Maximum number of notifications that can be shown in notification holder                                                |
| reverse                 | Boolean       | false              | Show notifications in reverse order                                                                                     |
| ignoreDuplicates        | Boolean       | false              | Ignore repeated instances of the same notification                                                                      |
| closeOnClick            | Boolean       | true               | Close notification when clicked                                                                                         |
| pauseOnHover            | Boolean       | false              | Keep the notification open while mouse hovers on notification                                                           |
| dangerouslySetInnerHtml | Boolean       | false              | Use [v-html](https://vuejs.org/api/built-in-directives.html#v-html) to set `title` and `text` |

### Events
| Name             | Type                             | Description                                  |
| ---------------- | -------------------------------- | -------------------------------------------- |
| click            | (item: NotificationItem) => void | The callback function that is triggered when notification was clicked
| destroy          | (item: NotificationItem) => void | The callback function that is triggered when notification was destroyes
| start            | (item: NotificationItem) => void | The callback function that is triggered when notification was appeared

### Plugin options

Configure the plugin itself using an additional options object:

```js
app.use(Notifications, { name: "alert" });
```

::: warning
Setting `componentName` can cause issues when using SSR.
:::

All options are optional:

| Name          | Type   | Default        | Description                                                                   |
| ------------- | ------ |----------------|-------------------------------------------------------------------------------|
| name          | String | notify         | Defines the instance name. It's prefixed with the dollar sign. E.g. `this.$notify` |
| componentName | String | Notifications  | The component's name                                                          |