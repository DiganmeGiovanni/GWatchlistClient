
import React, {Component} from 'react'

import LConstants from './LConstants'
import ListsActions from './ListsActions'
import ListsStore from './ListsStore'
import List from './List.react'

class Lists extends Component {

  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this.onClickListenerBtnCreateList = this.onClickListenerBtnCreateList.bind(this)

    this.state = ListsStore.getState()
  }

  componentDidMount() {
    ListsStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    ListsStore.removeChangeListener(this._onChange)
  }

  render() {
    switch (this.state.currentView) {
      case LConstants.VIEW_LISTS:
        return this.renderLists()

      case LConstants.VIEW_CREATE_LIST:
        return this.renderCreateList()
    }
  }


  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(ListsStore.getState())
  }

  renderCreateList() {
    let modalBody = this.createCreateListJSX()

    return (
      <div className="modal fade" id="modal-lists" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Create list</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  {modalBody}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLists() {
    let modalBody = this.createListsJSX()

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
              {modalBody}
            </div>
          </div>
        </div>
      </div>
    )
  }

  createCreateListJSX() {

    return (
      <div className="row">
        <div className="col-xs-8 col-sm-10">
          <div className="form-group">
            <label htmlFor="inp-list-name">List name</label>
            <input
              className="form-control"
              type="text"
              name="listName"
              placeholder="Type a name for your list"
            />
          </div>
        </div>
        <div className="col-xs-4 col-sm-2 no-padding-left">
          <label>&nbsp;</label>
          <br/>
          <button className="btn btn-success">
            <span className="fa fa-plus"></span>
            <span>&nbsp;&nbsp;Create</span>
          </button>
        </div>
      </div>
    )
  }

  createListsJSX() {
    if (this.state.lists.length == 0) {

      if (this.props.loadLists) {

        // Launch 'fetch lists' action
        ListsActions.fetchListsNames(this.props.user.email)
      }

      return (
        <div className="row">
          <div className="col-xs-12">
            <div className="text-center">
              <br/>
              <span className="fa fa-spin fa-3x fa-spinner"></span>
              <br/><br/>

              <span>Fetching your lists</span>
            </div>
          </div>
        </div>
      )
    }
    else {
      var listsJSX = []
      for (var i = 0; i < this.state.lists.length; i++) {
        var list = this.state.lists[i]
        listsJSX.push(<List key={'li-' + i} list={list} />)
      }

      return (
        <div className="row">
          <div className="col-xs-12 text-right">
            <button
              className="btn btn-primary"
              onClick={this.onClickListenerBtnCreateList}
            >
              <span className="fa fa-th-list"></span>
              <span>&nbsp;&nbsp;Create list</span>
            </button>
          </div>

          <div className="col-xs-12"><br/>
            <div className="list-group">
              {listsJSX}
            </div>
          </div>
        </div>
      )
    }
  }

  onClickListenerBtnCreateList() {
    ListsActions.renderCreateLists()
  }

}

export default Lists
