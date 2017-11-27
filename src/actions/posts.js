import { api, headers } from '../utils/api'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'

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

export const editPost = (id, data) => {
  return dispatch => {
    return fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => dispatch({
        type: EDIT_POST,
        id: data.id,
        data
      }))
  }
}

export const votePost = (id, option) => {
  return dispatch => {
    return fetch(`${api}/posts/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option })
    }).then(res => res.json())
      .then(data => dispatch({
        type: VOTE_POST,
        data
      }))
  }
}

export const deletePost = (id) => {
  return dispatch => {
    return fetch(`${api}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => dispatch({
        type: DELETE_POST,
        data
      }))
  }
}