
import EventEmmiter from 'events'

import MFConstants from './MFConstants'
let AppDispatcher = require('./../dispatcher/AppDispatcher')
let CHANGE_EVENT = "CH_EVENT_MOVIE_FORM"

// State defaults
let _state = {
  view: MFConstants.views.SEARCH_TMDB
}


class MovieFormStore extends EventEmmiter {

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


}

//
// Prepare movie form store instance for export
let movieFormStore = new MovieFormStore()
movieFormStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {

  }
})

export default movieFormStore