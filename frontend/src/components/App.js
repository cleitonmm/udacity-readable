import React, { Component } from "react";
import RootView from "./RootView";
import CategoryView from "./CategoryView";
import { Route, Switch, withRouter } from "react-router-dom";
import { fetchCategories } from "../actions";
import { connect } from "react-redux";
import { filterCategory } from "../reducers";
import PropTypes from "prop-types";

class App extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  state = {
    categoriesErr: null
  };

  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.fetchCategories().catch(err => {
        console.log(err);
        this.setState({
          categoriesErr: "Ops... Ocorreu um erro ao carregar categorias!"
        });
      });
    }
  }

  render() {
    if (this.state.categoriesErr) {
      return <div className="loading-error">{this.state.categoriesErr}</div>;
    } else {
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
}

const mapStateToProps = state => ({
  categories: filterCategory(state)
});

export default withRouter(connect(mapStateToProps, { fetchCategories })(App));
