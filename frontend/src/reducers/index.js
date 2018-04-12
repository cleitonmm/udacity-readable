import { combineReducers } from 'redux'
import { ADD_CATEGORY,
         ADD_POST } from '../actions'


function categories (state = {}, action) {
    const { name, path } = action
    switch( action.type) {
        case ADD_CATEGORY:
            return {
                ...state,
                [name]: { 
                    name,
                    path,
                }
            }
        default: return state
    }
}

function posts (state = {}, action) {
    const { 
        id,
        timestamp, 
        title,
        body,
        author,
        category,
        commentCount,
        deleted,
        votescore
    } = action

    switch (action.type) {
        case ADD_POST: 
            return {
                ...state,
                [id]: {
                    id,
                    timestamp, 
                    title,
                    body,
                    author,
                    category,
                    commentCount,
                    deleted,
                    votescore,       
                }
            }
        default: return state
    }
}

export default combineReducers({
    categories,
    posts,
})

