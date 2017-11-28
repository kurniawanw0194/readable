import React, { Component } from 'react'
import { AppBar, FloatingActionButton, Drawer, IconButton, MenuItem } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import { Switch, Route, withRouter } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import PostList from './components/PostList'
import AddPost from './components/AddPost'
import EditPost from './components/EditPost'
import PostDetail from './components/PostDetail'
import ErrorPage from './components/ErrorPage'
import * as api from './utils/api'

class App extends Component {

  state = {
    openDrawer: false,
    categories: []
  }

  componentDidMount() {
    api.getCategories().then(categories => this.setState({ categories }))
  }

  _handleRedirectToHome = () => this.props.history.push('/')

  _handleOpenDrawer = () => this.setState({ openDrawer: true })

  _handleCloseDrawer = () => this.setState({ openDrawer: false })

  render() {
    return (
      <div>
        <AppBar title='Readable' onLeftIconButtonTouchTap={this._handleOpenDrawer} onTitleTouchTap={this._handleRedirectToHome} className={css(styles.appBar)} />
        <Drawer open={this.state.openDrawer} docked={false}>
          <IconButton onClick={this._handleCloseDrawer}>
            <NavigationClose />
          </IconButton>
          {this.state.categories.map(category =>
            <MenuItem
            key={category.name}
            href={`/${category.name}`}
            >
              {category.name}
            </MenuItem>
          )}
        </Drawer>
        <div className={css(styles.content)}>
          <Switch>
            <Route
              exact
              path='/'
              component={PostList}
            />
            <Route
              exact
              path='/add'
              component={AddPost}
            />
            <Route
              exact
              path='/edit/:id'
              component={EditPost}
            />
            <Route
              exact
              path='/:category/:id'
              component={PostDetail}
            />
            <Route
              exact
              path='/:category'
              component={PostList}
            />
            <Route
              component={ErrorPage}
            />
          </Switch>
        </div>
        {this.props.location.pathname === '/' &&
          <FloatingActionButton className={css(styles.fab)} href='/add'>
            <ContentAdd />
          </FloatingActionButton>
        }
      </div>
    )
  }
}

const styles = StyleSheet.create({
  appBar: {
    position: 'fixed',
    top: '0px'
  },
  content: {
    marginTop: '64px'
  },
  fab: {
    position: 'fixed',
    right: '16px',
    bottom: '16px'
  }
})

export default withRouter(App)
