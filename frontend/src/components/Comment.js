import React, { Component } from "react";
import PropTypes from "prop-types";
import { voteComment, VOTE_COMMENT, openCommentModal } from "../actions";
import VoteScore from "./VoteScore";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isManipulatingComment, getCommentError } from "../reducers";
import { TiEdit, TiDelete } from "react-icons/lib/ti";
import CommentCreator from "./CommentCreator";

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    isManipulating: PropTypes.bool.isRequired
  };

  editComment = () => {
    this.props.openCommentModal(this.props.comment, true)
  };

  deleteComment = () => {
    this.props.openCommentModal(this.props.comment, undefined, true);
  };

  render() {
    const { comment, isManipulating, error, isOpenEdit, isOpenDelete } = this.props;

    let formattedDate = "";
    let formattedTime = "";
    let dateNow = new Date().toLocaleDateString("pt-BR");
    if (comment.timestamp) {
      let dateTime = new Date(comment.timestamp);
      formattedDate = dateTime.toLocaleDateString("pt-BR");
      formattedTime = dateTime.toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "numeric"
      });
    }
    return (
      <div className="container">
        <div className="card p-1 m-1">
          <div className="card-body d-table p-0 m-0">
            <aside className="d-table-cell img-comment">
              <img
                className="rounded-circle img-comment"
                src="https://picsum.photos/300/?random"
                alt="profile"
              />
            </aside>

            <div className="d-table-cell">
              <p className="card-text text-justify m-0 ml-2 mt-2">
                {comment.body}
              </p>
            </div>
          </div>
          <footer className="p-0 m-0">
            <div className="d-inline-block comment-edit">
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

            <div className="blockquote-footer d-inline-block ml-2">
              {comment.author}
              {formattedDate === dateNow
                ? ` às ${formattedTime}`
                : ` em ${formattedDate}`}
            </div>
            <div className="text-right d-inline-block float-right">
              <VoteScore
                id={comment.id}
                vote={voteComment}
                score={comment.voteScore}
                type={VOTE_COMMENT}
                error={error}
                isManipulating={isManipulating}
              />
            </div>
          </footer>
        </div>

        {isOpenEdit && <CommentCreator type="EDIT" comment={comment} />}

        {isOpenDelete && <CommentCreator type="DELETE" comment={comment} />}
      </div>
    );
  }
}

const mapStateToProps = (state, { comment }) => ({
  comment,
  isManipulating: isManipulatingComment(state, comment.id),
  error: getCommentError(state, comment.id),
  isOpenEdit: state.comments.openCommentModal.comment === comment ? state.comments.openCommentModal.edit : false,
  isOpenDelete: state.comments.openCommentModal.comment === comment ? state.comments.openCommentModal.delete : false,
});

export default withRouter(
  connect(mapStateToProps, { openCommentModal })(Comment)
);
