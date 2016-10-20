
import EventEmmiter from 'events'

import LCConstants from './LCConstants'
import listService from './../services/ListService'

let AppDispatcher = require('./../dispatcher/AppDispatcher')
let CHANGE_EVENT = 'CH_EVENT_LIST_CONTENTS'

// Store default state
let _state = {
  currentList: {
    id: '',
    name: '- - -',
    movies: [],
    sharedWith: []
  }
}


class ListContentStore extends EventEmmiter {

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

  addMovieToCurrentList(movie) {
    let listId = _state.currentList.id
    console.log(_state)
    listService.postMovie(listId, movie)
  }

  renderList(list) {
    _state.currentList = list
    this.emitChange()
  }

  shareList(email) {
    listService.shareList(email, _state.currentList.id, (err, response) => {
      if (!err) {
        _state.currentList.sharedWith.push(email)
        this.emitChange()
      }
    })
  }

  viewList(ownerEmail, listId) {
    listService.fetchList(ownerEmail, listId, (err, list) => {
      if (err) {
        console.error(err)
      } else {
        this.renderList(list)
      }
    })
  }

  viewPersonalList(ownerEmail) {
    listService.fetchPersonalList(ownerEmail, (err, list) => {
      if (err) {
        console.error(err)
      } else {
        this.renderList(list)
      }
    })
  }
}

//
// Prepare list contents store instance for export
let listContentStore = new ListContentStore()
listContentStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case LCConstants.ACTION_ADD_MOVIE:
      listContentStore.addMovieToCurrentList(action.movie)
      break

    case LCConstants.ACTION_FETCH_LIST:
      var ownerEmail = action.ownerEmail
      var listId = action.listId
      listContentStore.viewList(ownerEmail, listId)
      break

    case LCConstants.ACTION_FETCH_PERSONAL_LIST:
      let ownerEmail = action.ownerEmail
      listContentStore.viewPersonalList(ownerEmail)
      break

    case LCConstants.ACTION_SHARE_LIST:
      var email = action.email
      listContentStore.shareList(email)
      break
  }
})

export default listContentStore