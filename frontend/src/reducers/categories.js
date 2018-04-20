import {
  ADD_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY,
  FETCH_CATEGORY_ERROR
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  if (action.categories) {
    return {
      ...state,
      ...action.categories.entities.category
    };
  }

  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
      return true;
    case FETCH_CATEGORY_ERROR:
    case FETCH_CATEGORY_SUCCESS:
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_CATEGORY:
    case FETCH_CATEGORY_SUCCESS:
      return null;
    case FETCH_CATEGORY_ERROR:
      return action.error || "Erro indefinido ao carregar categorias.";
    default:
      return state;
  }
};

export default combineReducers({ byIds, isFetching, errorMessage });

export const isFetchingCategories = state => state.categories.isFetching;

export const getCategoriesError = state => state.categories.errorMessage;

const getAllCategories = state =>
  Object.keys(state.categories.byIds).map(id => state.categories.byIds[id]);

export const filterCategory = (state, path) => {
  let categories = getAllCategories(state);

  if (path) {
    categories = categories.filter(category => category.path === path);
  }

  return categories;
};
