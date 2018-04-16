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

  componentDidUpdate() {
    if (this.props.category) {
      this.props.fetchCategoryPosts(this.props.category.name).catch(err => {
        console.log(err);
        this.setState({
          postsErr: "Ops... Ocorreu um erro ao carregar postagens!"
        });
      });
    }
  }

  render() {
    const { category } = this.props;
    return (
      <div>
        <div>{category.name}</div>
        <PostsView category={category} />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, postsByCategory, posts }, ownProps) => {
  let category = {};
  let postsId = [];

  if (ownProps.match) {
    Object.keys(categories).map(id => {
      if (categories[id].path === ownProps.match.params.path) {
        category = categories[id];
      }
    });
  } else if (ownProps.category) category = ownProps.category;

  return {
    category
  };
}

const mapDispatchToProps = dispatch => ({
  fetchCategoryPosts: data => dispatch(fetchCategoryPosts(data))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
