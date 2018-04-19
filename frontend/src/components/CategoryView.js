import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCategoryPosts } from "../actions";
import { withRouter } from "react-router-dom";
import PostsView from "./PostsView";
import { filterCategory } from "../reducers";

class CategoryView extends Component {
  static propTypes = {
    category: PropTypes.array.isRequired
  };

  render() {
    const { category } = this.props;
    return (
      <div>
        {category.length !== 0 ? (
          category.map(cat => (
            <div key={cat.name}>
              <div>{cat.name}</div>
              <PostsView categoryFilter={cat.path} />
            </div>
          ))
        ) : (
          <div>Carregando...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  category: filterCategory(state, ownProps.match.params.path ? ownProps.match.params.path : "none")
});

export default withRouter(
  connect(mapStateToProps, { fetchCategoryPosts })(CategoryView)
);
