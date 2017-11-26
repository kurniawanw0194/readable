import { 
  REQUEST_POSTS,
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  LIKE_POST,
  DISLIKE_POST
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
        isPosting: false,
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
              ...action.updates
            }
          } else {
            return post
          }
        })
      })
    case LIKE_POST:
      return Object.assign({}, state, {
        items: state.items.map((post) => {
          if (post.id === action.id) {
            return Object.assign(post, { voteScore: post.voteScore + 1 })
          } else {
            return post
          }
        })
      })
    case DISLIKE_POST:
      return Object.assign({}, state, {
        items: state.items.map((post) => {
          if (post.id === action.id) {
            return Object.assign(post, { voteScore: post.voteScore - 1 })
          } else {
            return post
          }
        })
      })
    default:
      return state
  }
}