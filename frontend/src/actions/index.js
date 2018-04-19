import { getCategories, getPosts, getCategoryPosts } from "../utils/api";
import { isFetchingCategories, isFetchingPosts } from "../reducers";

export const RECEIVE_CATEGORY = "RECEIVE_CATEGORY";
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR";

export const RECEIVE_POST = "RECEIVE_POST";
export const FETCH_POST = "FETCH_POST";
export const ADD_POST = "ADD_POST";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";

export const receiveCategory = categories => ({
  type: RECEIVE_CATEGORY,
  categories: [...categories]
});

export const controlFetchCategory = (type, error) => ({
  type,
  error
});

export const receivePost = posts => ({
  type: RECEIVE_POST,
  posts: [...posts]
});

export const controlFetchPost = (type, error) => ({
  type,
  error
});

export const fetchCategories = () => (dispatch, getState) => {
  if (isFetchingCategories(getState())) {
    console.warn("Já há uma requisição de categorias em andamento.");
    return Promise.resolve();
  }

  dispatch(controlFetchCategory(FETCH_CATEGORY));
  return getCategories()
    .then(categories => dispatch(receiveCategory(categories)))
    .catch(error =>
      dispatch(controlFetchCategory(FETCH_CATEGORY_ERROR, error))
    );
};

export const fetchPosts = () => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn("Já há uma requisição de postagens em andamento.");
    return Promise.resolve();
  }

  dispatch(controlFetchPost(FETCH_POST));
  return getPosts()
    .then(posts => dispatch(receivePost(posts)))
    .catch(error => dispatch(controlFetchPost(FETCH_POST_ERROR, error)));
};

export const fetchCategoryPosts = category => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn("Já há uma requisição de postagens em andamento.");
    return Promise.resolve();
  }

  dispatch(controlFetchPost(FETCH_POST));
  return getCategoryPosts(category)
    .then(posts => dispatch(receivePost(posts)))
    .catch(error => dispatch(controlFetchPost(FETCH_POST_ERROR, error)));
};
