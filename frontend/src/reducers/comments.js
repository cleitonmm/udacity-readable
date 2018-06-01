import {
  ADD_COMMENT,
  ADDING_COMMENT,
  DELETE_COMMENT,
  MANIPULATE_COMMENT,
  MANIPULATE_COMMENT_ERROR,
  OPEN_COMMENT_MODAL,
  ADDING_COMMENT_ERROR
} from "../actions";
import { combineReducers } from "redux";

const byIds = (state = {}, action) => {
  let { comment } = action;
  switch (action.type) {
    case ADD_COMMENT:
      if (action.comments)
        return {
          ...action.comments.entities.comment
        };
      else
        return {
          ...state,
          [comment.id]: {
            ...comment,
            isManipulating: false,
            errorMessage: null
          }
        };
    case DELETE_COMMENT:
      let newState = state;
      delete newState[comment.id];
      return { ...newState };

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
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case ADD_COMMENT:
    case ADDING_COMMENT_ERROR:
      return false;
    case ADDING_COMMENT:
      return true;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case ADDING_COMMENT:
    case ADD_COMMENT:
      return null;
    case ADDING_COMMENT_ERROR:
      return action.error || "Erro indefinido ao carregar coment[arios.";
    default:
      return state;
  }
};

const openCommentModal = (
  state = { comment: null, add: false, edit: false, delete: false },
  action
) => {
  switch (action.type) {
    case OPEN_COMMENT_MODAL:
      return {
        comment: action.comment,
        add: action.openCommentAdd,
        edit: action.openCommentEdit,
        delete: action.openCommentDelete
      };
    default:
      return state;
  }
};

export default combineReducers({
  byIds,
  isFetching,
  errorMessage,
  openCommentModal
});

export * from "./commentsHelper";