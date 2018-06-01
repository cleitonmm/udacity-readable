const getAllPosts = state =>
  Object.keys(state.posts.byIds).map(id => state.posts.byIds[id]);

export const isFetchingPosts = state => state.posts.isFetching;

export const isManipulatingPost = (state, id) =>
  getAllPosts(state).filter(post => post.id === id)[0].isManipulating;

export const getPostsError = state => state.posts.errorMessage;

export const getPostError = (state, id) => state.posts.byIds[id].errorMessage;

export const filterPost = (state, category, id, deleted = false) => {
  let posts = getAllPosts(state);

  if (id) posts = posts.filter(post => post.id === id)[0];
  else if (category) posts = posts.filter(post => post.category === category);

  return posts;
};