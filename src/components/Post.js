import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardText, CardActions, FlatButton } from 'material-ui'
import { StyleSheet, css } from 'aphrodite'
import avatar from '../assets/avatar.png'
import Timestamp from 'react-timestamp'

class Post extends Component {
  state = {
    expanded: false
  }

  _handleExpandChange = (expanded) => this.setState({ expanded })

  _handleLike = () => this.props.onLike(this.props.post.id)

  _handleDislike = () => this.props.onDislike(this.props.post.id)

  render() {
    const { post } = this.props
    return (
      <div className={css(styles.container)}>
        <Card expanded={this.state.expanded} onExpandChange={this._handleExpandChange}>
          <CardHeader
            title={post.author}
            subtitle={(<Timestamp format='full' time={post.timestamp / 1000} />)}
            avatar={avatar}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardTitle
            title={post.title}
            subtitle={`${post.category} | ${post.commentCount} comments | ${post.voteScore} votes`}
            actAsExpander={true}
          />
          <CardText expandable={true}>
            <p className={css(styles.postBody)}>{post.body}</p>
          </CardText>
          <CardActions expandable={true} className={css(styles.cardActions)}>
            <FlatButton label='Like' onClick={this._handleLike} />
            <FlatButton label='Dislike' onClick={this._handleDislike} />
            <FlatButton label='Comment' />
          </CardActions>
        </Card>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: '16px'
  },
  cardActions: {
    textAlign: 'right'
  },
  postBody: {
    fontSize: '16px'
  },
  status: {
    fontSize: '12px'
  }
})

export default Post