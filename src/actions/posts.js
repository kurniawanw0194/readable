import { api, headers } from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const LIKE_POST = 'LIKE_POST'
export const DISLIKE_POST = 'DISLIKE_POST'

export const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  }
}

export const receivePosts = (data) => {
  return {
    type: RECEIVE_POSTS,
    posts: data
  }
}

export const fetchPosts = () => {
  return dispatch => {
    dispatch(requestPosts())
    return fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .then(data => dispatch(receivePosts(data)))
  }
}

export const addPost = (data) => {
  return dispatch => {
    return fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => dispatch({
        type: ADD_POST,
        data
      }))
  }
}

export const editPost = (id, updates) => {
  return {
    type: EDIT_POST,
    id,
    updates
  }
}

export const likePost = (id) => {
  return {
    type: LIKE_POST,
    id
  }
}

export const dislikePost = (id) => {
  return {
    type: DISLIKE_POST,
    id
  }
}