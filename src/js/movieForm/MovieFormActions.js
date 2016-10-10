
let AppDispatcher = require('./../dispatcher/AppDispatcher')
import MFConstants from './MFConstants'

let MovieFormActions = {

  displayMovieDetails(movie) {
    AppDispatcher.dispatch({
      type: MFConstants.actions.VIEW_MOVIE_DETAILS,
      movie: movie
    })
  },

  startAddProcess() {
    AppDispatcher.dispatch({
      type: MFConstants.actions.START_ADD_PROCESS
    })
  },

  watchYoutubeTrailers(movie) {
    AppDispatcher.dispatch({
      type: MFConstants.actions.WATCH_YOUTUBE_TRAILERS,
      movie: movie
    })
  },

  watchYoutubeTrailer(videoId, movie) {
    AppDispatcher.dispatch({
      type: MFConstants.actions.WATCH_YOUTUBE_TRAILER,
      movie: movie,
      videoId: videoId
    })
  }
}

export default MovieFormActions