import {
  ADD_POST,
  ADDING_POST,
  ADDING_POST_ERROR,
  DELETE_POST,
  MANIPULATE_POST,
  MANIPULATE_POST_ERROR,
  OPEN_POST_MODAL
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  let { post } = action;
  switch (action.type) {
    case ADD_POST:
      if (action.posts)
        return {
          ...action.posts.entities.post
        };
      else
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

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ADD_POST:
    case ADDING_POST_ERROR:
      return false;
    case ADDING_POST:
      return true;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case ADD_POST:
    case ADDING_POST:
      return null;
    case ADDING_POST_ERROR:
    case DELETE_POST:
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

export * from "./postsHelper";

