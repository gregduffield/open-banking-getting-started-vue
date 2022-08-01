import accountsVue from '@/views/accounts/accounts.vue';
import institutionSelectionVue from '@/views/institution-selection/institution-selection.vue';
import StartVue from '@/views/Start/Start.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: StartVue,
  },
  {
    path: '/start',
    name: 'Start',
    component: StartVue,
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: accountsVue,
  },
  {
    path: '/connect',
    name: 'Connect',
    component: institutionSelectionVue,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
