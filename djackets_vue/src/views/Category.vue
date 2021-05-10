<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">{{ category.name }}</h2>
      </div>

      <ProductBox
        v-for="product in category.products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import axios from "axios";
import { toast } from "bulma-toast";

interface Product {
  id: number;
  name: string;
  get_absolute_url: string;
  description: string;
  price: string;
  get_image: string;
  get_thumbnail: string;
}

interface Category {
  id: number;
  name: string;
  get_absolute_url: string;
  products: Product[];
}

export default defineComponent({
  name: "Category",
  setup() {
    const store = useStore();
    const route = useRoute();
    const category = reactive<Category>({
      id: 1,
      name: "",
      get_absolute_url: "",
      products: [
        {
          id: 1,
          name: "",
          get_absolute_url: "",
          description: "",
          price: "",
          get_image: "",
          get_thumbnail:
            "http://127.0.0.1:8000/media/uploads/summer1_qZiXXn6.jpg",
        },
      ],
    });

    onMounted(() => {
      getCategory();
      console.log(category);
    });

    const getCategory = async () => {
      const categorySlug = route.params.category_slug;
      store.commit("setIsLoading", true);
      await axios
        .get(`/api/v1/products/${categorySlug}/`)
        .then((responce) => {
          category.products = responce.data;

          document.title = category.name + "| Djackets";
        })
        .catch((error) => {
          console.log(error);

          toast({
            message: "Something went wrong. Please try again.",
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
            duration: 2000,
            position: "bottom-right",
          });
        });
      store.commit("setIsLoading", false);
    };

    return {
      category,
    };
  },
});
</script>
