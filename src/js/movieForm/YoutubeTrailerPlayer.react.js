import React from 'react'
import MovieFormActions from './MovieFormActions'

class YoutubeTrailerPlayer extends React.Component {

  constructor(props) {
    super(props)

  }

  componentDidMount() {
    new YT.Player('yt-player', {
      width: '100%',
      videoId: this.props.videoId,
      events: {
        'onReady': function (event) {
          event.target.playVideo()
        }
      }
    })
  }

  render() {
    let movie = this.props.movie

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">{movie.title}</h4>
        </div>

        <div className="modal-body">
          <div id="yt-player"></div>
        </div>

        <div className="modal-footer">
          <button
            onClick={this.watchYoutubeTrailers.bind(null, movie)}
            className="btn btn-warning"
          >
            <span className="glyphicon glyphicon-film"></span>
            <span>&nbsp;Back to trailers</span>
          </button>

          <button
            onClick={this.goBackToMovie.bind(null, movie)}
            className="btn btn-warning"
          >
            <span className="glyphicon glyphicon-menu-left"></span>
            <span>&nbsp;&nbsp;Back to movie</span>
          </button>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  goBackToMovie(movie) {
    MovieFormActions.displayMovieDetails(movie)
  }

  watchYoutubeTrailers(movie) {
    MovieFormActions.watchYoutubeTrailers(movie)
  }
}

export default YoutubeTrailerPlayer