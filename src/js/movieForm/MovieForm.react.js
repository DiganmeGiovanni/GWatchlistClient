
import React from 'react'

import MFConstants from './MFConstants'
import MovieFormStore from './MovieFormStore'
import SearchTMDB from './SearchTMDB.react'

class MovieForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = MovieFormStore.getState()
  }

  render() {
    let modalContent = this.constructModalContet()

    return (
      <div id="modal-movie-form" className="modal fade">
        <div className="modal-dialog modal-responsive">
          {modalContent}
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  constructModalContet() {
    switch (this.state.view) {
      case MFConstants.views.SEARCH_TMDB:
        return <SearchTMDB/>
    }
  }
}

export default MovieForm