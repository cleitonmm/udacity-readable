import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPostComments } from "../actions";
import { filterComments, isFetchingComments } from "../reducers";
import Comment from "./Comment";

class CommentsView extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string,
    isFetching: PropTypes.bool.isRequired
  };

  static defaultProps = {
    isFetching: false
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

  render() {
    const { isFetching } = this.props;
    let { orderedComments } = this.state;

    if (orderedComments.length === 0) orderedComments = this.orderComments();

    return (
      <div>
        {!isFetching && orderedComments.length !== 0 ? (
          <div className="card-group">
            {orderedComments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { postId }) => ({
  postId,
  comments: filterComments(state, postId),
  isFetching: isFetchingComments(state)
});

export default withRouter(
  connect(mapStateToProps, { fetchPostComments })(CommentsView)
);
