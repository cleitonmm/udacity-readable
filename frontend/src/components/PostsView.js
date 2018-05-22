import React, { Component } from "react";
import PropTypes from "prop-types";
import PostPreview from "./PostPreview";
import { fetchPosts, fetchCategoryPosts } from "../actions";
import * as reducers from "../reducers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PostsView extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categoryFilter: PropTypes.string,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.object
  };

  static defaultProps = {
    isFetching: false
  };

  state = {
    orderedPosts: []
  };

  componentWillMount() {
    const { fetchCategoryPosts, fetchPosts, categoryFilter } = this.props;

    categoryFilter ? fetchCategoryPosts(categoryFilter) : fetchPosts();
  }

  orderPosts = (
    field = "voteScore",
    ascDesc = "desc",
    posts = this.props.posts
  ) => {
    let orderedPosts = [];
    if (posts.length !== 0) {
      orderedPosts = posts.sort((a, b) => {
        return ascDesc === "desc" ? b[field] > a[field] : a[field] > b[field];
      });
    }

    return orderedPosts;
  };

  handleOrder = (field, ascDesc) => {
    const orderedPosts = this.orderPosts(field, ascDesc);
    this.setState({ orderedPosts });
  };

  render() {
    let { orderedPosts } = this.state;
    const { isFetching, fetchError } = this.props;

    if (orderedPosts.length === 0) orderedPosts = this.orderPosts();

    return (
      <div className="posts">
        <div className="border-bottom m-1 p-1">
          <span className="h4">Posts</span>
          <div className="d-inline-block float-right">
            <span className="h5 pr-2">Order by:</span>
            <div className="btn-group-sm d-inline-block">
              <button
                onClick={e => this.handleOrder("voteScore")}
                className="btn btn-sm btn-outline-dark"
              >
                Vote
              </button>
              <button
                onClick={e => this.handleOrder("timestamp")}
                className="btn btn-sm btn-outline-dark"
              >
                Date
              </button>
            </div>
          </div>
        </div>

        {!isFetching ? (
          !fetchError ? (
            orderedPosts.length === 0 ? (
              <div>No posts yet.</div>
            ) : (
              <ul>
                {orderedPosts.map(post => (
                  <li key={post.id}>
                    <PostPreview post={post} />
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div>
              <span>Ops... ocorreu um erro ao carregar postagens!</span>
              {console.log(fetchError)}
            </div>
          )
        ) : (
          <div>"Carregando..."</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { categoryFilter }) => ({
  posts: reducers.filterPost(state, categoryFilter),
  categoryFilter,
  isFetching: reducers.isFetchingPosts(state),
  fetchError: reducers.getPostsError(state)
});

export default withRouter(
  connect(mapStateToProps, { fetchPosts, fetchCategoryPosts })(PostsView)
);
