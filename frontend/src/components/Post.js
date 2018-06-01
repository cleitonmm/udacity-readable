import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPost, votePost, VOTE_POST } from "../actions";
import { isFetchingPosts, isManipulatingPost, getPostError } from "../reducers";
import CommentsView from "./CommentsView";
import VoteScore from "./VoteScore";
import EditDeletePost from "./EditDeletePost";
import ReactLoading from "react-loading";
import Page404 from "./Page404";

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    id: PropTypes.string
  };

  componentDidMount() {
    const { fetchPost, id } = this.props;
    if (id) {
      fetchPost(id);
    }
  }

  render() {
    const { post, error, fetchError, isManipulating, isFetching } = this.props;

    if (fetchError) return <Page404 />;

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
                  src="https://picsum.photos/500/?random"
                  alt="profile"
                />
                <div className="text-center">
                  <span className="ml-2 text-secondary small">by</span>
                  <span className="ml-2 text-center">{post.author}</span>
                </div>
                <div className="ml-2 text-secondary small text-center">
                  {formattedDate === dateNow
                    ? ` at ${formattedTime}`
                    : ` in ${formattedDate}`}
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
                <EditDeletePost post={post} />
                <div className="text-center text-secondary">
                  {post.category.toUpperCase()}
                </div>
              </aside>
              <div className="d-table-cell ml-2 w-100">
                <h3 className="ml-3 text-center">{post.title}</h3>
                <p className="ml-3 text-justify">{post.body}</p>
              </div>
            </div>
            <CommentsView postId={post.id} />
          </div>
        ) : (
          <ReactLoading type="bars" color="#222" />
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
    fetchError: state.posts.errorMessage
  };
};

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));
