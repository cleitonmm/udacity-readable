import {
    ADD_CATEGORY,
    ADD_POST,
    ALL_CATEGORIES,
    ALL_POSTS
  } from "../actions";
  
  export const categories = (state = {}, action) => {
    switch (action.type) {
      case ADD_CATEGORY:
        const { name, path } = action;
        return {
          ...state,
          [name]: {
            name,
            path
          }
        };
  
      case ALL_CATEGORIES:
        return {
          ...state,
          ...action.categories
        };
  
      default:
        return state;
    }
  }
  
  export const posts = (state = {}, action) => {
    switch (action.type) {
      case ADD_POST:
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
        } = action;
  
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
            votescore
          }
        };
  
      case ALL_POSTS:
        return {
          ...state,
          ...action.posts
        };
  
      default:
        return state;
    }
  }


  export const categoriesIds = (state = [], action) => {
    switch (action.type) {
      case ADD_CATEGORY:
        return [...state, action.id]
      case ALL_CATEGORIES: 
        return Object.keys(action.categories)
      default: return state;
    }
  }

  export const postsIds = (state = [], action) => {
    switch (action.type) {
      case ADD_POST:
        return [...state, action.id]
      case ALL_POSTS: 
        return Object.keys(action.posts)
      default: return state;
    }
  }