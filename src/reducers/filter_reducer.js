import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      const maxPrice = Math.max(...action.payload.map((p) => p.price));
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case SORT_PRODUCTS:
      return {
        ...state,
        filtered_products: state.filtered_products.sort((a, b) => {
          switch (state.sort) {
            case 'price-lowest':
              return a.price - b.price;

            case 'price-highest':
              return b.price - a.price;

            case 'name-a':
              // return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
              return a.name.localeCompare(b.name);

            case 'name-z':
              // return a.name < b.name ? 1 : b.name < a.name ? -1 : 0;
              return b.name.localeCompare(a.name);
          }
        }),
      };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, max_price, shipping } =
        state.filters;
      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().includes(text)
        );
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.colors.includes(color)
        );
      }
      if (price < max_price) {
        tempProducts = tempProducts.filter((product) => product.price <= price);
      }
      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping);
      }

      return { ...state, filtered_products: tempProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          min_price: 0,
          max_price: state.filters.max_price,
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
