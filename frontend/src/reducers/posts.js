import {
  ADD_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST,
  FETCH_POST_ERROR
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
    case FETCH_POST_SUCCESS:
      const nextState = { ...state };
      action.posts.forEach(post => {
        nextState[post.id] = post;
      });
      return nextState;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
    case FETCH_POST_ERROR:
      return false;
    case FETCH_POST:
      return true;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_POST:
    case FETCH_POST_SUCCESS:
      return null;
    case FETCH_POST_ERROR:
      return action.error || "Erro indefinido ao carregar postagens.";
    default:
      return state;
  }
};

export default combineReducers({ byIds, isFetching, errorMessage });

const getAllPosts = state => allIds(state).map(id => state.posts.byIds[id]);

export const allIds = state => Object.keys(state.posts.byIds);

export const isFetchingPosts = state => state.posts.isFetching;

export const getPostsError = state => state.posts.errorMessage;

export const filterPost = (state, category, id) => {
  let posts = getAllPosts(state);

  if (id) posts = posts.filter(post => post[id]);
  else if (category) posts = posts.filter(post => post.category === category);

  return posts;
};
