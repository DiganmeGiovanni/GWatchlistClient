
import EventEmmiter from 'events'

import LConstants from './LConstants'
import listService from './../services/ListService'
let AppDispatcher = require('./../dispatcher/AppDispatcher')


let CHANGE_EVENT = 'CH_EVENT_LISTS'
let _state = {
  currentView: LConstants.VIEW_LISTS,
  lists: []
}

class ListsStore extends EventEmmiter {

  constructor() {
    super()
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return _state
  }

  //////////////////////////////////////////////////////////////////////////////

  fetchListsNames(email) {

    listService.fetchListsNames(email, (err, jResponse) => {
      if (err) {
        console.error(err)
      } else {
        _state.lists = jResponse
        this.emitChange()
      }
    })
  }

  renderCreateList() {
    _state.currentView = LConstants.VIEW_CREATE_LIST
    this.emitChange()
  }

  renderLists() {
    _state.currentView = LConstants.VIEW_LISTS
    this.emitChange()
  }
}

//
// Prepare list store instance for export
let listStore = new ListsStore()

//
// Capture actions
listStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case LConstants.ACTION_FETCH_LISTS_NAMES:
      var email = action.email
      listStore.fetchListsNames(email)
      break

    case LConstants.ACTION_RENDER_CREATE_LIST:
      listStore.renderCreateList()
      break

    case LConstants.ACTION_RENDER_LISTS:
      listStore.renderLists()
      break
  }
})

export default listStore