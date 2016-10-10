
let AppDispatcher = require('./../dispatcher/AppDispatcher')
import LCConstants from './../listContents/LCConstants'

let ListShareActions = {

  shareList(email) {
    AppDispatcher.dispatch({
      type: LCConstants.ACTION_SHARE_LIST,
      email: email,
    })
  }
}

export default ListShareActions