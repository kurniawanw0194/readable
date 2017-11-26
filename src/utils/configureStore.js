import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import posts from '../reducers/posts'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore () {
  return createStore(
    combineReducers({
      posts
    }),
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}