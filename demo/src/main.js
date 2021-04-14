import { createApp } from 'vue'
import App from './App.vue'
import notification from '../../dist/index.esm'
import velocity from 'velocity-animate'

const app = createApp(App)

app.use(notification, { velocity })

app.mount('#app')
