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

h1 {
  color: red;
}

.card-item {
  display: flex;
  justify-content: center;
  margin-bottom: 112px;
}

.card-image-wrap {
  max-width: 680px;
  max-height: 715px;
  margin-right: 40px;
}

.card-image-wrap img {
  height: 100%;
}

.card-description-wrap {
  max-width: 560px;
}

.card-description-title {
  font-weight: 500;
  font-size: 40px;
  color: #0a1e32;
  margin-bottom: 24px;
}

.card-description-text {
  font-size: 16px;
  line-height: 24px;
  color: #464c58;
  margin-bottom: 24px;
}

.card-description-price {
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 24px;
}

.card-button {
  display: flex;
  align-items: center;
  padding: 8px 35px 8px 65px;
  font-weight: 700;
  font-size: 16px;
  border: 1px dashed #0a1e32;
  border-radius: 4px;
  background: url(../assets/images/svg/empty-hearth.svg) no-repeat 15% 50%;
}

.card-button:hover {
  background: url(../assets/images/svg/hover-darkblue-hearth.svg) no-repeat 15%
    50%;
}

.card-button img {
  width: 20px;
  height: 18px;
  margin-right: 8px;
}
</style>
