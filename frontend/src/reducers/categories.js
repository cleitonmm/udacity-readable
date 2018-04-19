import { ADD_CATEGORY, RECEIVE_CATEGORY, FETCH_CATEGORY, FETCH_CATEGORY_ERROR } from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
    case RECEIVE_CATEGORY:
      const nextState = { ...state };
      action.categories.forEach(category => {
        nextState[category.path] = category;
      });
      return nextState;
    default:
      return state;
  }
};

const controller = (state = {}, action) => {
  const { error } = action;
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        isFetching: true,
        error
      };
    case RECEIVE_CATEGORY:
      return {
        isFetching: false,
        error
      };
    case FETCH_CATEGORY_ERROR:
      return {
        isFetching: false,
        error
      };
    default:
      return state;
  }
};

export default combineReducers({byIds, controller});

export const allIds = state => Object.keys(state.categories.byIds);

export const isFetchingCategories = state => state.categories.controller.isFetching;

export const getCategoriesError = state => state.categories.controller.error;

const getAllCategories = state => allIds(state).map(id => state.categories.byIds[id]);

export const filterCategory = (state, path) => {
  let categories = getAllCategories(state);

  if (path) {
    categories = categories.filter(category => category.path === path);
  }

  return categories;
};
