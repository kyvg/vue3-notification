import { defineClientConfig } from "@vuepress/client"
import Demo from "../.vuepress/components/Demo.vue"
import Notification from "../../dist/index.es"

export default defineClientConfig({
  enhance(context) {
    context.app.use(Notification);
    context.app.component('Demo', Demo)
  },
})