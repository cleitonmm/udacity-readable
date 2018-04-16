import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCategoryPosts } from "../actions";
import { withRouter } from "react-router-dom";
import PostsView from "./PostsView";

class CategoryView extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  };

  state = {
    postsErr: null
  };

  render() {
    const { category } = this.props;
    return (
      <div>
        {Object.keys(category).length !== 0 ? (
          <div>
            <div>{category.name}</div>
            <PostsView categoryFilter={category.path} />
          </div>
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    );
  }
}

const filterCategory = (categories, path) => {
  let category = {};

  if (path) {
    Object.keys(categories).map(id => {
      if (categories[id].path === path) {
        category = categories[id];
      }
    });
  }

  return category;
};

const mapStateToProps = ({ categories, postsByCategory, posts }, ownProps) => ({
  category: filterCategory(categories, ownProps.match.params.path)
});

const mapDispatchToProps = dispatch => ({
  fetchCategoryPosts: data => dispatch(fetchCategoryPosts(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
