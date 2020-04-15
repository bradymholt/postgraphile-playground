import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Contacts from "../views/Contacts.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "home",
    component: Contacts,
    beforeEnter: (to, from, next) => {
      // Authenticate
      if (!localStorage.getItem("jwt")) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
