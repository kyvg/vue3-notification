import { createApp } from 'vue';
import App from './App.vue';
import notification from '../../src';
// @ts-expect-error
import velocity from 'velocity-animate';

const app = createApp(App);

app.use(notification, { velocity });

app.mount('#app');
