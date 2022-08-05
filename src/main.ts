import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

declare global {
  interface Window {
    CertuaEventBus: any;
  }
}

const myApp = createApp(App).use(store).use(router);
myApp.config.compilerOptions.isCustomElement = (tag: string) =>
  tag.startsWith('certua');
myApp.mount('#app');
