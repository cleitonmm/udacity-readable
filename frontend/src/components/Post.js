import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Post extends Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
    }

    render () {
        return <div>
            {this.props.post.title} - {this.props.post.timestamp}
        </div>    
    }
}

export default Post