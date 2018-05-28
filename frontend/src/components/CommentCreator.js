import React, { Component } from "react";
import {
  editComment,
  delComment,
  addComment,
  openCommentModal
} from "../actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";

class CommentCreator extends Component {
  static propTypes = {
    comment: PropTypes.object,
    postId: PropTypes.string,
    type: PropTypes.oneOf(["EDIT", "ADD", "DELETE"]).isRequired
  };

  state = {
    bodyValidation: null,
    authorValidation: null
  };

  handleEditAdd = () => {
    const { type, postId } = this.props;
    const data = new FormData(this.form);

    if (type === "EDIT") {
      const comment = {
        id: this.props.comment.id,
        body: data.get("body"),
        author: this.props.comment.author
      };

      if (this.validateForm(comment)) this.props.editComment(comment.id, comment.body);
    }

    if (type === "ADD") {
      const comment = {
        body: data.get("body"),
        author: data.get("author"),
        parentId: postId
      };

      if (this.validateForm(comment)) this.props.addComment(comment);
    }
  };

  handleDelete = () => {
    const { delComment, comment } = this.props;

    delComment(comment.id);
  };

  closeModal = () => {
    this.props.openCommentModal(this.props.comment, false, false, false);
  };

  validateForm = comment => {
    let valid = true;
    let bodyValidation = null;
    let authorValidation = null;

    if (comment.body.length === 0) {
      bodyValidation = "Comment is required.";
      valid = false;
    }

    if (comment.author.length === 0) {
      authorValidation = "Author is required.";
      valid = false;
    }

    this.setState({
      bodyValidation,
      authorValidation
    });

    return valid;
  };

  editAdd = () => {
    const { comment, type } = this.props;
    const { bodyValidation, authorValidation } = this.state;

    return (
      <div className="form-group col">
        <form ref={form => (this.form = form)}>
          <span>Comment:</span>
          <textarea
            name="body"
            className="form-control"
            autoFocus
            rows="8"
            defaultValue={type === "EDIT" ? comment.body : ""}
          />
          <span className="text-danger d-block">{bodyValidation}</span>
          {type === "ADD" && (
            <div>
              <span>Author:</span>
              <input
                type="text"
                name="author"
                className="form-control"
                defaultValue={type === "EDIT" ? comment.author : ""}
              />
              <span className="text-danger d-block">{authorValidation}</span>
            </div>
          )}
        </form>

        <div className="btn-group-save-cancel m-2 text-right">
          <button
            onClick={e => this.handleEditAdd()}
            className="btn btn-outline-primary m-1 btn-save-cancel"
          >
            Save
          </button>
          <button
            onClick={e => this.closeModal()}
            className="btn btn-outline-secondary m-1 btn-save-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  delete = () => {
    return (
      <div className="form-group col">
        <h5>This comment will be deleted. Are you sure?</h5>

        <div className="btn-group-save-cancel m-2 text-right">
          <button
            onClick={e => this.handleDelete()}
            className="btn btn-outline-danger m-1 btn-save-cancel"
          >
            Delete
          </button>
          <button
            onClick={e => this.closeModal()}
            className="btn btn-outline-secondary m-1 btn-save-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { type } = this.props;
    return (
      <Modal
        className="comment-modal"
        overlayClassName="overlay"
        isOpen={true}
        contentLabel="Modal"
        appElement={document.getElementById("root")}
      >
        {type === "EDIT" && this.editAdd()}
        {type === "ADD" && this.editAdd()}
        {type === "DELETE" && this.delete()}
      </Modal>
    );
  }
}

export default withRouter(
  connect(null, { editComment, delComment, addComment, openCommentModal })(
    CommentCreator
  )
);
