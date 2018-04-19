import React, { Component } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { fetchPosts, fetchCategoryPosts } from "../actions";
import * as reducers from "../reducers";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PostsView extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    categoryFilter: PropTypes.func,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.object
  };

  static defaultProps = {
    isFetching: false,
  }

  state = {
    orderedPosts: []
  };

  componentDidMount() {
    const { fetchCategoryPosts, fetchPosts, categoryFilter } = this.props;

    categoryFilter ? fetchCategoryPosts(categoryFilter) : fetchPosts();
  }

  orderPosts = (
    field = "votescore",
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
        <h1>Postagens</h1>
        <div>
          Ordernar por:
          <button onClick={e => this.handleOrder("votescore")}>Votação</button>
          <button onClick={e => this.handleOrder("timestamp")}>Data</button>
        </div>
        {!isFetching ? (
          !fetchError ? (
            orderedPosts.length === 0 ? (
              <div>Essa categoria ainda não possui postagens.</div>
            ) : (
              <ul>
                {orderedPosts.map(post => (
                  <li key={post.id}>
                    <Post post={post} />
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
