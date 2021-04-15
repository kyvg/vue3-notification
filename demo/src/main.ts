import { createApp } from 'vue';
import App from './App.vue';
// @ts-expect-error
import notification from '../../dist/index.esm';
// @ts-expect-error
import velocity from 'velocity-animate';

const app = createApp(App);

app.use(notification, { velocity });

app.mount('#app');
