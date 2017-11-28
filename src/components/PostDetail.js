import React, { Component } from 'react'
import { TextField, IconButton, CircularProgress, RaisedButton } from 'material-ui'
import ContentSend from 'material-ui/svg-icons/content/send'
import { StyleSheet, css } from 'aphrodite'
import Timestamp from 'react-timestamp'
import { connect } from 'react-redux'
import { fetchComments, addComment, deleteComment, editComment, voteComment } from '../actions/comments'
import Comment from './Comment'
import uuid from 'uuid'
import ErrorPage from './ErrorPage'
import { votePost } from '../actions/posts'

class PostDetail extends Component {

  state = {
    comment: ''
  }

  componentDidMount() {
    const id = this.props.match.params.id

    this.props.fetchComments(id)
  }

  _submitComment = () => {
    if (this.state.comment === '') {
      return
    }

    const data = {
      id: uuid(),
      timestamp: Date.now(),
      body: this.state.comment,
      author: 'William',
      parentId: this.props.match.params.id
    }

    this.props.addComment(data)
  }

  _editComment = (id, comment) => this.props.editComment(id, comment)

  _deleteComment = (id) => this.props.deleteComment(id)

  _voteComment = (id, option) => this.props.voteComment(id, option)

  render() {
    const id = this.props.match.params.id

    let post = null
    this.props.posts.items.forEach(item => {
      if (item.id === id) {
        post = item
      }
    })
    
    if (this.props.posts.isFetching) {
      return (
        <div className={css(styles.progress)}>
          <CircularProgress />
        </div>
      )
    }

    if (!post) {
      return (
        <ErrorPage />
      )
    }

    return (
      <div className={css(styles.container)}>
        <h1>{post.title}</h1>
        <h4 className={css(styles.lightText)}>by {post.author} on <Timestamp format='date' time={post.timestamp / 1000} /> in {post.category} | votes: {post.voteScore}</h4>
        <br />
        <p>{post.body}</p>
        <br />
        <RaisedButton label='Like' primary={true} onClick={() => this.props.votePost(post.id, 'upVote')} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <RaisedButton label='Dislike' secondary={true} onClick={() => this.props.votePost(post.id, 'downVote')} />
        <br />
        <br />
        <br />
        <h3>{post.commentCount} comments:</h3>
        {this.props.comments.filter((comment) => !comment.deleted).map((comment) =>
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={this._editComment}
            onDelete={this._deleteComment}
            onVote={this._voteComment} />
        )}
        <div className={css(styles.commentFormContainer)}>
          <TextField
            hintText='Write comment here...'
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
          />
          <IconButton onClick={this._submitComment}>
            <ContentSend />
          </IconButton>
        </div>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '16px'
  },
  progress: {
    padding: '16px',
    textAlign: 'center'
  },
  lightText: {
    color: '#aaaaaa'
  },
  commentFormContainer: {
    textAlign: 'right'
  }
})

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    comments: state.comments.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (postId) => dispatch(fetchComments(postId)),
    addComment: (data) => dispatch(addComment(data)),
    editComment: (id, data) => dispatch(editComment(id, data)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    voteComment: (id, option) => dispatch(voteComment(id, option)),
    votePost: (id, option) => dispatch(votePost(id, option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)