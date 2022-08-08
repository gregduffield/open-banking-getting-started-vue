import accountsVue from '@/views/accounts/accounts.vue';
import connectVue from '@/views/connect/connect.vue';
import StartVue from '@/views/Start/Start.vue';
import transactionsVue from '@/views/transactions/transactions.vue';
import ConnectionSuccessVue from '@/views/connection-success.vue';
import ConnectionFailureVue from '@/views/connection-failure.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
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
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: transactionsVue
  },
  {
    path: '/refresh/success',
    name: 'ConnectionSuccess',
    component: ConnectionSuccessVue
  },
  {
    path: '/refresh/failure',
    name: 'ConnectionFailure',
    component: ConnectionFailureVue
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
