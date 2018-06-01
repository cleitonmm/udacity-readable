import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCategoryPosts } from "../actions";
import { withRouter, Redirect } from "react-router-dom";
import PostsView from "./PostsView";
import { getAllCategories } from "../reducers";
import ListCategories from "./ListCategories";
import ReactLoading from "react-loading";

class CategoriesView extends Component {
  static propTypes = {
    category: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
  };

  render() {
    const { category, categories } = this.props;
    if (category.length === 0) return <Redirect to="/" />;
    return (
      <div>
        {category.length !== 0 ? (
          category.map(cat => (
            <div key={cat.name}>
              <ListCategories cats={categories} selected={cat} />
              <PostsView categoryFilter={cat.path} />
            </div>
          ))
        ) : (
          <ReactLoading type="bars" color="#222" />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.match.params.path ? ownProps.match.params.path : "none";
  const categories = getAllCategories(state);
  const category = categories.filter(category => category.path === path);
  return {
    category,
    categories
  };
};

export default withRouter(
  connect(mapStateToProps, { fetchCategoryPosts })(CategoriesView)
);
