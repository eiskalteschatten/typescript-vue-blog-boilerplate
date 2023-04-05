import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap';

import './bootstrapTheme';

import App from './App.vue';
import router from './router';

import './assets/global.scss';
import './assets/bootstrap.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
