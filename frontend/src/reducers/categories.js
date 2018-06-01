import {
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

export * from "./categoriesHelper";