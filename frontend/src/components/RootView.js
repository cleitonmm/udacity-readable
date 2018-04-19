import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PostsView from "./PostsView";
import {
  filterCategory,
  isFetchingCategories,
  getCategoriesError
} from "../reducers";

class RootView extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    fetchError: PropTypes.object
  };

  static defaultProps = {
    isFetching: false,
  }

  render() {
    const { categories, isFetching, fetchError } = this.props;
    return (
      <div className="root-view">
        {!isFetching ? (
          !fetchError ? (
            <div className="categories">
              <h1>Categorias</h1>
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
              <PostsView />
            </div>
          ) : (
            <div>
              <span>Ops... ocorreu um erro ao buscar informações.</span>
              {console.log(fetchError)}
            </div>
          )
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: filterCategory(state),
  isFetching: isFetchingCategories(state),
  fetchError: getCategoriesError(state)
});

export default connect(mapStateToProps)(RootView);
