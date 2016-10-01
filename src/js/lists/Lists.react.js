
import React, {Component} from 'react'
import ListsActions from './ListsActions'

class Lists extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lists: {
        ownerEmail: '',
        listsNames: []
      }
    }
  }

  render() {
    let modalBody = this.getModalBody()

    return (
      <div className="modal fade" id="modal-lists" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Lists</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <div className="list-group">
                    {modalBody}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getModalBody() {
    if (this.state.lists.listsNames.length == 0) {

      // Launch 'fetch lists' action
      console.log('Calling fetch lists')
      ListsActions.fetchListsNames(this.props.loggedUser.email)

      return (
        <div className="text-center">
          <br/>
          <span className="fa fa-spin fa-3x fa-spinner"></span>
          <br/><br/>

          <span>Fetching your lists</span>
        </div>
      )
    }
  }
}

export default Lists