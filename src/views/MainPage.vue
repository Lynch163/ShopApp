<template>
  <hr />
  <div class="main-picture-wrap">
    <img src="../assets/images/main-background.jpg" alt="main-picture" />
  </div>

  <ul class="products-list" v-if="products.length">
    <li v-for="item in products" :key="item.id" class="product-item">
      <div class="product-image-wrap">
        <img
          :src="item.image"
          alt="image-of-product"
          class="product-item__image"
        />
      </div>
      <button @click="addToFavorite(item)" type="button" class="add-button" />
      <router-link :to="'/card-product/' + item.id">
        <div class="product-text-block-wrap">
          <p class="product-item__description">{{ item.title }}</p>
          <span class="product-item__cost">{{ item.price }}$</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "MainPage",
  data() {
    return {
      /**Данные с сервера - (localStorage) */
      products: [],
    };
  },
  methods: {
    /**Запрашиваем данные с сервера */
    async loadData() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        return response.json();
      } catch (error) {
        console.error(error);
      }
    },

    addToFavorite(item) {
      const favoriteProductsFromLocalStorage = JSON.parse(
        localStorage.getItem("favoriteProducts")
      );
      item.id = uuidv4();
      favoriteProductsFromLocalStorage.push(item);
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProductsFromLocalStorage)
      );
      this.emitter.emit(
        "increaseCounter",
        favoriteProductsFromLocalStorage.length
      );
    },
  },
  async mounted() {
    if (!localStorage.favoriteProducts) {
      localStorage.setItem("favoriteProducts", JSON.stringify([]));
    }

    if (localStorage.products) {
      this.products = JSON.parse(localStorage.getItem("products"));
      return;
    }

    const products = await this.loadData();

    if (products.length) {
      localStorage.setItem("products", JSON.stringify(products));
      this.products = products;
    }
  },
};
</script>
