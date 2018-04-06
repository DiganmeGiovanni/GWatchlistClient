
import userConstants from './UserConstants'
let AppDispatcher = require('../dispatcher/AppDispatcher')

let userActions = {

  loginUser(email, name) {
    AppDispatcher.dispatch({
      type: userConstants.ACTIONS.USER_LOGIN,
      name: name,
      email: email
    })
  }


}

export default userActions