import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { vote } from "../actions";
import * as FontAwesome from "react-icons/lib/fa";

class VoteScore extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    vote: PropTypes.func.isRequired,
    error: PropTypes.string,
    isManipulating: PropTypes.bool
  };

  state = {
    score: undefined,
    error: null
  };


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (prevState.score === undefined)
      return {
        score: nextProps.score,
        error: null
      };
    if (nextProps.error)
      return {
        score: nextProps.score,
        error: nextProps.error
      };

    return null;
  }

  handleVote(option) {
    const { type, id, vote } = this.props;
    const { score } = this.state;
    let newScore = score;
    if (option === "upVote") newScore += 1;
    else if (option === "downVote") newScore -= 1;

    this.setState({ score: newScore, error: null });

    vote(id, option, type);
  }

  render() {
    const { score, error } = this.state;
    const { isManipulating } = this.props;

    let color = "text-secondary";
    if (score > 0) color = "text-success";
    else if (score < 0) color = "text-danger";

    color += " font-weight-bold p-0 mr-1";
    return (
      <footer className="text-right p-0 m-0 mb-1">
        <div className={color} style={{width: "20px", display: "inline-block"}}>{score}</div>
        <button
          type="button"
          className="btn btn-outline-success btn-sm p-0 mr-1"
          disabled={isManipulating}
          onClick={e => this.handleVote("upVote")}
        >
          <FontAwesome.FaThumbsOUp size={20} />
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm p-0 mr-1"
          disabled={isManipulating}
          onClick={e => this.handleVote("downVote")}
        >
          <FontAwesome.FaThumbsODown size={20} />
        </button>
      </footer>
    );
  }
}

export default withRouter(connect(null, { vote })(VoteScore));
