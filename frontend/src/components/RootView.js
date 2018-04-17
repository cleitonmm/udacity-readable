import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostsView from "./PostsView";
import { filterCategory } from "../reducers";

class RootView extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  state = {
    categoriesErr: null
  };

  render() {
    const { categories } = this.props;
    return (
      <div className="root-view">
        <div className="categories">
          <h1>Categorias</h1>
          {categories.length !== 0 ? (
            <ul>
              {categories.map(cat => (
                <li key={cat.name}>
                  <Link
                    to={{
                      pathname: `/category/${cat.path}`
                    }}
                  >
                    <div>{cat.name}</div>
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
        <PostsView />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: filterCategory(state)
});

export default connect(mapStateToProps)(RootView);
