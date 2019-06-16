import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import NoteBook from "../corse/NoteBook";
import Login from "../corse/Login";
import Equation from "../components/patterns/Equation";
import MemoryGame from "../components/memory-game/MemorGame";
import ContentEditable from "../components/ContentEditable.vue";

const routes = [
  {
    path: "/",
    name: "notebook",
    component: NoteBook,
    children: [
      {
        path: '/',
        component: ContentEditable
      },
      {
        path: "/patterns",
        component: Equation
      },
      {
        path: "/memorygame",
        component: MemoryGame
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  { path: "*", redirect: "/" }
];

export const router = new VueRouter({
  routes
});
