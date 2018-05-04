import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPost, votePost, VOTE_POST } from "../actions";
import { isFetchingPosts, isManipulatingPost, getPostError } from "../reducers";
import CommentsView from "./CommentsView";
import { TiEdit, TiDelete } from "react-icons/lib/ti";
import VoteScore from "./VoteScore";

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    id: PropTypes.string
  };

  componentWillMount() {
    const { fetchPost, id } = this.props;
    if (id) fetchPost(id);
  }

  render() {
    const { post, isFetching, error, isManipulating } = this.props;

    let formattedDate = "";
    let formattedTime = "";
    let dateNow = new Date().toLocaleDateString("pt-BR");
    if (post.timestamp) {
      let dateTime = new Date(post.timestamp);
      formattedDate = dateTime.toLocaleDateString("pt-BR");
      formattedTime = dateTime.toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "numeric"
      });
    }
    return (
      <div>
        {!isFetching && Object.keys(post).length !== 0 ? (
          <div className="container">
            <div className="d-table">
              <aside className="d-table-cell img-post">
                <img
                  className="rounded-circle img-post"
                  src="https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg"
                  alt="profile"
                />

                <div className="ml-2">
                  {post.author}
                  {formattedDate === dateNow
                    ? ` às ${formattedTime}`
                    : ` em ${formattedDate}`}
                </div>
                <div className="w-100">
                  <VoteScore
                    id={post.id}
                    vote={votePost}
                    score={post.voteScore}
                    type={VOTE_POST}
                    error={error}
                    isManipulating={isManipulating}
                  />
                </div>
                <div className="comment-edit text-center w-100">
                  <button
                    type="button"
                    className="btn-primary-outline p-0 m-0 btn-comment-edit"
                    onClick={() => this.editComment()}
                  >
                    <TiEdit size={20} />
                  </button>
                  <button
                    type="button"
                    className="btn-primary-outline p-0 m-0 btn-comment-edit"
                    onClick={() => this.deleteComment()}
                  >
                    <TiDelete size={20} />
                  </button>
                </div>
              </aside>
              <div className="d-table-cell ml-2">
                <h3 className="ml-3 text-center">{post.title}</h3>
                <p className="ml-3 text-justify">{post.body}</p>
              </div>
            </div>
            <CommentsView postId={post.id} />
          </div>
        ) : (
          <span>Carregando...</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const post = state.posts.byIds[id];
  return {
    id,
    post: post ? post : {},
    isFetching: isFetchingPosts(state),
    isManipulating: post ? isManipulatingPost(state, id) : false,
    error: post ? getPostError(state, id) : null,
    isOpenEdit: post ? post.openPostEdit : false,
    isOpenDelete: post ? post.openPostDelete : false
  };
};

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));
