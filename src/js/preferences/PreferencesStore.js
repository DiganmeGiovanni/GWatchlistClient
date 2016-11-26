
import EventEmmiter from 'events'
import PConstants from './PConstants'
import userService from '../services/UserService'

let AppDispatcher = require('../dispatcher/AppDispatcher')
let ToWatchConstants = require('../constants/toWatchConstants')
let CHANGE_EVENT = 'CHANGE_EVENT'


class PreferencesStore extends EventEmmiter {

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  updatePreferences() {
    userService.updatePreferences((err, body) => {
      if (err) {
        console.error('Error updating user preferences')
        console.error(err)
      }
    })
  }
}

//
// Prepare preferences store instance for export
let preferencesStore = new PreferencesStore()
preferencesStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.type) {
    case PConstants.ACTIONS.POST_PREFERENCES:
      preferencesStore.updatePreferences()
      break
  }
})

export default preferencesStore