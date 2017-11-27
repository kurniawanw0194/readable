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

    this.props.posts.items.sort((a, b) => {
      if (this.state.sortBy === 'date') {
        return a.timestamp < b.timestamp ? 1 : -1
      } else if (this.state.sortBy === 'score') {
        return a.voteScore < b.voteScore ? 1 : -1
      } else {
        return 1
      }
    })

    return (
      <div>
        <div className={css(styles.filterContainer)}>
          <SelectField
            floatingLabelText='Sort by'
            value={this.state.sortBy}
            onChange={(event, index, value) => this.setState({ sortBy: value })}
          >
            <MenuItem value='date' primaryText='Date' />
            <MenuItem value='score' primaryText='Score' />
          </SelectField>
        </div>
        {this.props.match.path === '/:category'
          ? this.props.posts.items.filter((post) => !post.deleted && post.category === this.props.match.params.category)
              .map((post) =>
                <Post
                  key={post.id}
                  post={post}
                  onLike={this._handleLike}
                  onDislike={this._handleDislike}
                  onDelete={this._handleDelete}
                />
              )
          : this.props.posts.items.filter((post) => !post.deleted).map((post) =>
              <Post
                key={post.id}
                post={post}
                onLike={this._handleLike}
                onDislike={this._handleDislike}
                onDelete={this._handleDelete}
              />
            )
        }
      </div>
    )
  }
}

const styles = StyleSheet.create({
  progress: {
    padding: '16px',
    textAlign: 'center'
  },
  filterContainer: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '16px'
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