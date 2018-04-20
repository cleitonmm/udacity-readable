import { getCategories, getPosts, getCategoryPosts } from "../utils/api";
import { isFetchingCategories, isFetchingPosts } from "../reducers";
import * as schema from "./schemas";
import { normalize } from "normalizr";

export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR";

export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST = "FETCH_POST";
export const ADD_POST = "ADD_POST";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";

const fetchPostSuccess = posts => ({
  type: FETCH_POST_SUCCESS,
  posts: normalize(posts, schema.posts)
});

export const fetchCategories = () => (dispatch, getState) => {
  if (isFetchingCategories(getState())) {
    console.warn("Já há uma requisição de categorias em andamento.");
    return Promise.resolve();
  }

  dispatch({ type: FETCH_CATEGORY });
  return getCategories().then(
    categories =>
      dispatch({
        type: FETCH_CATEGORY_SUCCESS,
        categories: normalize(categories, schema.categories)
      }),
    error =>
      dispatch({
        type: FETCH_CATEGORY_ERROR,
        error: error.message
      })
  );
};

export const fetchPosts = () => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn("Já há uma requisição de postagens em andamento.");
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POST });
  return getPosts().then(
    posts => dispatch(fetchPostSuccess(posts)),
    error => dispatch({ type: FETCH_POST_ERROR, error: error.message })
  );
};

export const fetchCategoryPosts = category => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn("Já há uma requisição de postagens em andamento.");
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POST });
  return getCategoryPosts(category).then(
    posts => dispatch(fetchPostSuccess(posts)),
    error => dispatch({ type: FETCH_POST_ERROR, error: error.message })
  );
};
