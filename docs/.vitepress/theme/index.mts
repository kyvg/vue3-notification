import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Demo from "../../components/Demo.vue"
import Notification from "../../../dist/index.es"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Notification);
    app.component('Demo', Demo)
  }
} satisfies Theme