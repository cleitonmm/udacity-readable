import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostsView from './PostsView'

class RootView extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
  };

  state = {
    categoriesErr: null,
  };

  render() {
    const { categories } = this.props;

    let categoriesKeys = Object.keys(categories);

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
        <PostsView />
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return {
    categories
  };
}

export default connect(mapStateToProps, null)(RootView);
