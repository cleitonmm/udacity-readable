import { getCategories, getPosts, getCategoryPosts } from "../utils/api";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_POST = "ADD_POST";
export const ADD_POST_CATEGORY = "ADD_POST_CATEGORY";
export const ALL_CATEGORIES = "ALL_CATEGORIES";
export const ALL_POSTS = "ALL_POSTS";

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

export const addPostByCategory = (id, category) => {
  return {
    type: ADD_POST_CATEGORY,
    id,
    category
  };
};

export const allCategories = categories => {
  return {
    type: ALL_CATEGORIES,
    categories: { ...categories }
  };
};

export const allPosts = posts => {
  return {
    type: ALL_POSTS,
    posts: { ...posts }
  };
};

export const fetchCategories = () => dispatch => {
  return getCategories().then(categories => {
    categories.reduce((cats, cat) => {
      cats = {
        ...cats,
        [cat.name]: {
          ...cat
        }
      };
      return cats;
    });

    dispatch(allCategories(categories));
  });
};

export const fetchPosts = () => dispatch => {
  return getPosts().then(posts => handlePosts(posts, dispatch));
};

export const fetchCategoryPosts = category => dispatch => {
  return getCategoryPosts(category).then(posts => handlePosts(posts, dispatch));
};

const handlePosts = (posts, dispatch) => {
  if (posts.length !== 0) {
    posts.reduce((posts, post) => {
      posts = {
        ...posts,
        [post.id]: {
          ...post
        }
      };
      return posts;
    });

    dispatch(allPosts(posts));
  }
};
