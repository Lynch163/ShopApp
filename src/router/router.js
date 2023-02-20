import { createRouter, createWebHistory } from "vue-router";

import MainPage from "@/views/MainPage.vue";
import CardProduct from "@/views/CardProduct.vue";
import FavoriteProduct from "@/views/FavoriteProduct.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainPage,
    },
    { path: "/card-product/:id", name: "card", component: CardProduct },
    {
      path: "/my-favorite-product",
      name: "favorite",
      component: FavoriteProduct,
    },

    { path: "/:notFound(.*)", component: MainPage },
  ],
});

export default router;
