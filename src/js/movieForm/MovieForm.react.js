
import React from 'react'

import MFConstants from './MFConstants'
import MovieFormStore from './MovieFormStore'
import SearchTMDB from './SearchTMDB.react'
import MovieDetails from './MovieDetails.react'
import YoutubeTrailersList from './YoutubeTrailersList.react'
import YoutubeTrailerPlayer from './YoutubeTrailerPlayer.react'

class MovieForm extends React.Component {

  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = MovieFormStore.getState()
  }

  componentDidMount() {
    MovieFormStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    MovieFormStore.removeChangeListener(this._onChange)
  }

  render() {
    let modalContent = this.constructModalContet()

    return (
      <div id="modal-movie-form" className="modal fade">
        <div className="modal-dialog modal-responsive">
          {modalContent}
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(MovieFormStore.getState())
  }

  constructModalContet() {
    switch (this.state.view) {
      case MFConstants.views.SEARCH_TMDB:
        return <SearchTMDB/>

      case MFConstants.views.MOVIE_DETAILS:
        return <MovieDetails movie={this.state.movie}/>

      case MFConstants.views.WATCH_YOUTUBE_TRAILERS:
        return <YoutubeTrailersList movie={this.state.movie} />

      case MFConstants.views.WATCH_YOUTUBE_TRAILER:
        return <YoutubeTrailerPlayer
          movie={this.state.movie}
          videoId={this.state.videoId}
        />
    }
  }
}

export default MovieForm