
import React, {Component} from 'react'

import LConstants from './LConstants'
import ListsActions from './ListsActions'
import ListContentActions from './../listContents/ListContentActions'
import ListsStore from './ListsStore'
import List from './List.react'

class Lists extends Component {

  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this.onClickListenerBtnGoCreateList = this.onClickListenerBtnGoCreateList.bind(this)
    this.onClickListenerBtnCreateList = this.onClickListenerBtnCreateList.bind(this)
    this.onListChosen = this.onListChosen.bind(this)

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
              id="inp-list-name"
              name="listName"
              placeholder="Type a name for your list"
              type="text"
            />
            <p
              id="p-error-list-name"
              className="alert alert-danger hidden"
            >
              Please enter valid name for your list
            </p>
          </div>
        </div>
        <div className="col-xs-4 col-sm-2 no-padding-left">
          <label>&nbsp;</label>
          <br/>
          <button
            id="btn-create-list"
            className="btn btn-success"
            onClick={this.onClickListenerBtnCreateList}
          >
            <span className="fa fa-plus"></span>
            <span>&nbsp;&nbsp;Create</span>
          </button>
        </div>
      </div>
    )
  }

  createListsJSX() {
    if (this.state.lists.length === 0) {
      console.log('Fetching lists')

      // Launch 'fetch lists' action
      ListsActions.fetchListsNames(this.props.user.email)

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
      console.log('Rendering lists')

      var listsJSX = []
      for (var i = 0; i < this.state.lists.length; i++) {
        var list = this.state.lists[i]
        let listJSX = <List
          key={'li-' + i}
          list={list}
          onListChosen={this.onListChosen}
        />

        listsJSX.push(listJSX)
      }

      return (
        <div className="row">
          <div className="col-xs-12 text-right">
            <button
              className="btn btn-primary"
              onClick={this.onClickListenerBtnGoCreateList}
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

  onClickListenerBtnGoCreateList() {
    ListsActions.renderCreateLists()
  }

  onClickListenerBtnCreateList() {
    $('#p-error-list-name').addClass('hidden');

    let listName = $('#inp-list-name').val()
    if (listName && listName.trim().length > 0) {
      let $loadingIcon = $('<span>', {class: 'fa fa-spin fa-spinner'})
      $('#btn-create-list').html($loadingIcon)
      document.getElementById('btn-create-list').disabled = true

      ListsActions.postList(this.props.user.email, listName)
    }
    else {
      $('#p-error-list-name').removeClass('hidden');
    }
  }

  onListChosen(listId) {
    ListContentActions.fetchList(this.props.user.email, listId)

    // Hide lists modal
    $('#modal-lists').modal('hide')
  }
}

export default Lists
