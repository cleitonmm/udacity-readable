import {
  ADD_POST,
  RECEIVE_POST,
  FETCH_POST,
  FETCH_POST_ERROR
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
    case RECEIVE_POST:
      const nextState = { ...state };
      action.posts.forEach(post => {
        nextState[post.id] = post;
      });
      return nextState;
    default:
      return state;
  }
};

const controller = (state = {}, action) => {
  const { error } = action;
  switch (action.type) {
    case FETCH_POST:
      return {
        isFetching: true,
        error
      };
    case RECEIVE_POST:
      return {
        isFetching: false,
        error
      };
    case FETCH_POST_ERROR:
      return {
        isFetching: false,
        error
      };
    default:
      return state;
  }
};

export default combineReducers({ byIds, controller });

const getAllPosts = state => allIds(state).map(id => state.posts.byIds[id]);

export const allIds = state => Object.keys(state.posts.byIds);

export const isFetchingPosts = state => state.posts.controller.isFetching;

export const getPostsError = state => state.posts.controller.error;

export const filterPost = (state, category, id) => {
  let posts = getAllPosts(state);

  if (id) posts = posts.filter(post => post[id]);
  else if (category) posts = posts.filter(post => post.category === category);

  return posts;
};
