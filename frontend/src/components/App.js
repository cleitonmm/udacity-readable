import React, { Component } from "react";
import RootView from "./RootView";
import CategoriesView from "./CategoriesView";
import ButtonNewPost from "./ButtonNewPost";
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

  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <div className="app">
        <Route path="/" component={ButtonNewPost} />
        <Switch>
          <Route exact path="/" component={RootView} />
          <Route path="/category/:path" component={CategoriesView} />
          <Route path="/post/:id" component={Post} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchCategories })(App));
