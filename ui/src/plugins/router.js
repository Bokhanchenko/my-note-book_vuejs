import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import NoteBook from '../corse/NoteBook'
import Login from '../corse/Login';

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
  { path: '*', redirect: '/' }
];

export const router = new VueRouter({
  routes
});
