
let AppDispatcher = require('../dispatcher/AppDispatcher')
import LConstants from './LConstants'

let ListsActions = {

  fetchListsNames(email) {
    AppDispatcher.dispatch({
      type: LConstants.ACTION_FETCH_LISTS_NAMES,
      email: email
    })
  },

  postList(ownerEmail, listName) {
    AppDispatcher.dispatch({
      type: LConstants.ACTION_POST_LIST,
      ownerEmail: ownerEmail,
      listName: listName
    })
  },

  renderCreateLists() {
    AppDispatcher.dispatch({
      type: LConstants.ACTION_RENDER_CREATE_LIST
    })
  },

  renderLists() {
    AppDispatcher.dispatch({
      type: LConstants.ACTION_RENDER_LISTS
    })
  }
}

export default ListsActions