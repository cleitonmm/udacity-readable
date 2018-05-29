import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPostComments, openCommentModal } from "../actions";
import { filterComments, isFetchingComments } from "../reducers";
import Comment from "./Comment";
import CommentCreator from "./CommentCreator";

class CommentsView extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string,
    isFetching: PropTypes.bool.isRequired
  };

  state = {
    orderedComments: []
  };

  componentWillMount() {
    const { fetchPostComments, postId } = this.props;
    if (postId) fetchPostComments(postId);
  }

  orderComments = () => {
    let orderedComments = [];
    const { comments } = this.props;
    if (comments.length !== 0) {
      orderedComments = comments.sort((a, b) => {
        return b.voteScore > a.voteScore;
      });
    }

    return orderedComments;
  };

  addComment = () => {
    this.props.openCommentModal(undefined, undefined, undefined, true);
  };

  render() {
    const { isFetching, openCommentAdd, postId } = this.props;
    let { orderedComments } = this.state;

    if (orderedComments.length === 0) orderedComments = this.orderComments();

    return (
      <div className="border-top mt-2 pt-3 pb-3">
        <div className="d-inline-block">
          <h5>Comments ({orderedComments.length})</h5>
        </div>
        <button
          className="btn btn-outline-primary btn-sm float-right"
          onClick={() => this.addComment()}
        >
          Add a Comment
        </button>
        {!isFetching ? (
          orderedComments.length !== 0 ? (
            <div className="card-group">
              {orderedComments.map(comment => (
                <div key={comment.id} className="w-100">
                  <Comment comment={comment} />
                </div>
              ))}
            </div>
          ) : (
            <div>No comments yet.</div>
          )
        ) : (
          <div>Carregando...</div>
        )}
        {openCommentAdd && <CommentCreator type="ADD" postId={postId} />}
      </div>
    );
  }
}

const mapStateToProps = (state, { postId }) => ({
  postId,
  comments: filterComments(state, postId),
  isFetching: isFetchingComments(state),
  openCommentAdd: state.comments.openCommentModal.add
});

export default withRouter(
  connect(mapStateToProps, { fetchPostComments, openCommentModal })(
    CommentsView
  )
);
