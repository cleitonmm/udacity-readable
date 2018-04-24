import {
  ADD_COMMENT,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT,
  FETCH_COMMENT_ERROR,
  MANIPULATE_COMMENT,
  MANIPULATE_COMMENT_ERROR,
  MANIPULATE_COMMENT_SUCCESS
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  if (action.comments) {
    return {
      ...state,
      ...action.comments.entities.comment
    };
  }

  let { comment } = action;
  switch (action.type) {
    case MANIPULATE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...comment,
          isManipulating: true
        }
      };
    case MANIPULATE_COMMENT_ERROR:
      return {
        ...state,
        [comment.id]: {
          ...comment,
          isManipulating: false,
          errorMessage: action.error
        }
      };
    case MANIPULATE_COMMENT_SUCCESS:
      return {
        ...state,
        [comment.id]: {
          ...comment,
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
    case FETCH_COMMENT_SUCCESS:
    case FETCH_COMMENT_ERROR:
      return false;
    case FETCH_COMMENT:
      return true;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case FETCH_COMMENT:
    case FETCH_COMMENT_SUCCESS:
      return null;
    case FETCH_COMMENT_ERROR:
      return action.error || "Erro indefinido ao carregar coment[arios.";
    default:
      return state;
  }
};

export default combineReducers({ byIds, isFetching, errorMessage });

const getAllComments = state =>
  Object.keys(state.comments.byIds).map(id => state.comments.byIds[id]);

export const isFetchingComments = state => state.comments.isFetching;

export const isManipulatingComment = (state, id) =>
  getAllComments(state).filter(comment => comment.id === id)[0].isManipulating;

export const getCommentsError = state => state.comments.errorMessage;

export const getCommentError = (state, id) => state.comments.byIds[id].errorMessage;

export const filterComments = (state, postId, id) => {
  let comments = getAllComments(state);

  if (id) comments = comments.filter(comment => comment.id === id)[0];
  else if (postId)
    comments = comments.filter(comment => comment.parentId === postId);

  return comments;
};
