const getAllComments = state =>
  Object.keys(state.comments.byIds).map(id => state.comments.byIds[id]);

export const isFetchingComments = state => state.comments.isFetching;

export const isManipulatingComment = (state, id) =>
  getAllComments(state).filter(comment => comment.id === id)[0].isManipulating;

export const getCommentsError = state => state.comments.errorMessage;

export const getCommentError = (state, id) =>
  state.comments.byIds[id].errorMessage;

export const filterComments = (state, postId, id, deleted = false) => {
  let comments = getAllComments(state);

  if (id) comments = comments.filter(comment => comment.id === id)[0];
  else if (postId)
    comments = comments.filter(comment => comment.parentId === postId);

  return comments;
};
