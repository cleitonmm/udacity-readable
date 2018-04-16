import React, { Component } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { fetchPosts, fetchCategoryPosts } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class PostsView extends Component {
  static propTypes = {
    categoryFilter: PropTypes.string
  };

  static defaultProps = {
    categoryFilter: ""
  };

  state = {
    postsErr: null,
    orderedPosts: [],
    loading: true
  };

  componentDidMount() {
    const { fetchCategoryPosts, fetchPosts, categoryFilter } = this.props;

    if (categoryFilter.length !== 0) {
      fetchCategoryPosts(categoryFilter)
        .then(posts =>
          this.setState({
            orderedPosts: this.orderPosts(undefined, undefined, posts),
            loading: false
          })
        )
        .catch(err => {
          console.log(err);
          this.setState({
            postsErr: "Ops... Ocorreu um erro ao carregar postagens!"
          });
        });
    } else {
      fetchPosts()
        .then(posts =>
          this.setState({
            orderedPosts: this.orderPosts(undefined, undefined, posts),
            loading: false
          })
        )
        .catch(err => {
          console.log(err);
          this.setState({
            postsErr: "Ops... Ocorreu um erro ao carregar postagens!"
          });
        });
    }
  }

  orderPosts = (
    field = "votescore",
    ascDesc = "desc",
    posts = this.state.orderedPosts
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
    let { orderedPosts, loading } = this.state;
    if (orderedPosts.length === 0) orderedPosts = this.orderPosts();

    return (
      <div className="posts">
        <h1>Postagens</h1>
        <div>
          Ordernar por:
          <button onClick={e => this.handleOrder("votescore")}>Votação</button>
          <button onClick={e => this.handleOrder("timestamp")}>Data</button>
        </div>
        {!loading ? (
          orderedPosts.length === 0 ? (
            <div>
              Essa categoria ainda não possui postagens.
            </div>
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
            {this.state.postsErr ? this.state.postsErr : "Carregando..."}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }, { categoryFilter }) => ({
  posts,
  categoryFilter
});

export default withRouter(
  connect(mapStateToProps, {fetchPosts, fetchCategoryPosts})(PostsView)
);
