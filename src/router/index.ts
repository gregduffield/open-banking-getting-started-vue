import accountsVue from '@/views/accounts/accounts.vue';
import connectVue from '@/views/connect/connect.vue';
import StartVue from '@/views/Start/Start.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: StartVue
  },
  {
    path: '/start',
    name: 'Start',
    component: StartVue
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: accountsVue
  },
  {
    path: '/connect',
    name: 'Connect',
    component: connectVue
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
