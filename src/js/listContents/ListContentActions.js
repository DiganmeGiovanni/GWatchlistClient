
let AppDispatcher = require('./../dispatcher/AppDispatcher')
import LCConstants from './LCConstants'

let ListContentActions = {

  addMovieToCurrentList(movie) {
    AppDispatcher.dispatch({
      type: LCConstants.ACTION_ADD_MOVIE,
      movie: movie
    })
  },

  displayMovieDetails(tmdbId) {
    AppDispatcher.dispatch({
      type: LCConstants.ACTION_DISPLAY_DETAILS,
      tmdbId: tmdbId
    })
  },

  fetchList(ownerEmail, listId) {
    AppDispatcher.dispatch({
      type: LCConstants.ACTION_FETCH_LIST,
      ownerEmail: ownerEmail,
      listId: listId
    })
  },

  fetchPersonalList(ownerEmail) {
    AppDispatcher.dispatch({
      type: LCConstants.ACTION_FETCH_PERSONAL_LIST,
      ownerEmail: ownerEmail
    })
  }
}

export default ListContentActions