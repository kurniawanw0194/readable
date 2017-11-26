import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likePost, dislikePost, fetchPosts } from '../actions/posts'
import { CircularProgress } from 'material-ui'
import Post from './Post'
import { StyleSheet, css } from 'aphrodite'

class PostList extends Component {
  _handleLike = (id) => {
    this.props.like(id)
  }

  _handleDislike = (id) => {
    this.props.dislike(id)
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
        {this.props.posts.items.filter((post) => !post.deleted).map((post) =>
          <Post
            key={post.id}
            post={post}
            onLike={this._handleLike}
            onDislike={this._handleDislike}
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
    like: (id) => dispatch(likePost(id)),
    dislike: (id) => dispatch(dislikePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)