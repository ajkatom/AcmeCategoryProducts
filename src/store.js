import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
const random = require("generate-random-data");

const LIST_CATEGORIES = "LIST_CATEGORIES";
const DELETE_CATEGTORY = "DELETE_CATEGTORY";
const CREATE_CATEGAROY = "CREATE_CATEGROY";
const LIST_PRODUCTS = "LIST_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";

const listCategories = () => {
  return dispatch => {
    return axios
      .get("/api/categories")
      .then(categories => categories.data)
      .then(categories => {
        dispatch({
          type: LIST_CATEGORIES,
          categories
        });
      });
  };
};
const listProducts = () => {
  return dispatch => {
    return axios
      .get("/api/products")
      .then(products => products.data)
      .then(products => {
        dispatch({
          type: LIST_PRODUCTS,
          products
        });
      });
  };
};

const createCategory = () => {
  return dispatch => {
    return axios
      .post("/api/categories/", { name: random.domain() })
      .then(res => res.data)
      .then(category => {
        dispatch({
          type: CREATE_CATEGAROY,
          category
        });
      });
  };
};
const deleteCategory = id => {
  return dispatch => {
    return axios
      .delete(`/api/categories/${id}`)
      .then(res => res.data)
      .then(category => {
        dispatch({
          type: DELETE_CATEGTORY,
          id
        });
      });
  };
};
const createProduct = id => {
  return dispatch => {
    return axios
      .post("/api/products/", { name: random.lastName(), categoryId: id })
      .then(res => res.data)
      .then(product => {
        dispatch({
          type: CREATE_PRODUCT,
          product
        });
      });
  };
};
const deleteProduct = id => {
  return dispatch => {
    return axios
      .delete(`/api/products/${id}`)
      .then(res => res.data)
      .then(product => console.log(product))
      .then(() => {
        dispatch({
          type: DELETE_PRODUCT,
          id
        });
      });
  };
};

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_CATEGORIES:
      state = action.categories;
      break;
    case CREATE_CATEGAROY:
      state = [...state, action.category];
      break;
    case DELETE_CATEGTORY:
      state = state.filter(category => category.id !== action.id * 1);
      break;
  }
  return state;
};

const productReducer = (state = [], action) => {
  switch (action.type) {
    case LIST_PRODUCTS:
      state = action.products;
      break;
    case CREATE_PRODUCT:
      state = [...state, action.product];
    case DELETE_CATEGTORY:
      state = state.filter(product => product.categoryId !== action.id * 1);
      break;
    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.id * 1);
      break;
  }
  return state;
};

const reducer = combineReducers({
  products: productReducer,
  categories: categoryReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export {
  listCategories,
  listProducts,
  createCategory,
  deleteCategory,
  createProduct,
  deleteProduct
};
