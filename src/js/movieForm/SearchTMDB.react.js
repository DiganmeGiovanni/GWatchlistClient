import React from 'react'
import SearchTMDBResult from './SearchTMDBResult.react'
let tmdbService = require('./../services/tmdbService')


class SearchTMDB extends React.Component {

  constructor(props) {
    super(props)
    this.searchMovies = this.searchMovies.bind(this)

    this.state = {
      searchResults: []
    }
  }

  render() {
    var resultsJSX = this.constructsResultsList()
    var resultsViewerStyle = {
      maxHeight: '400px',
      paddingTop: '20px',
      overflow: 'auto'
    }

    var searchBoxStyle = {
      paddingBottom: '20px',
      borderBottom: '2px solid #AAA'
    }

    return (
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title">Add movie</h4>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-xs-12" style={searchBoxStyle}>
              <label htmlFor="">Movie's title</label>
              <input
                id="inp-movie-title"
                className="form-control"
                onKeyUp={this.searchMovies}
                placeholder="Type to search your movie"
                type="text" />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12" style={resultsViewerStyle}>
              {resultsJSX}
            </div>
          </div>

        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  constructsResultsList() {
    var resultsJSX = []
    var searchResults = this.state.searchResults

    for (var i = 0; i < searchResults.length; i++) {
      resultsJSX.push(
        <SearchTMDBResult
          key={searchResults[i].tmdbId}
          result={searchResults[i]} />
      )
    }

    return resultsJSX
  }

  searchMovies() {
    var qryTerm = document.getElementById('inp-movie-title').value
    if(qryTerm.trim().length >= 2) {
      tmdbService.searchMovie(qryTerm, (err, body) => {
        if (err) {
          console.error('Error fetching from tmdb')
          console.error(err)
        }
        else {
          body = JSON.parse(body)
          var rawResults = body.results
          var results = []
          for (var i=0; i<rawResults.length; i++) {
            results.push({
              tmdbId: rawResults[i].id,
              title: rawResults[i].title,
              synopsis: rawResults[i].overview,
              posterPath: rawResults[i].poster_path,
              releaseDate: rawResults[i].release_date,
              voteAverage: rawResults[i].vote_average
            })
          }

          this.setState({
            searchResults: results
          })
        }
      })
    }
  }
}

export default SearchTMDB