
import React from 'react'

import ListContentStore from './../listContents/ListContentStore'
import ListActions from './../lists/ListsActions'
import MovieFormActions from './../movieForm/MovieFormActions'

import Lists from './../lists/Lists.react'
import ListShare from './../listShare/ListShare.react'
import MovieForm from './../movieForm/MovieForm.react'


class Toolbar extends React.Component {

  constructor(props) {
    super(props)
    this.onClickListenerBtnLists = this.onClickListenerBtnLists.bind(this)
    this.onClickListenerBtnLists = this.onClickListenerBtnLists.bind(this)
    this._onChange = this._onChange.bind(this)

    this.state = {
      loadLists: false,
      displayShareBtn: false
    }
  }

  componentDidMount() {
    ListContentStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    ListContentStore.removeChangeListener(this._onChange)
  }

  render() {
    return (
      <div>
        <div className="top-bar">

          {/* Horizontal bar */}
          <div className="row">
            <div className="col-sm-4">

            </div>

            <div className="col-sm-8 text-right" style={{paddingTop: '4px'}}>

              {/* Add movie button */}
              <button
                className="btn btn-link btn-transparent hidden-xs"
                onClick={this.onClickListenerBtnAddMovie}
              >
                <span className="glyphicon glyphicon-film"></span>
                <span>&nbsp;&nbsp;ADD MOVIE</span>
              </button>

              {/* Share list button */}
              {
                this.state.displayShareBtn
                  ? <button
                      className="btn btn-link btn-transparent"
                      onClick={this.onClickListenerBtnListShare}
                      type="button"
                    >
                      <span className="fa fa-user-plus"></span>
                      <span>&nbsp;&nbsp;SHARE LIST</span>
                    </button>
                  : ""
              }

              {/* Lists button */}
              <button
                className="btn btn-link btn-transparent"
                onClick={this.onClickListenerBtnLists}
                type="button"
              >
                <span className="fa fa-list-alt"></span>
                <span>&nbsp;&nbsp;LISTS</span>
              </button>

              {/* Spacing on small and up screens */}
              <label className="hidden-xs" style={{width: "30px"}}></label>

              {/* Preferences button */}
              <button
                className="btn btn-link btn-transparent"
                type="button"
                data-target="#preferences-modal"
                data-toggle="modal"
              >
                <span className="glyphicon glyphicon-cog" />
              </button>
            </div>
          </div>

          {/* FAB Button for extra small devices */}
          <button
            className="btn btn-fab visible-xs-block"
            data-target="#towatch-form-modal"
            data-toggle="modal"
            type="button"
          >
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          </div>

        {/* Modal for lists */}
        <Lists
          loadLists={this.state.loadLists}
          user={this.props.user}
        />

        {/* Modal to share list */}
        <ListShare />

        {/* Modal to add a movie to list */}
        <MovieForm />
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState({
      displayShareBtn: !ListContentStore.getState().currentList.personalList
    })
  }

  onClickListenerBtnLists() {
    $('#modal-lists').modal('show')

    this.setState({
      loadLists: true
    })

    ListActions.renderLists()
  }

  onClickListenerBtnListShare() {
    $('#modal-list-share').modal('show')
  }

  onClickListenerBtnAddMovie() {
    MovieFormActions.startAddProcess()
    $('#modal-movie-form').modal('show')
  }
}

export default Toolbar