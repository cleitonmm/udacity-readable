import React, { Component } from "react";
import { editPost, delPost, addPost, openPostModal } from "../actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { filterCategory } from "../reducers";
import Modal from "react-modal";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class PostCreator extends Component {
  static propTypes = {
    post: PropTypes.object,
    categories: PropTypes.array,
    type: PropTypes.oneOf(["EDIT", "ADD", "DELETE"]).isRequired
  };

  state = {
    dropdownOpen: false,
    selectedCategory: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.post) {
      return {
        selectedCategory: nextProps.categories.filter(
          cat => cat.path === nextProps.post.category
        )[0]
      };
    }

    return null;
  }

  handleEditAdd = () => {
    const { type, category } = this.props;
    const data = new FormData(this.form);

    if (type === "EDIT") {
      const post = {
        id: this.props.post.id,
        title: data.get("title"),
        body: data.get("body"),
        category: this.state.category.path
      };

      this.props.editPost(post.id, post.title, post.body);
    }

    if (type === "ADD") {
      const post = {
        title: data.get("title"),
        body: data.get("body"),
        author: "cleiton",
        category: this.state.category.path
      };

      this.props.addPost(post);
    }
  };

  handleDelete = () => {
    const { delPost, post } = this.props;

    delPost(post.id);
  };

  closeModal = () => {
    this.props.openPostModal(this.props.post, false, false, false);
  };

  editAdd = () => {
    const { post, type, categories } = this.props;
    const { dropdownOpen, selectedCategory } = this.state;

    return (
      <div className="form-group col">
        <form ref={form => (this.form = form)}>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            className="form-control"
            defaultValue={type === "EDIT" ? post.title : ""}
            autoFocus
          />
          <span>Post:</span>
          <textarea
            name="body"
            className="form-control"
            rows="8"
            defaultValue={type === "EDIT" ? post.body : ""}
          />
          <span>Category:</span>
          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={() =>
              this.setState({
                dropdownOpen: !this.state.dropdownOpen
              })
            }
          >
            <DropdownToggle caret color="primary-outline">
              {this.state.selectedCategory
                ? this.state.selectedCategory.name.charAt(0).toUpperCase() +
                  this.state.selectedCategory.name.slice(1).toLowerCase()
                : "Pick a Category"}
            </DropdownToggle>
            <DropdownMenu>
              {categories.map(cat => (
                <DropdownItem
                  key={cat.path}
                  onClick={() => this.setState({ selectedCategory: cat })}
                >
                  {cat.name.charAt(0).toUpperCase() +
                    cat.name.slice(1).toLowerCase()}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        </form>

        <div className="btn-group-save-cancel m-2 text-right">
          <button
            onClick={e => this.handleEditAdd()}
            className="btn btn-outline-primary m-1 btn-save-cancel"
          >
            Save
          </button>
          <button
            onClick={e => this.closeModal()}
            className="btn btn-outline-secondary m-1 btn-save-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  delete = () => {
    return (
      <div className="form-group col">
        <h5>This post will be deleted. Are you sure?</h5>

        <div className="btn-group-save-cancel m-2 text-right">
          <button
            onClick={e => this.handleDelete()}
            className="btn btn-outline-danger m-1 btn-save-cancel"
          >
            Delete
          </button>
          <button
            onClick={e => this.closeModal()}
            className="btn btn-outline-secondary m-1 btn-save-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  render() {
    const { type } = this.props;
    return (
      <Modal
        className="comment-modal"
        overlayClassName="overlay"
        isOpen={true}
        contentLabel="Modal"
        appElement={document.getElementById("root")}
      >
        {type === "EDIT" && this.editAdd()}
        {type === "ADD" && this.editAdd()}
        {type === "DELETE" && this.delete()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: filterCategory(state)
});

export default withRouter(
  connect(mapStateToProps, { editPost, delPost, addPost, openPostModal })(
    PostCreator
  )
);
