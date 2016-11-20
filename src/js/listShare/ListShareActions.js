
let AppDispatcher = require('./../dispatcher/AppDispatcher')
import LConstants from "./../lists/LConstants";

let ListShareActions = {

  shareList(email) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_SHARE,
      email: email,
    })
  }
}

export default ListShareActions