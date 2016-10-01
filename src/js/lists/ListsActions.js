
let AppDispatcher = require('../dispatcher/AppDispatcher')
import LConstants from './LConstants'

let ListsActions = {

  fetchListsNames(email) {
    console.log('Fetching lists names')
    AppDispatcher.dispatch({
      actionType: LConstants.ACTION_FETCH_LISTS_NAMES,
      email: email
    })
  }
}

export default ListsActions