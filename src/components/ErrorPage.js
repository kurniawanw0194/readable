import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { RaisedButton } from 'material-ui'

class ErrorPage extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <h1>404</h1>
        <h2>Sorry, we can't seem to find the page you are looking for.</h2>
        <br />
        <RaisedButton label='Home' href='/' secondary={true} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '400px',
    margin: 'auto',
    paddingTop: '64px',
    verticalAlign: 'center'
  }
})

export default ErrorPage