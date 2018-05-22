import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;

    let formattedDate = "";
    let formattedTime = "";
    let dateNow = new Date().toLocaleDateString("pt-BR");
    if (post.timestamp) {
      let dateTime = new Date(post.timestamp);
      formattedDate = dateTime.toLocaleDateString("pt-BR");
      formattedTime = dateTime.toLocaleTimeString("pt-BR", {
        hour: "numeric",
        minute: "numeric"
      });
    }

    return (
      <div className="container">
        <table className="d-table d-inline-block w-100">
          <tbody>
            <tr>
              <th className="d-table-cell img-post-preview p-3 w-25">
                <img
                  className="rounded-circle img-post-preview"
                  src="https://picsum.photos/50/?random"
                  alt="profile"
                />
              </th>
              <th className="d-table-cell w-50">
                <Link
                  to={{
                    pathname: `/post/${post.id}`
                  }}
                >
                  {post.title}
                </Link>
                <footer className="blockquote-footer">
                  <span className="ml-2 text-left">{post.author}</span>
                  <span className="ml-2 text-secondary small text-center">
                    {formattedDate === dateNow
                      ? ` Às ${formattedTime}`
                      : ` Em ${formattedDate}`}
                  </span>
                </footer>
              </th>
              <th className="d-table-cell w-25 text-center">
                <span
                  className={
                    post.voteScore >= 0 ? "text-success" : "text-danger"
                  }
                >
                  {post.voteScore}
                </span>
                <span className="d-block text-secondary">Score</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PostPreview;
