import React, { Component } from "react";
import RootView from "./RootView";
import CategoryView from "./CategoryView";
import { Route, Switch, withRouter } from "react-router-dom";
import { fetchCategories } from "../actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
        <Switch>
          <Route exact path="/" component={RootView} />
          <Route path="/category/:path" component={CategoryView} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, { fetchCategories })(App));
