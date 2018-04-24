import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchPost } from "../actions";
import { isFetchingPosts } from "../reducers";
import CommentsView from "./CommentsView";

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    id: PropTypes.string
  };

  static defaultProps = {
    isFetching: false
  };

  componentWillMount() {
    const { fetchPost, id } = this.props;
    if (id) fetchPost(id);
  }

  render() {
    const { post, isFetching } = this.props;
    return (
      <div>
        {!isFetching ? (
          <div>
            <h3>{post.title}</h3> <CommentsView postId={post.id}/>
          </div>
        ) : (
          <span>Carregando...</span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    id,
    post: state.posts.byIds[id] ? state.posts.byIds[id] : {},
    isFetching: isFetchingPosts(state)
  };
};

export default withRouter(connect(mapStateToProps, { fetchPost })(Post));
