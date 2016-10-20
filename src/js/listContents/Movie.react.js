
import React from 'react'
import LCConstants from './LCConstants'

class Movie extends React.Component {

  render() {
    let movie = this.props.movie

    return (
      <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" style={{marginBottom: '20px', marginTop: '10px'}}>
        <div>
          <img
            className="movie-poster-image"
            src={LCConstants.tmdb.apiImages.LARGE + movie.posterPath}
            width='100%'
          />
        </div>
      </div>
    )
  }
}

export default Movie