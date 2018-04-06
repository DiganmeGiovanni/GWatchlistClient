
import EventEmmiter from 'events'
import userConstants from './UserConstants'
let AppDispatcher = require('../dispatcher/AppDispatcher')
import userService from '../services/UserService'

let EVENT_CHANGE = 'EVENT_CHANGE'

let _state = {
  user: ''
}

class UserStore extends EventEmmiter {

  addChangeListener(callback) {
    this.on(EVENT_CHANGE, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(callback)
  }

  emitChange() {
    this.emit(EVENT_CHANGE)
  }

  getState() {
    return _state
  }

  loginUser(email, name) {
    userService.loginUser(name, email, (err, body) => {
      if (err) {
        console.error('Could not login to given user')
        console.error(err)
      } else {
        body = JSON.parse(body)

        // Store logged user into store's state
        _state.user = body
        console.log(_state)
        this.emitChange()
      }
    })
  }

  logoutUser() {
    _state.user = {}
    this.emitChange()
  }
}

let userStore = new UserStore()
userStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case userConstants.ACTIONS.USER_LOGIN:
      userStore.loginUser(action.email, action.name)
      break

    case userConstants.ACTIONS.USER_LOGOUT:
      userStore.logoutUser()
      break

    case userConstants.ACTIONS.USER_UPLOAD_PREFERENCES:
      userStore.uploadUserPreferences()
      break
  }
})

export default userStore