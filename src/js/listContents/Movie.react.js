
import React from 'react'
import LCConstants from './LCConstants'
let moment = require('moment')

class Movie extends React.Component {

  constructor(props) {
    super(props)
    this._onToggleDisplayDetails = this._onToggleDisplayDetails.bind(this)
    this.playTrailer = this.playTrailer.bind(this)

    this.state = {
      playingTrailer: false,
      showingDetails: false
    }
  }

  componentDidUpdate() {
    if (this.state.playingTrailer) {
      let trailerContainerId = 'modal-trailer-container-' + this.props.movie.tmdbId
      new YT.Player(trailerContainerId, {
        width: '100%',
        videoId: this.props.movie.trailerId,
        events: {
          'onReady': function (event) {
            event.target.playVideo()
          }
        }
      })
    }

    if (this.state.showingDetails) {
      document.getElementById(this.props.movie.tmdbId + "").scrollIntoView()
      window.scrollBy(0, -70)
    }
  }

  render() {
    let movie = this.props.movie

    // Get details JSX
    let detailsJSX = this.constructDetails()

    // Get trailer player JSX
    let trailerModalJSX = this.constructTrailerModal()

    // Style classes for watch list item
    let watchItemClasses = ""
    if (this.state.showingDetails) {
      watchItemClasses += "card-towatch-item col-xs-12"
    }
    else {
      watchItemClasses += "col-xs-6 col-sm-4 col-md-3 col-lg-2"
    }

    // Styles for watch list item
    let watchItemStyles = {
      marginBottom: '20px',
      marginTop: '10px'
    }

    // Style classes for action buttons
    let actionBtnClasses = "btn btn-link btn-lg btn-transparent"

    return (
      <div id={movie.tmdbId} className={watchItemClasses} style={watchItemStyles}>
        <div className="row">

          {/*Buttons toolbar for small and up devices*/}
          <div className={this.state.showingDetails ? "hidden-xs col-sm-12" : "hidden"}>
            <div className="btn-toolbar">
              <div className="btn-group pull-right">
                <button
                  className={actionBtnClasses}
                  onClick={this._onToggleDisplayDetails}
                  style={{paddingRight: '0px'}}
                >
                  <span className="glyphicon glyphicon-remove"></span>
                </button>
              </div>

              <div className="btn-group pull-right">
                <button
                  className={actionBtnClasses}
                  onClick={this._onToggleWatched}
                >
                  <span
                    className={
                      movie.watched
                        ? "glyphicon glyphicon-eye-close"
                        : "glyphicon glyphicon-eye-open"
                    }
                  >
                  </span>
                </button>
                <button
                  className={actionBtnClasses}
                  onClick={this.playTrailer}
                >
                  <span className="glyphicon glyphicon-facetime-video"></span>
                </button>
              </div>

              <div className="btn-group pull-right">
                <button
                  className={actionBtnClasses}
                  onClick={this._onDestroyClick}
                  style={{color: '#e74c3c'}}>
                  <span className="glyphicon glyphicon-trash"></span>
                </button>
              </div>
            </div>
          </div>

          {/*Poster image */}
          <div className={this.state.showingDetails ? "col-xs-9 col-sm-4" : "col-xs-12"}>
            <div onClick={this._onToggleDisplayDetails} style={{cursor: 'pointer', width: '100%'}}>
              <img
                src={
                  this.state.showingDetails
                    ? LCConstants.tmdb.apiImages.MEDIUM + movie.posterPath
                    : LCConstants.tmdb.apiImages.SMALL + movie.posterPath
                }
                alt=""
                className={movie.watched ? "grayscaled-image" : ""}
                width="100%"/>
            </div>
          </div>

          {/* Side vertical top bar for small devices */}
          <div className={this.state.showingDetails ? "col-xs-3 visible-xs-block text-right" : "hidden"}>
            <div className="btn-group-vertical">
              <button
                className={actionBtnClasses}
                onClick={this._onToggleDisplayDetails}
                style={{paddingTop: '0px'}}
              >
                <span className="glyphicon glyphicon-remove"></span>
              </button>
            </div>

            <br/><br/>
            <div className="btn-group-vertical">
              <button
                className={actionBtnClasses}
                onClick={this._onToggleWatched}>
                  <span
                    className={
                      movie.watched
                        ? "glyphicon glyphicon-eye-close"
                        : "glyphicon glyphicon-eye-open"
                    }
                  >
                  </span>
              </button>
              <button
                className={actionBtnClasses}
                onClick={this.playTrailer}>
                <span className="glyphicon glyphicon-facetime-video"></span>
              </button>
            </div>

            <br/><br/>
            <div className="btn-group-vertical">
              <button
                className={actionBtnClasses}
                onClick={this._onDestroyClick}
                style={{color: '#e74c3c'}}>
                <span className="glyphicon glyphicon-trash"></span>
              </button>
            </div>
          </div>


          {/* Movie details */}
          <div className={this.state.showingDetails ? "col-xs-12 col-sm-8" : "hidden"}>
            {detailsJSX}
          </div>
        </div>

        {trailerModalJSX}
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  constructDetails() {
    let movie = this.props.movie

    // Styles for directors and genres labels
    let styleLabel = {
      display: 'inline-block',
      marginBottom: '10px',
      marginRight: '5px'
    }

    // Directors JSX
    let dirs = movie.directors
    let directorsJSX = []
    for (let i = 0; i < dirs.length; i++) {
      directorsJSX.push(
        <span key={i} style={styleLabel}>
          <span className="label label-primary">{dirs[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    // Genres JSX
    let genres = movie.genres
    let genresJSX = []
    for (let i = 0; i < genres.length; i++) {
      genresJSX.push(
        <span key={i} style={styleLabel}>
          <span className="label label-default">{genres[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    // Synopsis JSX
    let synopsisJSX = (
      <p>
        {movie.synopsis}
      </p>
    )

    // Formatted release date
    let releaseDate = moment(movie.releaseDate).format('YYYY, MMMM Do')

    // Joining details in a single node
    return (
      <div className="row">
        <div className="col-xs-12">
          <br className="visible-xs-block" />
          <p>
            <b style={{fontSize: '1.2em', paddingBottom: '5px'}}>
              <span className="glyphicon glyphicon-film"></span>
              <span>&nbsp;&nbsp;{movie.title}</span>
            </b><br/><br/>
            <span>
              <span className="glyphicon glyphicon-calendar"></span>
              <span>&nbsp;&nbsp;{releaseDate}</span>
            </span><br/>
            <span>
              <span className="glyphicon glyphicon-star" style={{color: '#e67e22'}}></span>
              <span>&nbsp;&nbsp;{movie.voteAverage}</span>
            </span>
          </p>
        </div>
        <div className="col-xs-6">
          <b>Directors:</b><br/>
          {directorsJSX}
        </div>
        <div className="col-xs-6">
          <b>Genres</b><br/>
          {genresJSX}
        </div>
        <div className="col-xs-12"><br/>
          <b>Synopsis</b><br/>
          {synopsisJSX}
        </div>
      </div>
    )
  }

  constructTrailerModal() {
    let idTrailerModal = 'modal-trailer-' + this.props.movie.tmdbId
    let trailerContainerId = 'modal-trailer-container-' + this.props.movie.tmdbId
    let videoPlayerContainerId = 'video-player-container-' + this.props.movie.tmdbId

    return (
      <div className="modal fade" id={idTrailerModal} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-responsive" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" style={{color: 'white'}}>&times;</span>
              </button>
              <h4 className="modal-title">{this.props.movie.title}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div id={videoPlayerContainerId} className="col-xs-12">
                  <div id={trailerContainerId}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  playTrailer() {

    let idTrailerModal = 'modal-trailer-' + this.props.movie.tmdbId
    let trailerContainerId = 'modal-trailer-container-' + this.props.movie.tmdbId
    let videoPlayerContainerId = 'video-player-container-' + this.props.movie.tmdbId

    $('#' + idTrailerModal).modal('show')

    this.setState({
      playingTrailer: true
    })

    $('#' + idTrailerModal).on('hidden.bs.modal', () => {
      $('#' + videoPlayerContainerId).empty()

      let $newVideoContainer = $("<div>", {id: trailerContainerId})
      $('#' + videoPlayerContainerId).append($newVideoContainer)

      this.setState({
        playingTrailer: false
      })
    })
  }

  _onToggleDisplayDetails() {
    let showingDetails = !this.state.showingDetails

    this.setState({
      showingDetails: showingDetails
    })
  }

  /*_onToggleWatched: function () {
    ToWatchActions.toggleWatched(this.props.toWatch)
  },

  _onDestroyClick: function () {
    ToWatchActions.destroy(this.props.toWatch.tmdbId)
  }*/
}

export default Movie