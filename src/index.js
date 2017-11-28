import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import configureStore from './utils/configureStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { fetchPosts } from './actions/posts'

const store = configureStore()

store.dispatch(fetchPosts())

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>, document.getElementById('root'))

registerServiceWorker()
