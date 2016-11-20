
import React from "react";
import ListsStore from "./ListsStore";
import Movie from "./Movie.react";

let toWatchConstants = require('./../constants/toWatchConstants')


class ListContents extends React.Component {

  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = ListsStore.getState()
  }

  componentDidMount() {
    ListsStore.addChangeListener(this._onChange)

    // Fetch personal list by default
    let email = toWatchConstants.userData.email
    ListsStore.viewPersonalList(email)
  }

  componentWillUnmount() {
    ListsStore.removeChangeListener(this._onChange)
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
          {this.constructMoviesJSX()}
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(ListsStore.getState())
  }

  constructMoviesJSX() {
    let movies = this.state.currentList.movies
    let viewingDetailsOf = this.state.viewingDetailsOf

    if (movies.length > 0) {

      let moviesJSX = []
      let watchedMoviesJSX = []
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].watched) {
          watchedMoviesJSX.push(
            <Movie
              key={'movie-' + movies[i].tmdbId + '-' + i}
              movie={movies[i]}
              displayingDetails={viewingDetailsOf === movies[i].tmdbId}
            />
          )
        } else {
          moviesJSX.push(
            <Movie
              key={'movie-' + movies[i].tmdbId + '-' + i}
              movie={movies[i]}
              displayingDetails={viewingDetailsOf === movies[i].tmdbId}
            />
          )
        }
      }

      return (
        <div className="row">
          <div className="col-xs-12">
            <div className="row">
              {
                moviesJSX.length > 0
                  ? moviesJSX
                  : <div className="col-xs-12">
                      <h5><i>You have seen all movies in this list</i></h5>
                    </div>
              }
            </div>
          </div>

          <div className="col-xs-12">
            {
              watchedMoviesJSX.length > 0
                ? <div className="row">
                    <div className="col-xs-12"><h4 className="subtle-text">Watched:</h4></div>
                    {watchedMoviesJSX}
                  </div>
                : ""
            }
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h5>It seems that there is not movies on your list yet</h5>
          </div>
        </div>
      )
    }
  }

}

export default ListContents











