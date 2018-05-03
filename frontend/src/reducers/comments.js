import {
  ADD_COMMENT,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT,
  FETCH_COMMENT_ERROR,
  MANIPULATE_COMMENT,
  MANIPULATE_COMMENT_ERROR,
  MANIPULATE_COMMENT_SUCCESS,
  OPEN_COMMENT_MODAL
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  if (action.comments) {
    return {
      ...action.comments.entities.comment
    };
  }

  let { comment, openCommentEdit, openCommentDelete } = action;
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

    case OPEN_COMMENT_MODAL:
      if (comment) {
        return {
          ...state,
          [comment.id]: {
            ...comment,
            openCommentEdit,
            openCommentDelete
          }
        };
      } else {
        return state;
      }

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

const openCommentAdd = (state = false, action) => {
  switch (action.type) {
    case OPEN_COMMENT_MODAL:
      if (!action.comment) return action.openCommentAdd;
      else return state;
    default:
      return state;
  }
};

export default combineReducers({
  byIds,
  isFetching,
  errorMessage,
  openCommentAdd
});

const getAllComments = state =>
  Object.keys(state.comments.byIds).map(id => state.comments.byIds[id]);

export const isFetchingComments = state => state.comments.isFetching;

export const isManipulatingComment = (state, id) =>
  getAllComments(state).filter(comment => comment.id === id)[0].isManipulating;

export const getCommentsError = state => state.comments.errorMessage;

export const getCommentError = (state, id) =>
  state.comments.byIds[id].errorMessage;

export const filterComments = (state, postId, id, deleted = false) => {
  let comments = getAllComments(state);

  if (!deleted)
    comments = comments.filter(comment => comment.deleted === false);

  if (id) comments = comments.filter(comment => comment.id === id)[0];
  else if (postId)
    comments = comments.filter(comment => comment.parentId === postId);

  return comments;
};
