<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="titke mb-6">Welcome to Djacket</p>
        <p class="subtitle">The best jacket store online</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest product</h2>
      </div>

      <div
        class="column is-3"
        v-for="product in latestProducts"
        v-bind:key="product.id"
      >
        <div class="box">
          <figure class="image mb-4">
            <img v-bind:src="product.get_thumbnail" />
          </figure>

          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">${{ product.price }}</p>

          View details
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"; // @ is an alias to /src
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const latestProducts = ref([]);
    const getLatestProduct = () => {
      axios
        .get("/api/v1/latest-products/")
        .then((responce) => {
          latestProducts.value = responce.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    onMounted(() => {
      getLatestProduct();
    });
    return {
      latestProducts,
      getLatestProduct,
    };
  },
});
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
