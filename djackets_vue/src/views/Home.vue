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
          <router-link
            v-bind:to="product.get_absolute_url"
            class="button is-dark mt-4"
          >
            View details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"; // @ is an alias to /src
import axios from "axios";
import { useStore } from "vuex";

interface LatestProduct {
  id: number;
  name: string;
  get_absolute_url: string;
  description: string;
  price: string;
  get_image: string;
  get_thumbnail: string;
}

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const store = useStore();
    const latestProducts = ref<LatestProduct[]>([]); //TypeScriptで書くなら型を明記しよう！！
    // const latestProducts = ref([]); //これでも大丈夫(any型)

    const getLatestProduct = async () => {
      store.commit("setIsLoading", true);

      await axios
        .get("/api/v1/latest-products/")
        .then((responce) => {
          latestProducts.value = responce.data;
          console.log(latestProducts.value);
        })
        .catch((error) => {
          console.log(error);
        });

      store.commit("setIsLoading", false);
    };
    onMounted(() => {
      getLatestProduct();

      document.title = "Home | Djanckets";
    });
    return {
      latestProducts,
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
