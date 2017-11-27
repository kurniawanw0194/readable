import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { TextField, RaisedButton, RadioButtonGroup, RadioButton, Snackbar } from 'material-ui'
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { editPost } from '../actions/posts'

class EditPost extends Component {
  state = {
    title: '',
    body: '',
    categories: [],
    selectedCategory: '',
    openSnackbar: false
  }

  _handleSave = () => {
    if (this.state.title === '' || this.state.body === '' || this.state.selectedCategory === '') {
      this.setState({ openSnackbar: true })
      return
    }

    const id = this.props.match.params.id

    const post = {
      title: this.state.title,
      body: this.state.body,
      category: this.state.selectedCategory
    }

    this.props.editPost(id, post)
    this.props.history.push('/')
  }

  _handleCloseSnackbar = () => this.setState({ openSnackbar: false })

  componentDidMount() {
    api.getCategories().then((categories) => {
      this.setState({ 
        categories
      })

      api.getPostDetail(this.props.match.params.id).then((post) => {
        this.setState({
          title: post.title,
          body: post.body,
          selectedCategory: post.category
        })
      })
    })
  }
  
  render() {
    return (
      <div className={css(styles.container)}>
      <h1>Edit Post</h1>
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
          valueSelected={this.state.selectedCategory}
          onChange={(e) => this.setState({ selectedCategory: e.target.value })}
        >
          {this.state.categories.map((category) => <RadioButton key={category.name} label={category.name} value={category.name} className={css(styles.radioButton)} />)}
        </RadioButtonGroup>
      </div>
      <RaisedButton label='Save' secondary={true} onClick={this._handleSave} />
      <Snackbar
        open={this.state.openSnackbar}
        message='Required fields cannot be empty.'
        autoHideDuration={3000}
        onRequestClose={this._handleCloseSnackbar}
      />
    </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '32px'
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
    editPost: (id, data) => dispatch(editPost(id, data))
  }
}

export default connect(null, mapDispatchToProps)(EditPost)