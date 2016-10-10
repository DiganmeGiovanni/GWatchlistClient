
import EventEmmiter from 'events'

import MFConstants from './MFConstants'
let AppDispatcher = require('./../dispatcher/AppDispatcher')
let tmdbService = require('./../services/tmdbService')

let CHANGE_EVENT = "CH_EVENT_MOVIE_FORM"

// State defaults
let _state = {
  view: MFConstants.views.SEARCH_TMDB,
  movie: {},
  videoId: ''                           // Trailer currently selected
}


class MovieFormStore extends EventEmmiter {

  constructor() {
    super()
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return _state
  }

  //////////////////////////////////////////////////////////////////////////////

  startAddProcess() {
    _state.view = MFConstants.views.SEARCH_TMDB
    _state.movie = {}
    this.emitChange()
  }

  viewMovieDetails(movie) {
    tmdbService.fetchMovieDetails(movie.tmdbId, (err, body) => {
      if (err) {
        console.error(err)
      } else {
        body = JSON.parse(body)

        var genres = []
        for (var i = 0; i < body.genres.length; i++) {
          genres.push(body.genres[i].name)
        }

        var directors = []
        for (var i = 0; i < body.credits.crew.length; i++) {
          var currCrew = body.credits.crew[i]
          if (currCrew.job === 'Director') {
            directors.push(currCrew.name)
          }
        }

        movie.genres = genres
        movie.directors = directors

        _state.view = MFConstants.views.MOVIE_DETAILS
        _state.movie = movie
        this.emitChange()
      }
    })
  }

  watchYoutubeTrailers(movie) {
    _state.view = MFConstants.views.WATCH_YOUTUBE_TRAILERS
    _state.movie = movie
    this.emitChange()
  }

  watchYoutubeTrailer(videoId, movie) {
    _state.view = MFConstants.views.WATCH_YOUTUBE_TRAILER
    _state.movie = movie
    _state.videoId = videoId
    this.emitChange()
  }
}

//
// Prepare movie form store instance for export
let movieFormStore = new MovieFormStore()
movieFormStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {

    case MFConstants.actions.VIEW_MOVIE_DETAILS:
      let movie = action.movie
      movieFormStore.viewMovieDetails(movie)
      break

    case MFConstants.actions.START_ADD_PROCESS:
      movieFormStore.startAddProcess()
      break

    case MFConstants.actions.WATCH_YOUTUBE_TRAILERS:
      movieFormStore.watchYoutubeTrailers(action.movie)
      break

    case MFConstants.actions.WATCH_YOUTUBE_TRAILER:
      movieFormStore.watchYoutubeTrailer(action.videoId, action.movie)
      break
  }
})

export default movieFormStore