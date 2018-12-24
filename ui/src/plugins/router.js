import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import NoteBook from '../corse/NoteBook'
import Login from '../corse/Login';
import Registration from '../corse/Registration';

const routes = [
  {
    path: '/',
    name: 'notebook',
    component: NoteBook
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  { path: '*', redirect: '/' }
];

export const router = new VueRouter({
  routes
});
