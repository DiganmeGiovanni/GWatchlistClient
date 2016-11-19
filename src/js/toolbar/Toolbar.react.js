
import React from "react";
import ListContentStore from "./../listContents/ListContentStore";
import ListActions from "./../lists/ListsActions";
import ListContentActions from './../listContents/ListContentActions'
import MovieFormActions from "./../movieForm/MovieFormActions";
import Lists from "./../lists/Lists.react";
import ListShare from "./../listShare/ListShare.react";
import MovieForm from "./../movieForm/MovieForm.react";


class Toolbar extends React.Component {

  constructor(props) {
    super(props)
    this.deleteCurrentList = this.deleteCurrentList.bind(this)
    this.onClickListenerBtnLists = this.onClickListenerBtnLists.bind(this)
    this.onClickListenerBtnLists = this.onClickListenerBtnLists.bind(this)
    this._onChange = this._onChange.bind(this)

    this.state = {
      forceListsFetch: true,
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

              {/* Menu options */}
              <div className="btn-group">
                <button
                  className="btn btn-link btn-transparent dropdown-toggle"
                  data-toggle="dropdown"
                  type="button"
                >
                  <span className="glyphicon glyphicon-option-vertical"></span>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    <a href="#" onClick={this.deleteCurrentList}>
                      <span className="glyphicon glyphicon-trash" style={{color: '#e74c3c'}}></span>
                      <span>&nbsp;&nbsp;Delete list</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="glyphicon glyphicon-cog"></span>
                      <span>&nbsp;&nbsp;Preferences</span>
                    </a>
                  </li>
                  <li className="divider" role="separator"></li>
                  <li>
                    <a href="#">
                      <span className="glyphicon glyphicon-off"></span>
                      <span>&nbsp;&nbsp;Exit</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAB Button for extra small devices */}
          <button
            className="btn btn-fab visible-xs-block"
            onClick={this.onClickListenerBtnAddMovie}
            type="button"
          >
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          </div>

        {/* Modal for lists */}
        <Lists
          forceListsFetch={this.state.forceListsFetch}
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

  deleteCurrentList() {
    ListContentActions.deleteCurrentList()
    ListActions.fetchListsNames(this.props.user.email)
  }

  onClickListenerBtnLists() {
    $('#modal-lists').modal('show')

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