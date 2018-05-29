import React, { Component } from "react";
import { TiEdit, TiDelete } from "react-icons/lib/ti";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openPostModal } from "../actions";
import PostCreator from "./PostCreator";

class EditDeletePost extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    openPostModal: PropTypes.func.isRequired
  };

  editPost = () => {
    this.props.openPostModal(this.props.post, true);
  };

  deletePost = () => {
    this.props.openPostModal(this.props.post, undefined, true);
  };

  render() {
    const { post, isOpenEdit, isOpenDelete } = this.props;
    return (
      <div className="comment-edit text-center w-100">
        <button
          type="button"
          className="btn-primary-outline p-0 m-0 btn-comment-edit"
          onClick={() => this.editPost()}
        >
          <TiEdit size={20} />
        </button>
        <button
          type="button"
          className="btn-primary-outline p-0 m-0 btn-comment-edit"
          onClick={() => this.deletePost()}
        >
          <TiDelete size={20} />
        </button>
        {isOpenEdit && <PostCreator type="EDIT" post={post} />}

        {isOpenDelete && <PostCreator type="DELETE" post={post} />}
      </div>
    );
  }
}

const mapStateToProps = (state, { post }) => {
  return {
    post,
    isOpenEdit:
      state.posts.openPostModal.post === post
        ? state.posts.openPostModal.edit
        : false,
    isOpenDelete:
      state.posts.openPostModal.post === post
        ? state.posts.openPostModal.delete
        : false
  };
};

export default withRouter(
  connect(mapStateToProps, { openPostModal })(EditDeletePost)
);
