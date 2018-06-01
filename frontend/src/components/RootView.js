import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostsView from "./PostsView";
import ListCategories from "./ListCategories";
import ReactLoading from "react-loading";
import {
  getAllCategories,
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
            <div>
            <ListCategories cats={categories} />
            <PostsView />
            </div>
          ) : (
            <div>
              <span>Ops... something went wrong!</span>
              {console.log(fetchError)}
            </div>
          )
        ) : (
          <ReactLoading type="bars" color="#222" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: getAllCategories(state),
  isFetching: isFetchingCategories(state),
  fetchError: getCategoriesError(state)
});

export default connect(mapStateToProps)(RootView);
