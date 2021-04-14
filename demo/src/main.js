import { createApp, h } from 'vue'
import App from './App.vue'
import plugin from 'plugin'
import velocity from 'velocity-animate'

const app = createApp({
  render: () => h(App),
})

app.use(plugin(), {
  velocity,
  /*
  name: 'foo'
  */
})

app.mount('#app')
