import { getCategories, getPosts, getCategoryPosts } from "../utils/api";

export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_POST = "ADD_POST";
export const ADD_POST_CATEGORY = "ADD_POST_CATEGORY";
export const ALL_CATEGORIES = "ALL_CATEGORIES";
export const ALL_POSTS = "ALL_POSTS";

export const addCategory = category => ({
  type: ADD_CATEGORY,
  ...category
});

export const addPost = post => ({
  type: ADD_POST,
  ...post
});

export const allCategories = categories => ({
  type: ALL_CATEGORIES,
  categories: { ...categories }
});

export const allPosts = posts => ({
  type: ALL_POSTS,
  posts: { ...posts }
});

export const fetchCategories = () => dispatch =>
  getCategories().then(categories => {
    categories = categories.reduce((cats, cat) => {
      cats = {
        ...cats,
        [cat.name]: {
          ...cat
        }
      };
      return cats;
    }, {});

    dispatch(allCategories(categories));

    return categories;
  });

export const fetchPosts = () => dispatch =>
  getPosts().then(posts => handlePosts(posts, dispatch));

export const fetchCategoryPosts = category => dispatch =>
  getCategoryPosts(category).then(posts => handlePosts(posts, dispatch));

const handlePosts = (posts, dispatch) => {
  if (posts.length !== 0) {
    posts = posts.reduce((posts, post) => {
      posts = {
        ...posts,
        [post.id]: {
          ...post
        }
      };
      return posts;
    }, {});

    dispatch(allPosts(posts));
  }

  return posts;
};
