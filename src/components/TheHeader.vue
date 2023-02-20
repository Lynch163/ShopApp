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

<style scoped>
header {
  padding: 11px 260px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.counter {
  position: relative;
  top: -10px;
  left: -6px;
  padding: 5px 6px;
  border-radius: 50%;
  background-color: #eb4c47;
  font-weight: 700;
  font-size: 8px;
}
a {
  margin-right: 50px;
  font-size: 20px;
  font-weight: bold;
}
a:last-child {
  margin-right: 0;
}
</style>
