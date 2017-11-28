import { api, headers } from '../utils/api'
import { incrementComment, decrementComment } from './posts'

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export const requestComments = () => {
  return {
    type: REQUEST_COMMENTS
  }
}

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export const fetchComments = (postId) => {
  return dispatch => {
    dispatch(requestComments())
    return fetch(`${api}/posts/${postId}/comments`, { headers })
      .then(res => res.json())
      .then(data => dispatch(receiveComments(data)))
  }
}

export const addComment = (data) => {
  return dispatch => {
    return fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => {
          dispatch({
          type: ADD_COMMENT,
          data
        })
        dispatch(incrementComment(data.parentId))
      })
  }
}

export const editComment = (id, data) => {
  return dispatch => {
    return fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(data => dispatch({
        type: EDIT_COMMENT,
        id: data.id,
        data
      }))
  }
}

export const deleteComment = (id) => {
  return dispatch => {
    return fetch(`${api}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        dispatch({
          type: DELETE_COMMENT,
          data
        })
        dispatch(decrementComment(data.parentId))
      })
  }
}

export const voteComment = (id, option) => {
  return dispatch => {
    return fetch(`${api}/comments/${id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ option })
    }).then(res => res.json())
      .then(data => dispatch({
        type: VOTE_COMMENT,
        data
      }))
  }
}