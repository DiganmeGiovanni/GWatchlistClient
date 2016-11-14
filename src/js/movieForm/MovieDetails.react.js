import React from 'react'
import MovieFormActions from './MovieFormActions'
import ListContentActions from './../listContents/ListContentActions'

class MovieDetails extends React.Component {

  constructor(props) {
    super(props)
    this.watchYoutubeTrailers = this.watchYoutubeTrailers.bind(this)
  }

  render() {
    let movie = this.props.movie
    let directorsJSX = this.constructDirectorsJSX(movie)
    let genresJSX = this.constructGenresJSX(movie)

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">Add movie</h4>
        </div>
        <div className="modal-body">

          {/* Movie title */}
          <div className="row">
            <div className="col-sm-12">
              <label>Movie's title</label>
              <p className="lead">
                {movie.title}
              </p>
            </div>
          </div>


          <div className="row">

            {/* Movie directors */}
            <div className="col-xs-6 col-sm-6 hidden-overflow"><br/>
              <label>Movie's directors</label><br/>
              {directorsJSX}
            </div>

            {/* Movie genres */}
            <div className="col-xs-6 col-sm-6 hidden-overflow"><br/>
              <label>Movie's genres</label><br/>
              {genresJSX}
            </div>
          </div>

          {/* Movie synopsis */}
          <div className="row">
            <div className="col-sm-12"><br/>
              <label>Movie's Synopsis</label>
              <p>
                {movie.synopsis}
              </p>
            </div>
          </div>

          {/* Youtube trailers */}
          <div className="row">
            <div className="col-xs-12"><br/>
              <label htmlFor="">Movie trailers</label><br/>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={this.watchYoutubeTrailers}
                  type="button"
                  style={{background: '#e52d27'}}>
                  <span className="glyphicon glyphicon-facetime-video"></span>
                  <span>&nbsp;&nbsp;&nbsp;View from Youtube</span>
                </button>
              </div>
            </div>
          </div>

        </div>
        <div className="modal-footer">
          <div className="row">
            <div className="col-xs-12">
              <button
                className="btn btn-danger"
                onClick={this.cancelAddition}
              >
                  <span className="fa fa-times"></span>
                <span>&nbsp;&nbsp;Cancel</span>
              </button>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <button
                className="btn btn-success"
                onClick={this.addMovieToList.bind(null, movie)}
              >
                <span className="fa fa-plus"></span>
                <span>&nbsp;&nbsp;Add to list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  constructDirectorsJSX(movie) {

    // Styles for directors
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
        <span key={'span-director-' + i} style={styleLabel}>
          <span className="label label-primary">{dirs[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    return directorsJSX
  }

  constructGenresJSX(movie) {

    // Styles for genres labels
    let styleLabel = {
      display: 'inline-block',
      marginBottom: '10px',
      marginRight: '5px'
    }

    // Genres JSX
    let genres = movie.genres
    let genresJSX = []
    for (let i = 0; i < genres.length; i++) {
      genresJSX.push(
        <span key={'span-genres-' + i} style={styleLabel}>
          <span className="label label-default">{genres[i]}</span>
          <span>&nbsp;</span>
        </span>
      )
    }

    return genresJSX
  }

  cancelAddition() {
    $('#modal-movie-form').modal('hide')
  }

  addMovieToList(movie) {
    ListContentActions.addMovieToCurrentList(movie)
    $('#modal-movie-form').modal('hide')
  }

  watchYoutubeTrailers() {
    let movie = this.props.movie
    MovieFormActions.watchYoutubeTrailers(movie)
  }
}

export default MovieDetails