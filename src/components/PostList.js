import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, votePost, deletePost } from '../actions/posts'
import { CircularProgress, SelectField, MenuItem } from 'material-ui'
import Post from './Post'
import { StyleSheet, css } from 'aphrodite'

class PostList extends Component {
  state = {
    sortBy: 'date'
  }

  _handleLike = (id) => {
    this.props.votePost(id, 'upVote')
  }

  _handleDislike = (id) => {
    this.props.votePost(id, 'downVote')
  }

  _handleDelete = (id) => {
    this.props.deletePost(id)
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    if (this.props.posts.isFetching) {
      return (
        <div className={css(styles.progress)}>
          <CircularProgress />
        </div>
      )
    }

    return (
      <div>
        <SelectField
          floatingLabelText='Sort by'
          value={this.state.sortBy}
          onChange={(event, index, value) => this.setState({ sortBy: value })}
          className={css(styles.filter)}
        >
          <MenuItem value='date' primaryText='Date' />
          <MenuItem value='score' primaryText='Score' />
        </SelectField>
        {this.props.posts.items.filter((post) => !post.deleted).map((post) =>
          <Post
            key={post.id}
            post={post}
            onLike={this._handleLike}
            onDislike={this._handleDislike}
            onDelete={this._handleDelete}
          />
        )}
      </div>
    )
  }
}

const styles = StyleSheet.create({
  progress: {
    padding: '16px',
    textAlign: 'center'
  },
  filter: {
    margin: '16px'
  }
})

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    votePost: (id, option) => dispatch(votePost(id, option)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)