import { getCategories, getPosts, getCategoryPosts } from "../utils/api";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_POST = "ADD_POST";

export const addCategory = categories => ({
  type: ADD_CATEGORY,
  categories: [...categories]
});

export const addPost = posts => ({
  type: ADD_POST,
  posts: [...posts]
});

export const fetchCategories = () => dispatch =>
  getCategories().then(categories => dispatch(addCategory(categories)));

export const fetchPosts = () => dispatch =>
  getPosts().then(posts => dispatch(addPost(posts)));

export const fetchCategoryPosts = category => dispatch =>
  getCategoryPosts(category).then(posts => dispatch(addPost(posts)));