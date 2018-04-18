import { ADD_CATEGORY, ADD_POST } from "../actions";

export const categories = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      const nextState = { ...state };
      action.categories.forEach(category => {
        nextState[category.path] = category;
      });
      return nextState;
    default:
      return state;
  }
};

export const posts = (state = {}, action) => {
  switch (action.type) {
    case ADD_POST:
      const nextState = { ...state };
      action.posts.forEach(post => {
        nextState[post.id] = post;
      });
      return nextState;
    default:
      return state;
  }
};

export const categoriesIds = (state = [], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return action.categories.map(category => category.path)
    default:
      return state;
  }
};

export const postsIds = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return action.posts.map(post => post.id);
    default:
      return state;
  }
};
