
import React from "react";
import LConstants from "./LConstants";
import YTPlayerActions from "./../youtubePlayer/YTPlayerActions.react";
import ListsActions from "./ListsActions";
import YTPlayer from "./../youtubePlayer/YTPlayer.react";

let moment = require('moment')


class Movie extends React.Component {

  constructor(props) {
    super(props)
    this._onToggleDisplayDetails = this._onToggleDisplayDetails.bind(this)
    this._toggleWatched = this._toggleWatched.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)
    this.playTrailer = this.playTrailer.bind(this)

    this.state = {
      playingTrailer: false,
    }
  }

  componentDidUpdate() {
    if (this.props.displayingDetails) {
      document.getElementById(this.props.movie.tmdbId + '').scrollIntoView()
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
    let watchItemClasses = ''
    if (this.props.displayingDetails) {
      watchItemClasses += 'card-towatch-item col-xs-12'
    }
    else {
      watchItemClasses += 'col-xs-6 col-sm-4 col-md-3 col-lg-2'
    }

    // Styles for watch list item
    let watchItemStyles = {
      marginBottom: '20px',
      marginTop: '10px'
    }

    // Style classes for action buttons
    let actionBtnClasses = 'btn btn-link btn-lg btn-transparent'

    return (
      <div id={movie.tmdbId} className={watchItemClasses} style={watchItemStyles}>
        <div className='row'>

          {/*Buttons toolbar for small and up devices*/}
          <div className={this.props.displayingDetails ? 'hidden-xs col-sm-12' : 'hidden'}>
            <div className='btn-toolbar'>
              <div className='btn-group pull-right'>
                <button
                  className={actionBtnClasses}
                  onClick={this._onToggleDisplayDetails}
                  style={{paddingRight: '0px'}}
                >
                  <span className='glyphicon glyphicon-remove'></span>
                </button>
              </div>

              <div className='btn-group pull-right'>
                <button
                  className={actionBtnClasses}
                  onClick={this._toggleWatched}
                >
                  <span
                    className={
                      movie.watched
                        ? 'glyphicon glyphicon-eye-close'
                        : 'glyphicon glyphicon-ok'
                    }
                  >
                  </span>
                </button>
                <button
                  className={actionBtnClasses}
                  onClick={this.playTrailer}
                >
                  <span className='glyphicon glyphicon-facetime-video'></span>
                </button>
              </div>

              <div className='btn-group pull-right'>
                <button
                  className={actionBtnClasses}
                  onClick={this.deleteMovie}
                  style={{color: '#e74c3c'}}>
                  <span className='glyphicon glyphicon-trash'></span>
                </button>
              </div>
            </div>
          </div>

          {/*Poster image */}
          <div className={this.props.displayingDetails ? 'col-xs-9 col-sm-4' : 'col-xs-12'}>
            <div onClick={this._onToggleDisplayDetails} style={{cursor: 'pointer', width: '100%'}}>
              <img
                src={
                  this.props.displayingDetails
                    ? LConstants.WS_TMDB.IMG.MEDIUM + movie.posterPath
                    : LConstants.WS_TMDB.IMG.SMALL + movie.posterPath
                }
                alt=''
                className={movie.watched ? 'grayscaled-image' : ''}
                width='100%'/>
            </div>
          </div>

          {/* Side vertical top bar for small devices */}
          <div className={this.props.displayingDetails ? 'col-xs-3 visible-xs-block text-right' : 'hidden'}>
            <div className='btn-group-vertical'>
              <button
                className={actionBtnClasses}
                onClick={this._onToggleDisplayDetails}
                style={{paddingTop: '0px'}}
              >
                <span className='glyphicon glyphicon-remove'></span>
              </button>
            </div>

            <br/><br/>
            <div className='btn-group-vertical'>
              <button
                className={actionBtnClasses}
                onClick={this._toggleWatched}>
                  <span
                    className={
                      movie.watched
                        ? 'glyphicon glyphicon-eye-close'
                        : 'glyphicon glyphicon-ok'
                    }
                  >
                  </span>
              </button>
              <button
                className={actionBtnClasses}
                onClick={this.playTrailer}>
                <span className='glyphicon glyphicon-facetime-video'></span>
              </button>
            </div>

            <br/><br/>
            <div className='btn-group-vertical'>
              <button
                className={actionBtnClasses}
                onClick={this.deleteMovie}
                style={{color: '#e74c3c'}}>
                <span className='glyphicon glyphicon-trash'></span>
              </button>
            </div>
          </div>


          {/* Movie details */}
          <div className={this.props.displayingDetails ? 'col-xs-12 col-sm-8' : 'hidden'}>
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
          <span className='label label-primary'>{dirs[i]}</span>
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
          <span className='label label-default'>{genres[i]}</span>
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
      <div className='row'>
        <div className='col-xs-12'>
          <br className='visible-xs-block' />
          <p>
            <b style={{fontSize: '1.2em', paddingBottom: '5px'}}>
              <span className='glyphicon glyphicon-film'></span>
              <span>&nbsp;&nbsp;{movie.title}</span>
            </b><br/><br/>
            <span>
              <span className='glyphicon glyphicon-calendar'></span>
              <span>&nbsp;&nbsp;{releaseDate}</span>
            </span><br/>
            <span>
              <span className='glyphicon glyphicon-star' style={{color: '#e67e22'}}></span>
              <span>&nbsp;&nbsp;{movie.voteAverage}</span>
            </span>
          </p>
        </div>
        <div className='col-xs-6'>
          <b>Directors:</b><br/>
          {directorsJSX}
        </div>
        <div className='col-xs-6'>
          <b>Genres</b><br/>
          {genresJSX}
        </div>
        <div className='col-xs-12'><br/>
          <b>Synopsis</b><br/>
          {synopsisJSX}
        </div>
      </div>
    )
  }

  constructTrailerModal() {
    return (
      this.props.displayingDetails
        ? <YTPlayer
            modalTitle={this.props.movie.title}
          />
        : ""
    )
  }

  playTrailer() {
    YTPlayerActions.searchVideos(this.props.movie.title + ' Official trailer')
  }

  _onToggleDisplayDetails() {
    if (this.props.displayingDetails) {
      ListsActions.displayMovieDetails('')
    } else {
      ListsActions.displayMovieDetails(this.props.movie.tmdbId)
    }
  }

  _toggleWatched () {
    let movie = this.props.movie
    movie.watched = !movie.watched

    ListsActions.displayMovieDetails('')
    ListsActions.updateMovie(movie)
  }

  deleteMovie () {
    let movie = this.props.movie
    ListsActions.deleteMovie(movie)
  }
}

export default Movie
