import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CategoryView extends Component {
  static propTypes = {
    category: PropTypes.object.isRequired
  };

  render() {
    return <div>{this.props.category.name}</div>;
  }
}

function mapStateToProps({ categories, posts }, ownProps) {
  let category = {};
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

export default connect(mapStateToProps)(CategoryView);
