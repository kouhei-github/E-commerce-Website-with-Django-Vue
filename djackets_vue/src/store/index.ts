import { createStore } from "vuex";
interface State {
  cart: {
    items: [
      {
        quantity: number;
        // eslint-disable-next-line
        product: any;
      }
    ];
  };
  isAuthenticated: boolean;
  token: string;
  isLoading: boolean;
}
interface Store {
  state: {
    cart: {
      items: [
        {
          quantity: number;
          // eslint-disable-next-line
          product: any;
        }
      ];
    };
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
  };
  mutations: {
    initializeStore(state: State): void;
    addToCart(state: State, item: string): void;
  };
}

export default createStore(<Store>{
  state: {
    cart: {
      items: [
        {
          quantity: 0,
          product: {
            id: 0,
          },
        },
      ],
    },
    isAuthenticated: false,
    token: "",
    isLoading: false,
  },
  mutations: {
    initializeStore(state: State) {
      // eslint-disable-next-line
      const cart: any = localStorage.getItem("cart");
      if (cart) {
        state.cart = JSON.parse(cart);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    // eslint-disable-next-line
    addToCart(state: State, item: any) {
      // eslint-disable-next-line
      const exists: any = state.cart.items.filter(
        // eslint-disable-next-line
        (i: any) => i.product.id == item.product.id
      );

      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // eslint-disable-next-line
    setIsLoading(state: State, status: any) {
      state.isLoading = status;
    },
  },
  actions: {},
  modules: {},
});
