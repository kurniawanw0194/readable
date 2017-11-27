import {
  REQUEST_COMMENTS,
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT
} from '../actions/comments'

const initialState = {
  isFetching: false,
  items: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.comments
      })
    case ADD_COMMENT:
      return Object.assign({}, state, {
        items: [
          ...state.items,
          action.data
        ]
      })
    case EDIT_COMMENT:
      return Object.assign({}, state, {
        items: state.items.map((comment) => {
          if (comment.id === action.id) {
            return {
              ...comment,
              ...action.data
            }
          } else {
            return comment
          }
        })
      })
    case VOTE_COMMENT:
      return Object.assign({}, state, {
        items: state.items.map((comment) => {
          if (comment.id === action.data.id) {
            return action.data
          } else {
            return comment
          }
        })
      })
    case DELETE_COMMENT:
      return Object.assign({}, state, {
        items: state.items.map((item) => {
          if (item.id === action.data.id) {
            return action.data
          } else {
            return item
          }
        })
      })
    default:
      return state
  }
}