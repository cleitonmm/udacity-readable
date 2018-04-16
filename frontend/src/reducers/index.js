import { combineReducers } from "redux";
import {
  ADD_CATEGORY,
  ADD_POST,
  ADD_POST_CATEGORY,
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

function postsByCategory(state = {}, action) {
  const { id, category, type } = action;

  let posts = state[category];
  if (!posts) posts = [];
  posts.filter(post => post !== id);
  posts.push(id);

  switch (type) {
    case ADD_POST_CATEGORY:
      return {
        ...state,
        [category]: posts
      };
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  postsByCategory
});
