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
            <a class="button is-dark" @click="add()">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import axios from "axios";
import { toast } from "bulma-toast";

interface ProductDetail {
    quantity: number;
    product: {
      id: number;
      name: string;
      get_absolute_url: string;
      description: string;
      price: string;
      get_image: string;
      get_thumbnail: string;
  };
}

interface Reponce {
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
    const route = useRoute();
    const detailInfos = reactive<ProductDetail>({
        quantity: 1,
        product: {
          id: 1,
          name: "",
          get_absolute_url: "",
          description: "",
          price: "",
          get_image: "",
          get_thumbnail: "",
      }
    });
    onMounted(() => {
      getProduct();
    });
    const getProduct = async () => {
      store.commit("setIsLoading", true);
      const category_slug = route.params.category_slug;
      const product_slug = route.params.product_slug;
      await axios
        .get(`/api/v1/products/${category_slug}/${product_slug}`)
        .then((responce) => {
          const responceObject: Reponce = responce.data;
          detailInfos.product.id = responce.data.id;
          detailInfos.product.name = responce.data.name;
          detailInfos.product.get_absolute_url = responce.data.get_absolute_url;
          detailInfos.product.description = responce.data.description;
          detailInfos.product.price = responce.data.price;
          detailInfos.product.get_image = responce.data.get_image;
          detailInfos.product.get_thumbnail = responce.data.get_thumbnail;

          document.title = detailInfos.product.name + " | Djackets";
        })
        .catch((error) => {
          console.log(error);
        });
      store.commit("setIsLoading", false);
    };
    const add = () => {
      if (isNaN(detailInfos.quantity) || detailInfos.quantity < 1) {
        detailInfos.quantity = 1;
      }

      store.commit("addToCart", detailInfos);
      toast({
        message: "The product was added to the cart",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    };

    return {
      detailInfos,
      add,
    };
  },
});
</script>
