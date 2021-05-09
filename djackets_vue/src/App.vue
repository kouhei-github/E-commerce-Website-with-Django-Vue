<template>
  <div id="wrapper">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <strong> Djanckets </strong>
        </router-link>
        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenue = !showMobileMenue"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenue }"
      >
        <div class="navbar-end">
          <router-link to="/summer" class="navbar-item">Summer</router-link>
          <router-link to="/winter" class="navbar-item">Winter</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/log-in" class="button is-light"
                >Log in</router-link
              >
              <router-link to="/cart" class="button is-success">
                <span class="icon"><i class="fa fa-shopping-cart"></i></span>
                <span>Cart({{ cartTotalLengh }})</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section">
      <router-view />
    </section>

    <footer class="section">
      <p class="has-text-centered">Copyright &copy; 2021</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const showMobileMenue = ref(false);
    const cart = reactive({
      cart: {
        items: [
          {
            quantity: 1,
            product: {},
          },
        ],
      },
    });
    // Vuexの利用
    store.commit("initializeStore");

    onMounted(() => {
      cart.cart = store.state.cart;
    });

    const cartTotalLengh = computed(() => {
      let totalLength = 0;

      for (let i = 0; i < cart.cart.items.length; i++) {
        totalLength += cart.cart.items[i].quantity;
      }
      return totalLength;
    });
    // フロントに値を渡す
    return {
      cartTotalLengh,
      showMobileMenue,
      cart,
    };
  },
});
</script>

<style lang="scss">
@import "../node_modules/bulma";
</style>
