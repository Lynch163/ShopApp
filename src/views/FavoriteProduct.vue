<template>
  <hr />
  <h2 class="favorite-title">Избранное</h2>
  <ul v-if="isHaveProducts" class="products-list">
    <li
      v-for="(favorite, index) in favoriteProducts"
      :key="index"
      class="product-item"
    >
      <div class="product-image-wrap">
        <img
          :src="favorite.image"
          alt="image-of-product"
          class="product-item__image"
        />
        <button
          @click="deleteItem(favorite)"
          type="button"
          class="delete-button"
        ></button>
      </div>
      <div class="product-text-block-wrap">
        <p class="product-item__description">{{ favorite.title }}</p>
        <span class="product-item__cost">{{ favorite.price }}$</span>
      </div>
    </li>
  </ul>
  <p v-else class="favorite-empty">Список избранного пуст</p>
</template>

<script>
export default {
  name: "FavoriteProduct",
  data() {
    return {
      favoriteProducts: [],
    };
  },
  methods: {
    /** Удаляет карточку из избранного */
    deleteItem(item) {
      const favoriteProducts = JSON.parse(
        localStorage.getItem("favoriteProducts")
      );

      const changedFavoriteProducts = favoriteProducts.filter(
        (favoriteItem) => favoriteItem.id !== item.id
      );

      this.favoriteProducts = changedFavoriteProducts;
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(changedFavoriteProducts)
      );

      this.emitter.emit("decreaseCounter", changedFavoriteProducts.length);
    },
  },

  computed: {
    isHaveProducts() {
      return Boolean(this.favoriteProducts.length);
    },
  },

  mounted() {
    const favoriteProducts = JSON.parse(
      localStorage.getItem("favoriteProducts")
    );
    this.favoriteProducts = favoriteProducts;
  },
};
</script>

<style scoped>
hr {
  margin-bottom: 65px;
}
</style>
