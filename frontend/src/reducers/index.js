import { combineReducers } from "redux";
import * as Reducers from "./reducers";

export default combineReducers({
  ...Reducers
});

const getAllCategories = state =>
  state.categoriesIds.map(id => state.categories[id]);

const getAllPosts = state => state.postsIds.map(id => state.posts[id]);

// Selectors
export const filterCategory = (state, path) => {
  let categories = getAllCategories(state);

  if (path) {
    categories = categories.filter(category => category.path === path);
  }

  return categories;
};

export const filterPost = (state, category, id) => {
  let posts = getAllPosts(state);

  if (id) posts = posts.filter(post => post[id]);
  else if (category) posts = posts.filter(post => post.category === category);

  return posts;
};
