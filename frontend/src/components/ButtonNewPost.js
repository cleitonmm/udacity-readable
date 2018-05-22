import React, { Component } from "react";
import IoAndroidCreate from "react-icons/lib/io/android-create";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { openPostModal } from "../actions";
import PostCreator from "./PostCreator";

class ButtonNewPost extends Component {
  addPost = () => {
    this.props.openPostModal(undefined, undefined, undefined, true);
  };

  render() {
    const { openPostAdd } = this.props;
    return (
      <div className="fixed-bottom mb-3">
        <button
          className="btn btn-lg btn-primary btn-new-post"
          onClick={() => this.addPost()}
        >
          <IoAndroidCreate size={25} />
          <span>Create a Post</span>
        </button>

        {openPostAdd && <PostCreator type="ADD" />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  openPostAdd: state.posts.openPostAdd
});

export default withRouter(connect(mapStateToProps, { openPostModal })(ButtonNewPost));
