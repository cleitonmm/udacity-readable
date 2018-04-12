import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPosts } from "../actions";
import Post from "./Post";
import { Link } from "react-router-dom";

class RootView extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired
  };

  state = {
    categoriesErr: null,
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
    const { categories, posts } = this.props;

    let postsKeys = Object.keys(posts);
    let orderedPosts = [];
    if (postsKeys.length !== 0) {
      orderedPosts = postsKeys.map(id => posts[id]).sort((a, b) => {
        return ascDesc === "desc" ? b[field] > a[field] : a[field] > b[field];
      });
    }

    return orderedPosts;
  }

  handleOrder = (field, ascDesc) => {
    const orderedPosts = this.orderPosts(field, ascDesc)
    this.setState({ orderedPosts })    
  }

  render() {
    const { categories } = this.props;
    let { orderedPosts } = this.state;

    let categoriesKeys = Object.keys(categories);

    if (orderedPosts.length === 0) orderedPosts = this.orderPosts();

    return (
      <div className="root-view">
        <div className="categories">
          <h1>Categorias</h1>
          {categoriesKeys.length !== 0 ? (
            <ul>
              {categoriesKeys.map(cat => (
                <li key={cat}>
                  <Link
                    to={{
                      pathname: `/category/${categories[cat].path}`
                    }}
                  >
                    <div>{categories[cat].name}</div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              {this.state.postsErr ? this.state.categoriesErr : "Carregando..."}
            </div>
          )}
        </div>
        <div className="posts">
          <h1>Postagens</h1>
          <div>Ordernar por:
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
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: data => dispatch(fetchPosts(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView);
