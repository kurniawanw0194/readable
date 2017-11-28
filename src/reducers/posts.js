import { 
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST,
  INCREMENT_COMMENT,
  DECREMENT_COMMENT
} from '../actions/posts'

const initialState = {
  isFetching: false,
  items: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.posts
      })
    case ADD_POST:
      return Object.assign({}, state, {
        items: [
          ...state.items,
          action.data
        ]
      })
    case EDIT_POST:
      return Object.assign({}, state, {
        items: state.items.map((post) => {
          if (post.id === action.id) {
            return {
              ...post,
              ...action.data
            }
          } else {
            return post
          }
        })
      })
    case VOTE_POST:
      return Object.assign({}, state, {
        items: state.items.map((post) => {
          if (post.id === action.data.id) {
            return action.data
          } else {
            return post
          }
        })
      })
    case DELETE_POST:
      return Object.assign({}, state, {
        items: state.items.map((item) => {
          if (item.id === action.data.id) {
            return action.data
          } else {
            return item
          }
        })
      })
    case INCREMENT_COMMENT:
      return Object.assign({}, state, {
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              commentCount: item.commentCount + 1
            }
          } else {
            return item
          }
        })
      })
    case DECREMENT_COMMENT:
      return Object.assign({}, state, {
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              commentCount: item.commentCount - 1
            }
          } else {
            return item
          }
        })
      })
    default:
      return state
  }
}