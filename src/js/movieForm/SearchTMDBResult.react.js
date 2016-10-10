
import React from 'react'
import MovieFormActions from './MovieFormActions'
import MFConstants from './MFConstants'

let moment = require('moment')

class SearchTMDBResult extends React.Component {

  constructor(props) {
    super(props)
    this.onMovieChosen = this.onMovieChosen.bind(this)
  }

  render() {
    let result = this.props.result

    var overViewStyle = {
      maxHeight: '60px',
      overflow: 'hidden'
    }

    var imageSrc = "./src/img/movie-icon.jpg"
    if (result.posterPath && result.posterPath.length > 0) {
      imageSrc = MFConstants.tmdb.apiImages.SMALL + result.posterPath
    }
    var releaseDate = moment(result.releaseDate).format('YYYY, MMMM Do')

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="card-result">
            <div className="row">
              <div className="col-xs-4 col-sm-3">
                <img
                  src={imageSrc}
                  alt="Movie poster"
                  className="movie-search-result-card-image" />
              </div>
              <div className="col-xs-8 col-sm-9 movie-search-result-card-content">
                <h4>{result.title}</h4>
                <p>
                    <span>
                      <span className="glyphicon glyphicon-calendar"></span>
                      <span>&nbsp;&nbsp;{releaseDate}</span>
                    </span><br/>
                  <span>
                      <span className="glyphicon glyphicon-star" style={{color: '#e67e22'}}></span>
                      <span>&nbsp;&nbsp;{result.voteAverage}</span>
                    </span>
                </p>

                <p style={overViewStyle} className="hidden-xs">
                  {result.synopsis}
                </p>

                <div className="text-right card-result-bottom-buttons">
                  <button
                    className="btn btn-default"
                    onClick={this.onMovieChosen}
                  >
                    <span className="glyphicon glyphicon-film"></span>
                    <span>&nbsp;&nbsp;Add movie</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  onMovieChosen() {
    MovieFormActions.displayMovieDetails(this.props.result)
  }
}

export default SearchTMDBResult