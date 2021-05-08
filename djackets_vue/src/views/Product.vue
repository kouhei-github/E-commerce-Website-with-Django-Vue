<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <div class="column is-9">
        <figure class="image mob-6">
          <img v-bind:src="detailInfos.product.get_image" />
        </figure>

        <h1 class="title">{{ detailInfos.product.name }}</h1>

        <p>{{ detailInfos.product.description }}</p>
      </div>

      <div class="column is-3">
        <h2 class="subtitle">Information</h2>

        <p><strong>Price: </strong>${{ detailInfos.product.price }}</p>
        <div class="field has-addons mt-6">
          <div class="control">
            <input
              type="number"
              class="input"
              min="1"
              v-model="detailInfos.quantity"
            />
          </div>
          <div class="control">
            <a class="button is-dark">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const route = useRoute();
    const detailInfos = reactive({
      quantity: 1,
      product: {},
    });
    onMounted(() => {
      getProduct();
    });
    const getProduct = () => {
      const category_slug = route.params.category_slug;
      const product_slug = route.params.product_slug;
      axios
        .get(`/api/v1/products/${category_slug}/${product_slug}`)
        .then((responce) => {
          detailInfos.product = responce.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      detailInfos,
    };
  },
});
</script>
