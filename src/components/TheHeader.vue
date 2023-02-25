<template>
  <header>
    <router-link to="/">
      <img src="../assets/images/logo.jpg" alt="logo" />
    </router-link>
    <div class="favorite-counter">
      <router-link to="/my-favorite-product">
        <img src="../assets/images/svg/fulled-hearth.svg" alt="heart-ico" />
        <span class="counter">{{ counter }}</span>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",

  data() {
    return {
      counter: 0,
    };
  },

  mounted() {
    const storage = localStorage.getItem("favoriteProducts");
    if (storage) {
      this.counter = JSON.parse(storage).length;
    }

    this.emitter.on("increaseCounter", (value) => {
      this.counter = value;
    });
    this.emitter.on("decreaseCounter", (value) => {
      this.counter = value;
    });
  },
};
</script>
