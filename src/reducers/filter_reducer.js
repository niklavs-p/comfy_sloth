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
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
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

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
