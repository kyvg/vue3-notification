import DefaultTheme from 'vitepress/theme'
import Demo from "../components/Demo.vue"
import Notification from "../../../dist/index.es"
import './custom.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Notification);
    app.component('Demo', Demo)
  }
}