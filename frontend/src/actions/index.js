import {
  getCategories,
  getPosts,
  getCategoryPosts,
  getPost,
  getPostComments,
  putPost,
  deletePost,
  postPost,
  getComment,
  postCommentVote,
  putComment,
  deleteComment,
  postComment,
  postPostVote
} from "../utils/api";
import {
  isFetchingCategories,
  isFetchingPosts,
  isFetchingComments,
  isManipulatingComment,
  filterComments,
  isManipulatingPost,
  filterPost
} from "../reducers";
import * as schema from "./schemas";
import { normalize } from "normalizr";

export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY = "FETCH_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR";

export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST = "FETCH_POST";
export const ADD_POST = "ADD_POST";
export const FETCH_POST_ERROR = "FETCH_POST_ERROR";
export const MANIPULATE_POST = "MANIPULATE_POST";
export const MANIPULATE_POST_ERROR = "MANIPULATE_POST_ERROR";
export const MANIPULATE_POST_SUCCESS = "MANIPULATE_POST_SUCCESS";
export const VOTE_POST = "VOTE_POST";
export const OPEN_POST_MODAL = "OPEN_POST_MODAL";

export const FETCH_COMMENT_SUCCESS = "FETCH_COMMENTS_SUCCESS";
export const FETCH_COMMENT = "FETCH_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const FETCH_COMMENT_ERROR = "FETCH_COMMENT_ERROR";
export const MANIPULATE_COMMENT = "MANIPULATE_COMMENT";
export const MANIPULATE_COMMENT_ERROR = "MANIPULATE_COMMENT_ERROR";
export const MANIPULATE_COMMENT_SUCCESS = "MANIPULATE_COMMENT_SUCCESS";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const OPEN_COMMENT_MODAL = "OPEN_COMMENT_MODAL";

const IS_FETCHING_POST_MESSAGE =
  "Já há uma requisição de postagens em andamento.";
const IS_FETCHING_CATEGORY_MESSAGE =
  "Já há uma requisição de categoria em andamento.";
const IS_FETCHING_COMMENT_MESSAGE =
  "Já há uma requisição de comentário em andamento.";
const IS_MANIPULATING_COMMENT_MESSAGE =
  "Já há uma requisição de alteração de comentário em andamento.";
const IS_MANIPULATING_POST_MESSAGE =
  "Já há uma requisição de alteração de postagem em andamento.";

const fetchPostSuccess = (posts, postSchema = schema.posts) => ({
  type: FETCH_POST_SUCCESS,
  posts: normalize(posts, postSchema)
});

const fetchCommentSuccess = (
  comments,
  postSchema = schema.comments,
  type = FETCH_COMMENT_SUCCESS
) => ({
  type,
  comments: normalize(comments, postSchema)
});

export const fetchCategories = () => (dispatch, getState) => {
  if (isFetchingCategories(getState())) {
    console.warn(IS_FETCHING_CATEGORY_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_CATEGORY });
  return getCategories().then(
    categories =>
      dispatch({
        type: FETCH_CATEGORY_SUCCESS,
        categories: normalize(categories, schema.categories)
      }),
    error =>
      dispatch({
        type: FETCH_CATEGORY_ERROR,
        error: error.message
      })
  );
};

export const fetchPosts = () => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn(IS_FETCHING_POST_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POST });
  return getPosts().then(
    posts => dispatch(fetchPostSuccess(posts)),
    error => dispatch({ type: FETCH_POST_ERROR, error: error.message })
  );
};

export const fetchCategoryPosts = category => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn(IS_FETCHING_POST_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POST });
  return getCategoryPosts(category).then(
    posts => dispatch(fetchPostSuccess(posts)),
    error => dispatch({ type: FETCH_POST_ERROR, error: error.message })
  );
};

export const fetchPost = id => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.warn(IS_FETCHING_POST_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POST });
  return getPost(id).then(
    post => dispatch(fetchPostSuccess(post, schema.post)),
    error => dispatch({ type: FETCH_POST_ERROR, error: error.message })
  );
};

export const fetchPostComments = id => (dispatch, getState) => {
  if (isFetchingComments(getState())) {
    console.warn(IS_FETCHING_COMMENT_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_COMMENT });
  return getPostComments(id).then(
    comments => dispatch(fetchCommentSuccess(comments)),
    error => dispatch({ type: FETCH_COMMENT_ERROR, error: error.message })
  );
};

export const fetchComment = id => (dispatch, getState) => {
  if (isManipulatingComment(getState(), id)) {
    console.log(IS_MANIPULATING_COMMENT_MESSAGE, `CommentId: ${id}`);
    return Promise.resolve();
  }

  let comment = filterComments(getState(), undefined, id);
  if (Object.keys(comment).length === 0) {
    comment = { id: { id } };
  }

  dispatch({ type: MANIPULATE_COMMENT, comment });

  return getComment(id).then(
    comm => dispatch(fetchCommentSuccess(comm, schema.comment)),
    error =>
      dispatch({
        type: MANIPULATE_COMMENT_ERROR,
        comment,
        error: error.message
      })
  );
};

export const voteComment = (id, option) => (dispatch, getState) => {
  if (isManipulatingComment(getState(), id)) {
    console.log(IS_MANIPULATING_COMMENT_MESSAGE, `CommentId: ${id}`);
    return Promise.resolve();
  }

  const comment = filterComments(getState(), undefined, id);

  dispatch({ type: MANIPULATE_COMMENT, comment });
  return postCommentVote(id, option).then(
    res => {
      dispatch({ type: MANIPULATE_COMMENT_SUCCESS, comment });
    },
    error => {
      dispatch({
        type: MANIPULATE_COMMENT_ERROR,
        comment,
        error: error.message
      });
    }
  );
};

export const votePost = (id, option) => (dispatch, getState) => {
  if (isManipulatingPost(getState(), id)) {
    console.log(IS_MANIPULATING_POST_MESSAGE, `PostId: ${id}`);
    return Promise.resolve();
  }

  const post = filterPost(getState(), undefined, id);

  dispatch({ type: MANIPULATE_POST, post });
  return postPostVote(id, option).then(
    res => {
      dispatch({ type: MANIPULATE_POST_SUCCESS, post });
    },
    error => {
      dispatch({
        type: MANIPULATE_POST_ERROR,
        post,
        error: error.message
      });
    }
  );
};

export const vote = (id, option, type) => (dispatch, getState) => {
  if (type === VOTE_COMMENT) return voteComment(id, option)(dispatch, getState);
  if (type === VOTE_POST) return votePost(id, option)(dispatch, getState);
};

export const editComment = (id, body) => (dispatch, getState) => {
  if (isManipulatingComment(getState(), id)) {
    console.log(IS_MANIPULATING_COMMENT_MESSAGE, `CommentId: ${id}`);
    return Promise.resolve();
  }

  const comment = filterComments(getState(), undefined, id);

  dispatch({ type: MANIPULATE_COMMENT, comment });

  return putComment(id, body).then(
    res => {
      dispatch({ type: MANIPULATE_COMMENT_SUCCESS, comment });
      dispatch(fetchComment(id));
    },
    error => {
      dispatch({
        type: MANIPULATE_COMMENT_ERROR,
        comment,
        error: error.message
      });
    }
  );
};

export const delComment = id => (dispatch, getState) => {
  if (isManipulatingComment(getState(), id)) {
    console.log(IS_MANIPULATING_COMMENT_MESSAGE, `CommentId: ${id}`);
    return Promise.resolve();
  }

  const comment = filterComments(getState(), undefined, id);

  dispatch({ type: MANIPULATE_COMMENT, comment });

  return deleteComment(id).then(
    res => {
      dispatch({ type: MANIPULATE_COMMENT_SUCCESS, comment });
      dispatch(fetchPostComments(comment.parentId));
    },
    error => {
      dispatch({
        type: MANIPULATE_COMMENT_ERROR,
        comment,
        error: error.message
      });
    }
  );
};

export const addComment = comment => (dispatch, getState) => {
  if (isFetchingComments(getState())) {
    console.log(IS_MANIPULATING_COMMENT_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_COMMENT });

  return postComment(comment).then(
    res => {
      dispatch({ type: FETCH_COMMENT_SUCCESS });
      openCommentModal()(dispatch);
      dispatch(fetchPostComments(comment.parentId));
    },
    error => {
      dispatch({
        type: FETCH_COMMENT_ERROR,
        error: error.message
      });
    }
  );
};

export const editPost = (id, title, body) => (dispatch, getState) => {
  if (isManipulatingPost(getState(), id)) {
    console.log(IS_MANIPULATING_POST_MESSAGE, `PostId: ${id}`);
    return Promise.resolve();
  }

  const post = filterPost(getState(), undefined, id);

  dispatch({ type: MANIPULATE_POST, post });

  return putPost(id, title, body).then(
    res => {
      dispatch({ type: MANIPULATE_POST_SUCCESS, post });
      dispatch(fetchPost(id));
    },
    error => {
      dispatch({
        type: MANIPULATE_POST_ERROR,
        post,
        error: error.message
      });
    }
  );
};

export const delPost = id => (dispatch, getState) => {
  if (isManipulatingPost(getState(), id)) {
    console.log(IS_MANIPULATING_POST_MESSAGE, `PostId: ${id}`);
    return Promise.resolve();
  }

  const post = filterPost(getState(), undefined, id);

  dispatch({ type: MANIPULATE_POST, post });

  return deletePost(id).then(
    res => {
      dispatch({ type: MANIPULATE_POST_SUCCESS, post });
    },
    error => {
      dispatch({
        type: MANIPULATE_POST_ERROR,
        post,
        error: error.message
      });
    }
  );
};

export const addPost = post => (dispatch, getState) => {
  if (isFetchingPosts(getState())) {
    console.log(IS_MANIPULATING_POST_MESSAGE);
    return Promise.resolve();
  }

  dispatch({ type: FETCH_POST });

  return postPost(post).then(
    res => {
      dispatch({ type: FETCH_POST_SUCCESS });
      openCommentModal()(dispatch);
    },
    error => {
      dispatch({
        type: FETCH_POST_ERROR,
        error: error.message
      });
    }
  );
};

export const openCommentModal = (
  comment = null,
  openCommentEdit = false,
  openCommentDelete = false,
  openCommentAdd = false
) => dispatch => {
  dispatch({
    type: OPEN_COMMENT_MODAL,
    comment,
    openCommentEdit,
    openCommentDelete,
    openCommentAdd
  });
};

export const openPostModal = (
  post = null,
  openPostEdit = false,
  openPostDelete = false,
  openPostAdd = false
) => dispatch => {
  dispatch({
    type: OPEN_POST_MODAL,
    post,
    openPostEdit,
    openPostDelete,
    openPostAdd
  });
};