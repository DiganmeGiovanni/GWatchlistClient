
import React, {Component} from 'react'

class List extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let listName   = this.props.list.name
    let ownerEmail = this.props.list.ownerEmail
    let sharedEmailsJSX = this.getSharedWithJSX()

    return (
      <div
        className="list-group-item"
        onClick={this.props.onListChosen.bind(this, this.props.list.id)}
        style={{cursor: 'pointer'}}
      >
        <h4 className="list-group-item-heading">{listName}</h4>
        <p className="list-group-item-text">
          <span className="glyphicon glyphicon-user"></span>
          <span>&nbsp;&nbsp;{ownerEmail}</span>
          <br/>

          <span className="glyphicon glyphicon-send"></span>
          <span>&nbsp;&nbsp;{sharedEmailsJSX}</span>
        </p>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  getSharedWithJSX() {
    if (this.props.list.personal) {
      return (
        <i>This is a personal list</i>
      )
    }

    if (this.props.list.sharedWith.length == 0) {
      return <i>List not shared yet.</i>
    }

    var sharedWith = []
    for (let i = 0; i < this.props.list.sharedWith.length; i++) {
      let friendEmail = this.props.list.sharedWith[i]
      let friendJSX = (
        <span
          key={'friend-email-' + i}
          className="label label-primary"
        >
          {friendEmail}
        </span>
      )

      sharedWith.push(friendJSX)
    }

    return sharedWith
  }
}

export default List
