import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { votePost, VOTE_POST } from "../actions";
import { isManipulatingPost, getPostError } from "../reducers";
import VoteScore from "./VoteScore";

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post, isManipulating, error } = this.props;

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
      <div className="container">
        <table className="d-table d-inline-block w-100 border-bottom">
          <tbody>
            <tr>
              <th className="d-table-cell img-post-preview p-3 w-25">
                <img
                  className="rounded-circle img-post-preview"
                  src="https://picsum.photos/50/?random"
                  alt="profile"
                />
              </th>
              <th className="d-table-cell w-50">
                <Link
                  to={{
                    pathname: `/post/${post.id}`
                  }}
                >
                  {post.title}
                </Link>
                <footer className="blockquote-footer">
                  <span className="ml-2 text-secondary small text-center">
                    by
                  </span>
                  <span className="ml-2 text-left">{post.author}</span>
                  <span className="ml-2 text-secondary small text-center">
                    {formattedDate === dateNow
                      ? ` at ${formattedTime}`
                      : ` in ${formattedDate}`}
                  </span>
                </footer>
              </th>
              <th className="d-table-cell w-25 text-center">
                <div className="w-100">
                  <VoteScore
                    id={post.id}
                    vote={votePost}
                    score={post.voteScore}
                    type={VOTE_POST}
                    error={error}
                    isManipulating={isManipulating}
                  />
                  <div>
                    {post.commentCount === 0 && (
                      <span className="text-secondary small">
                        No comments yet
                      </span>
                    )}
                    {post.commentCount === 1 && (
                      <span className="text-secondary small">1 comment</span>
                    )}
                    {post.commentCount > 1 && (
                      <span className="text-secondary small">
                        {post.commentCount} comments
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-secondary small">
                      {post.category.toUpperCase()}
                    </span>
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, { post }) => ({
  post,
  isManipulating: post ? isManipulatingPost(state, post.id) : false,
  error: post ? getPostError(state, post.id) : null
});

export default withRouter(connect(mapStateToProps)(PostPreview));
