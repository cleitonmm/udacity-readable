import React, { Component } from "react";
import IoAndroidCreate from "react-icons/lib/io/android-create";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { openPostModal } from "../actions";
import PostCreator from "./PostCreator";

class ButtonNewPost extends Component {
  addPost = () => {
    this.props.openPostModal(undefined, undefined, undefined, true);
  };

  render() {
    const { add, del, edit, post } = this.props;

    if (post && !add && !del && !edit)
      return <Redirect to={`/post/${post.id}`} />;
    return (
      <div className="fixed-bottom mb-3">
        <button
          className="btn btn-lg btn-primary btn-new-post"
          onClick={() => this.addPost()}
        >
          <IoAndroidCreate size={25} />
          <span>Create a Post</span>
        </button>

        {add && <PostCreator type="ADD" />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  add: state.posts.openPostModal.add,
  del: state.posts.openPostModal.delete,
  edit: state.posts.openPostModal.edit,
  post: state.posts.openPostModal.post
});

export default withRouter(
  connect(mapStateToProps, { openPostModal })(ButtonNewPost)
);
