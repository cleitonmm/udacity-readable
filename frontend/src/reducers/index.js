import { combineReducers } from "redux";
import {
  ADD_CATEGORY,
  ADD_POST,
  ALL_CATEGORIES,
  ALL_POSTS
} from "../actions";

function categories(state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      const { name, path } = action;
      return {
        ...state,
        [name]: {
          name,
          path
        }
      };

    case ALL_CATEGORIES:
      return {
        ...state,
        ...action.categories
      };

    default:
      return state;
  }
}

function posts(state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      const {
        id,
        timestamp,
        title,
        body,
        author,
        category,
        commentCount,
        deleted,
        votescore
      } = action;

      return {
        ...state,
        [id]: {
          id,
          timestamp,
          title,
          body,
          author,
          category,
          commentCount,
          deleted,
          votescore
        }
      };

    case ALL_POSTS:
      return {
        ...state,
        ...action.posts
      };

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
});

// Selectors 
export const filterCategory = (state, path) => {
  const { categories } = state;
  let category = {}

  if (path) {
    Object.keys(categories).map(id => {
      if (categories[id].path === path) {
        category = categories[id];
      }
    });
  }

  return category;
};
