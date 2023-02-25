<template>
  <hr />
  <section class="card-item">
    <template v-if="getProductData">
      <div class="card-image-wrap">
        <img :src="getProductData.image" alt="card-image" />
      </div>
      <div class="card-description-wrap">
        <h1 class="card-description-title">{{ getProductData.title }}</h1>
        <p class="card-description-text">{{ getProductData.description }}</p>
        <p class="card-description-price">{{ getProductData.price }}$</p>

        <button
          @click="addToFavorite"
          :disabled="isDisable"
          class="card-button"
        >
          Избранное
        </button>
      </div>
    </template>

    <div v-else>Нет данных о товаре</div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "CardProduct",
  data() {
    return {
      /** Признак активности кнопки */
      isDisable: false,
    };
  },

  computed: {
    /** Возвращает данные товара */
    getProductData() {
      const cards = JSON.parse(localStorage.getItem("products"));

      const product = cards.find(
        (item) => item.id === Number(this.$route.params.id)
      );
      return product || null;
    },
  },

  methods: {
    /**Добавляет товар в избранное */
    addToFavorite() {
      const favoriteProductsFromLocalStorage = JSON.parse(
        localStorage.getItem("favoriteProducts")
      );

      this.getProductData.id = uuidv4();
      favoriteProductsFromLocalStorage.push(this.getProductData);
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProductsFromLocalStorage)
      );
      this.isDisable = !this.isDisable;
      this.emitter.emit(
        "increaseCounter",
        favoriteProductsFromLocalStorage.length
      );
    },
  },
};
</script>

<style scoped>
hr {
  margin-bottom: 80px;
}
</style>
