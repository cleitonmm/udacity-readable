import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;
    return (
      <div>
        <Link
          to={{
            pathname: `/post/${post.id}`
          }}
        >
          {this.props.post.title}
        </Link>
      </div>
    );
  }
}

export default PostPreview;
