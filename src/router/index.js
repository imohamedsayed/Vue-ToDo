import { createRouter, createWebHistory } from "vue-router";
import Landing from "../views/Landing.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Profile from "../views/Profile.vue";
import School from "../views/School.vue";
import Personal from "../views/Personal.vue";
import Design from "../views/Design.vue";
import Groceries from "../views/Groceries.vue";
import Dashboard from "../views/Dashborad.vue";
import Collections from "../views/Collections.vue";
const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
    meta: {
      title: "Landing",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      title: "Sign Up",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/school",
    name: "school",
    component: School,
    meta: {
      title: "School Tasks",
    },
  },
  {
    path: "/personal",
    name: "personal",
    component: Personal,
    meta: {
      title: "Personal Tasks",
    },
  },
  {
    path: "/design",
    name: "design",
    component: Design,
    meta: {
      title: "Design Tasks",
    },
  },
  {
    path: "/groceries",
    name: "groceries",
    component: Groceries,
    meta: {
      title: "Groceries Tasks",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/collections",
    name: "collections",
    component: Collections,
    meta: {
      title: "Collections",
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ToDo App`;
  next();
});
export default router;
