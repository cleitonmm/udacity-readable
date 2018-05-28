import {
  ADD_POST,
  DELETE_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST,
  FETCH_POST_ERROR,
  MANIPULATE_POST,
  MANIPULATE_POST_ERROR,
  MANIPULATE_POST_SUCCESS,
  OPEN_POST_MODAL
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  if (action.posts) {
    return {
      ...action.posts.entities.post
    };
  }
  let { post, openPostEdit, openPostDelete } = action;
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        [post.id]: {
          ...post,
          isManipulating: false,
          errorMessage: null
        }
      };

    case DELETE_POST:
      let newState = state;
      delete newState[post.id];
      return { ...newState };

    case MANIPULATE_POST:
      return {
        ...state,
        [post.id]: {
          ...post,
          isManipulating: true
        }
      };
    case MANIPULATE_POST_ERROR:
      return {
        ...state,
        [post.id]: {
          ...post,
          isManipulating: false,
          errorMessage: action.error
        }
      };
    case MANIPULATE_POST_SUCCESS:
      return {
        ...state,
        [post.id]: {
          ...post,
          isManipulating: false,
          errorMessage: null
        }
      };

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

const openPostModal = (
  state = { post: null, add: false, edit: false, delete: false },
  action
) => {
  switch (action.type) {
    case OPEN_POST_MODAL:
      return {
        post: action.post,
        add: action.openPostAdd,
        edit: action.openPostEdit,
        delete: action.openPostDelete
      };
    default:
      return state;
  }
};

export default combineReducers({
  byIds,
  isFetching,
  errorMessage,
  openPostModal
});

const getAllPosts = state =>
  Object.keys(state.posts.byIds).map(id => state.posts.byIds[id]);

export const isFetchingPosts = state => state.posts.isFetching;

export const isManipulatingPost = (state, id) =>
  getAllPosts(state).filter(post => post.id === id)[0].isManipulating;

export const getPostsError = state => state.posts.errorMessage;

export const getPostError = (state, id) => state.posts.byIds[id].errorMessage;

export const filterPost = (state, category, id, deleted = false) => {
  let posts = getAllPosts(state);

  if (!deleted) posts = posts.filter(post => post.deleted === false);

  if (id) posts = posts.filter(post => post.id === id)[0];
  else if (category) posts = posts.filter(post => post.category === category);

  return posts;
};
