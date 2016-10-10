
let AppDispatcher = require('./../dispatcher/AppDispatcher')
import LCConstants from './LCConstants'

let ListContentActions = {

  fetchList(ownerEmail, listId) {
    AppDispatcher.dispatch({
      type: LCConstants.ACTION_FETCH_LIST,
      ownerEmail: ownerEmail,
      listId: listId
    })
  }
}

export default ListContentActions