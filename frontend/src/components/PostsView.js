import React, { Component } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import { fetchPosts } from "../actions";
import { connect } from "react-redux";

class PostsView extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired
  };

  state = {
    postsErr: null,
    orderedPosts: []
  };

  componentDidMount() {
    this.props.fetchPosts().catch(err =>
      this.setState({
        postsErr: "Ops... Ocorreu um erro ao carregar postagens!"
      })
    );
  }

  orderPosts = (field = "votescore", ascDesc = "desc") => {
    const { posts } = this.props;

    let postsKeys = Object.keys(posts);
    let orderedPosts = [];
    if (postsKeys.length !== 0) {
      orderedPosts = postsKeys.map(id => posts[id]).sort((a, b) => {
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
    if (orderedPosts.length === 0) orderedPosts = this.orderPosts();

    return (
      <div className="posts">
        <h1>Postagens</h1>
        <div>
          Ordernar por:
          <button onClick={e => this.handleOrder("votescore")}>Votação</button>
          <button onClick={e => this.handleOrder("timestamp")}>Data</button>
        </div>
        {orderedPosts.length !== 0 ? (
          <ul>
            {orderedPosts.map(post => (
              <li key={post.id}>
                <Post post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <div>
            {this.state.postsErr ? this.state.postsErr : "Carregando..."}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: data => dispatch(fetchPosts(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsView);
