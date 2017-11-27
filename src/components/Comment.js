import React, { Component } from 'react'
import { StyleSheet, css } from 'aphrodite'
import { Card, CardHeader, CardText, CardActions, FlatButton, Dialog, TextField } from 'material-ui'
import avatar from '../assets/avatar.png'
import Timestamp from 'react-timestamp'

class Comment extends Component {

  state = {
    comment: '',
    openEditDialog: false,
    openDeleteDialog: false
  }

  componentDidMount() {
    this.setState({
      comment: this.props.comment.body
    })
  }

  _handleOpenEditDialog = () => this.setState({ openEditDialog: true })
  
  _handleCloseEditDialog = () => this.setState({ openEditDialog: false })

  _handleOpenDeleteDialog = () => this.setState({ openDeleteDialog: true })

  _handleCloseDeleteDialog = () => this.setState({ openDeleteDialog: false })

  _handleEdit = () => {
    this.state.comment !== '' && this.props.onEdit(this.props.comment.id, {body: this.state.comment})

    this._handleCloseEditDialog()
  }

  _handleDelete = () => this.props.onDelete(this.props.comment.id)

  _handleLike = () => this.props.onVote(this.props.comment.id, 'upVote')

  _handleDislike = () => this.props.onVote(this.props.comment.id, 'downVote')

  render() {
    const { comment } = this.props

    const editDialogActions = [
      <FlatButton
        label='Cancel'
        onClick={this._handleCloseEditDialog}
      />,
      <FlatButton
        label='Submit'
        onClick={this._handleEdit}
      />,
    ]

    const deleteDialogActions = [
      <FlatButton
        label='No'
        onClick={this._handleCloseDeleteDialog}
      />,
      <FlatButton
        label='Yes'
        onClick={this._handleDelete}
      />,
    ]

    return (
      <div className={css(styles.container)}>
        <Card>
          <CardHeader
            title={`${comment.author} (${comment.voteScore})`}
            subtitle={<Timestamp format='full' time={comment.timestamp / 1000}/>}
            avatar={avatar}
          />
          <CardText>
            {comment.body}
          </CardText>
          <CardActions className={css(styles.cardActions)}>
            <FlatButton label='Delete' secondary={true} onClick={this._handleOpenDeleteDialog} />
            <FlatButton label='Edit' primary={true} onClick={this._handleOpenEditDialog} />
            <FlatButton label='Like' onClick={this._handleLike} />
            <FlatButton label='Dislike' onClick={this._handleDislike} />
          </CardActions>
        </Card>
        <Dialog
          title='Edit Comment'
          actions={editDialogActions}
          modal={false}
          open={this.state.openEditDialog}
          onRequestClose={this._handleCloseEditDialog}
        >
          <TextField
            hintText='Write comment here...'
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })} />
        </Dialog>
        <Dialog
          title='Delete Comment'
          actions={deleteDialogActions}
          modal={false}
          open={this.state.openDeleteDialog}
          onRequestClose={this._handleCloseDeleteDialog}
        >
          Are you sure?
        </Dialog>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginBottom: '16px'
  },
  cardActions: {
    textAlign: 'right'
  },
})

export default Comment