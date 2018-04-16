import React, { Component } from "react";
import RootView from "./RootView";
import CategoryView from "./CategoryView";
import { Route, Switch, withRouter } from "react-router-dom";
import { fetchCategories } from "../actions";
import { connect } from "react-redux";

class App extends Component {
  state = {
    categoriesErr: null
  };

  componentDidMount() {
    if (Object.keys(this.props.categories).length === 0) {
      this.props.fetchCategories().catch(err =>
        this.setState({
          categoriesErr: "Ops... Ocorreu um erro ao carregar categorias!"
        })
      );
    }
  }

  render() {
    if (this.state.categoriesErr) {
      return <div className="loading-error">{this.state.categoriesErr}</div>;
    } else {
      return (
        <div className="app">
          <Switch>
            <Route exact path="/" render={() => <RootView />} />
            <Route path="/category/:path" component={CategoryView} />
          </Switch>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: data => dispatch(fetchCategories(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
