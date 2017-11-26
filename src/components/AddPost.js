import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { TextField, RaisedButton, RadioButtonGroup, RadioButton } from 'material-ui'
import uuid from 'uuid'
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

class AddPost extends Component {
  state = {
    title: '',
    body: '',
    categories: [],
    selectedCategory: ''
  }

  _handleSubmit = () => {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: 'William',
      category: this.state.selectedCategory
    }

    this.props.addPost(post)
    this.props.history.push('/')
  }

  componentDidMount() {
    api.getCategories().then((categories) => {
      this.setState({ 
        categories
      })
    })
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <h1>Add Post</h1>
        <div className={css(styles.form)}>
          <TextField
            floatingLabelText='Title'
            fullWidth={true}
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })} />
          <br />
          <TextField
            floatingLabelText='Body'
            fullWidth={true}
            multiLine={true}
            rowsMax={10}
            rows={4}
            value={this.state.body}
            onChange={(e) => this.setState({ body: e.target.value })} />
          <br />
          <h4>Select Category</h4>
          <RadioButtonGroup
            name='categories'
            onChange={(e) => this.setState({ selectedCategory: e.target.value })}
          >
            {this.state.categories.map((category) => <RadioButton key={category.name} label={category.name} value={category.name} className={css(styles.radioButton)} />)}
          </RadioButtonGroup>
        </div>
        <RaisedButton label='Submit' secondary={true} onClick={this._handleSubmit} />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: '16px 64px 16px 64px'
  },
  form: {
    marginTop: '16px',
    marginBottom: '32px'
  },
  radioButton: {
    marginBottom: '8px'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (data) => dispatch(addPost(data))
  }
}

export default connect(null, mapDispatchToProps)(AddPost)