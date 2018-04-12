import { getCategories, getPosts } from "../utils/api";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_POST = "ADD_POST";

export const addCategory = category => {
  return {
    type: ADD_CATEGORY,
    ...category
  };
};

export const addPost = post => {
  return {
    type: ADD_POST,
    ...post
  };
};

export const fetchCategories = () => dispatch =>
  getCategories().then(categories => {
    categories.map(cat => dispatch(addCategory(cat)));
  });

export const fetchPosts = () => dispatch =>
  getPosts().then(posts => {
    posts.map(post => dispatch(addPost(post)));
  });
