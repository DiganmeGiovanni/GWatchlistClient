
import React from 'react'

import ListContentActions from './ListContentActions'
import ListContentStore from './ListContentStore'
import Movie from './Movie.react'
let ToWatchConstants = require('./../constants/toWatchConstants')


class ListContents extends React.Component {

  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = ListContentStore.getState()
  }

  componentDidMount() {
    ListContentStore.addChangeListener(this._onChange)

    // Fetch personal list by default
    let email = ToWatchConstants.userData.email
    ListContentActions.fetchPersonalList(email)
  }

  componentWillUnmount() {
    ListContentStore.removeChangeListener(this._onChange)
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h4>{this.state.currentList.name}</h4>
          <hr/>
        </div>

        {/* Pending movies */}
        <div className="col-xs-12">
          <div className="row">
            {this.constructMoviesJSX()}
          </div>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(ListContentStore.getState())
  }

  constructMoviesJSX() {
    let movies = this.state.currentList.movies
    let viewingDetailsOf = this.state.viewingDetailsOf

    if (movies.length > 0) {

      let moviesJSX = []
      for (let i = 0; i < movies.length; i++) {
        moviesJSX.push(
          <Movie
            key={'movie-' + movies[i].tmdbId + '-' + i}
            movie={movies[i]}
            displayingDetails={viewingDetailsOf === movies[i].tmdbId}
          />
        )
      }

      return moviesJSX
    }
    else {
      return (
        <div className="col-xs-12">
          <h5>It seems that there is not movies on your list yet</h5>
        </div>
      )
    }
  }

}

export default ListContents











