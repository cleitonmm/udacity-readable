import React, { Component } from "react";
import RootView from "./RootView";
import CategoriesView from "./CategoriesView";
import Header from "./Header";
import Post from "./Post";
import { Route, Switch, withRouter } from "react-router-dom";
import { fetchCategories } from "../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  static propTypes = {
    fetchCategories: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="app">
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/:path/:id" component={Post} />
          <Route path="/:path" component={CategoriesView} />
          <Route path="/" component={RootView} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchCategories })(App));
