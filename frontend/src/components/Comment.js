import React, { Component } from "react";
import PropTypes from "prop-types";
import { voteComment, VOTE_COMMENT } from "../actions";
import VoteScore from "./VoteScore";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isManipulatingComment, getCommentError } from "../reducers";

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    isManipulating: PropTypes.bool.isRequired
  };

  render() {
    const { comment, isManipulating, error } = this.props;
    return (
      <div className="d-block w-100">
        {error && <div>Ocorreu um erro</div>}
        <div className="card p-0 m-0">
          <div className="card-body p-0 m-0">
            <h5 className="card-title">Teste</h5>
            <h6 className="card-subtitle text-muted"> teste 2 </h6>
            <p className="card-text text-justify">{comment.body} </p>
            <VoteScore
              id={comment.id}
              vote={voteComment}
              score={comment.voteScore}
              type={VOTE_COMMENT}
              error={error}
              isManipulating={isManipulating}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, { comment }) => ({
  comment,
  isManipulating: isManipulatingComment(state, comment.id),
  error: getCommentError(state, comment.id)
});

export default withRouter(connect(mapStateToProps)(Comment));
