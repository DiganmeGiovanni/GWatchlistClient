import React from 'react'
import MovieFormActions from './MovieFormActions'
let youtubeService = require('./../services/youtubeService')

class YoutubeTrailersList extends React.Component {

  constructor(props) {
    super(props)
    this.goBackToMovie = this.goBackToMovie.bind(this)
    this.playTrailer = this.playTrailer.bind(this)

    this.state = {
      trailers: []
    }
  }

  componentDidMount() {
    this.searchTrailers(this.props.movie)
  }

  render() {
    let movie = this.props.movie
    let trailersJSX = this.constructTrailersListJSX(movie)

    var styleChooser = {
      'height': '500px',
      'maxHeight': '500px',
      'overflow': 'auto'
    }

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">{movie.title}</h4>
        </div>

        <div className="modal-body" style={styleChooser}>
          <div className="row">
            <div className="col-xs-12">
              {trailersJSX}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{borderTop: '1px solid #333'}}>
          <button
            className="btn btn-warning"
            onClick={this.goBackToMovie}
            type="button"
          >
            <span className="glyphicon glyphicon-menu-left"></span>
            <span>&nbsp;&nbsp;Back to movie</span>
          </button>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  constructTrailersListJSX() {
    var trailers = this.state.trailers

    if (trailers.length == 0) {
      return (
        <div className="text-center" style={{margin: '25px'}}>
          <span className="fa fa-spin fa-4x fa-spinner"></span>
          <br/>
          <span>Loading trailers</span>
        </div>
      )
    }

    var trailersJSX = []
    for(var i = 0; i < trailers.length; i++) {
      var trailer = trailers[i]

      trailersJSX.push(
        <div key={trailer.videoId} className="row">
          <div className="col-xs-12">
            <div className="card-result">
              <div className="row">

                {/* Video title on extra small devices */}
                <div className="col-xs-12 visible-xs-block">
                  <h5 style={{marginLeft: '15px'}}>{trailer.videoTitle}</h5>
                </div>

                <div className="col-xs-12">
                  <img
                    src={trailer.videoImgUrl}
                    alt="Youtube video image"
                    width="196"
                    height="140"
                    className="pull-left trailer-chooser-result-image" />

                  {/* Video title for small and up devices */}
                  <h5 className="hidden-xs">{trailer.videoTitle}</h5>

                  <div className="card-result-bottom-buttons">
                    <div className="btn-group">
                      <button
                        className="btn btn-default"
                        onClick={this.playTrailer.bind(null, trailer.videoId)}
                        type="button">
                        <span className="glyphicon glyphicon-play"></span>
                        <span className="hidden-xs">&nbsp;&nbsp;Watch</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )
    }

    return trailersJSX
  }

  goBackToMovie() {
    MovieFormActions.displayMovieDetails(this.props.movie)
  }

  playTrailer(videoId) {
    let movie = this.props.movie
    MovieFormActions.watchYoutubeTrailer(videoId, movie)
  }

  searchTrailers(movie) {
    youtubeService.searchTrailers(movie.title, (err, trailers) => {
      if (err) {
        console.error('Error on youtube service')
        console.error(err)
      }
      else {
        trailers = JSON.parse(trailers)

        let trailersItems = trailers.items
        let movieTrailers = []
        for (let i = 0; i < trailersItems.length; i++) {
          let trailerJson = trailersItems[i]
          movieTrailers.push({
            videoId: trailerJson.id.videoId,
            videoTitle: trailerJson.snippet.title,
            videoDesc: trailerJson.snippet.description,
            videoImgUrl: trailerJson.snippet.thumbnails.high.url
          })
        }

        this.setState({
          trailers: movieTrailers,
        })
      }
    })
  }
}

export default YoutubeTrailersList