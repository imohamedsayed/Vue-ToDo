import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Landing from "../views/Landing.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    name: "landing",
    component: Landing,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
