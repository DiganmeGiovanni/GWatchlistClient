
import LConstants from "./LConstants";

let AppDispatcher = require('./../dispatcher/AppDispatcher')

class ListsActions {

  addMovieToCurrentList(movie) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.MOVIE_CREATE,
      movie: movie
    })
  }

  deleteCurrentList() {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_DELETE_CURRENT
    })
  }

  deleteMovie(movie) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.MOVIE_DELETE,
      movie: movie
    })
  }

  displayMovieDetails(tmdbId) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.MOVIE_DISPLAY_DETAILS,
      tmdbId: tmdbId
    })
  }

  fetchList(ownerEmail, listId) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_READ,
      ownerEmail: ownerEmail,
      listId: listId
    })
  }

  fetchListsNames(email) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LISTS_READ,
      email: email
    })
  }

  fetchPersonalList(ownerEmail) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_READ_PERSONAL,
      ownerEmail: ownerEmail
    })
  }

  postList(ownerEmail, listName) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_CREATE,
      ownerEmail: ownerEmail,
      listName: listName
    })
  }

  renderCreateLists() {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_RENDER_CREATE
    })
  }

  renderLists() {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.LIST_RENDER_LISTS
    })
  }

  updateMovie(movie) {
    AppDispatcher.dispatch({
      type: LConstants.ACTIONS.MOVIE_UPDATE,
      movie: movie
    })
  }
}

let listsActions  = new ListsActions()
export default listsActions