import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = payload;
      const tempItem = state.cart.find((i) => i.id === id + color);

      if (tempItem) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }
          return item;
        });

        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (total, { amount, price }) => {
          total.total_items += amount;
          total.total_amount += amount * price;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );

      return {
        ...state,
        total_items,
        total_amount,
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case TOGGLE_CART_ITEM_AMOUNT:
      let newCart = state.cart.map((item) => {
        if (item.id === payload.id) {
          let newAmount = item.amount + payload.value;
          if (newAmount > item.max) {
            newAmount = item.max;
          } else if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
        return item;
      });

      return {
        ...state,
        cart: newCart,
      };

    default:
      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default cart_reducer;
