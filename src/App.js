import React, { Component } from 'react'
import { AppBar, FloatingActionButton } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { Switch, Route, withRouter } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import PostList from './components/PostList'
import AddPost from './components/AddPost'
import EditPost from './components/EditPost'

class App extends Component {
  render() {
    return (
      <div>
        <AppBar title='Readable' showMenuIconButton={false} className={css(styles.appBar)} />
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
