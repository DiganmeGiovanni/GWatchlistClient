
import React from 'react'
import PConstants from './PConstants'
import PreferencesStore from './PreferencesStore'
import preferencesActions from './PreferencesActions'
import UserStore from './../watchlist/UserStore'

var ToWatchActions = require('../actions/ToWatchActions')
var ToWatchConstants = require('../constants/toWatchConstants')
var UserActions = require('../actions/UserActions')

class Preferences extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: UserStore.getState().user
    }

    this._resetForm = this._resetForm.bind(this)
    this._takeValuesFromUserData = this._takeValuesFromUserData.bind(this)
  }

  componentDidMount() {
    PreferencesStore.addChangeListener(this._onChange)
    UserStore.addChangeListener(this._onChange)
    this._takeValuesFromUserData()
  }

  componentWillUnmount () {
    PreferencesStore.removeChangeListener(this._onChange)
    UserStore.removeChangeListener(this._onChange)
  }

  render() {
    return(
      <div className="modal fade" id="modal-preferences" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Preferences</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <b>Theme</b>
                  <select id="theme-chooser" className="form-control" onChange={this._themeChanged}>
                    <option value={PConstants.THEMES.BLUE_DARK}>Blue dark</option>
                    <option value={PConstants.THEMES.PINK_DARK}>Pink dark</option>
                    <option value={PConstants.THEMES.GRADIENT_BLUE_DARK}>Gradient Blue</option>
                    <option value={PConstants.THEMES.GRADIENT_PINK_DARK}>Gradient Pink</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"><br/>
                  <b>Email Notifications</b>
                </div>
                <div className="col-xs-12">
                  <span><input id="cb-list-shared" type="checkbox" value=""/>&nbsp;&nbsp;List shared with me</span>
                </div>
                <div className="col-xs-12">
                  <span><input id="cb-movie-added" type="checkbox" value=""/>&nbsp;&nbsp;Movie added to your lists</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                onClick={this._resetForm}>
                <span className="glyphicon glyphicon-remove-circle"></span>
                <span>&nbsp;&nbsp;Cancel</span>
              </button>
              <button
                className="btn btn-success"
                onClick={this._savePreferences}>
                <span className="glyphicon glyphicon-cloud-upload"></span>
                <span>&nbsp;&nbsp;&nbsp;Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState({
      user: UserStore.getState().user
    })
  }

  _resetForm() {
    this._takeValuesFromUserData()

    // Reset to selected theme
    switch (this.state.user.preferences.theme) {
      case PConstants.THEMES.BLUE_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/blue-dark.css?r=' + Math.random())
        break
      case PConstants.THEMES.PINK_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/pink-dark.css?r=' + Math.random())
        break
      case PConstants.THEMES.GRADIENT_BLUE_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-blue-dark.css?r=' + Math.random())
        break
      case PConstants.THEMES.GRADIENT_PINK_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-pink-dark.css?r=' + Math.random())
        break
    }

    $('#modal-preferences').modal('hide')
  }

  _savePreferences() {
    var notifyOnListShared = document.getElementById('cb-list-shared').checked
    var notifyOnMovieAdded = document.getElementById('cb-movie-added').checked
    var theme = document.getElementById('theme-chooser').value

    ToWatchConstants.userData.preferences.notifyOnListShared = notifyOnListShared
    ToWatchConstants.userData.preferences.notifyOnMovieAdded = notifyOnMovieAdded
    ToWatchConstants.userData.preferences.theme = theme

    //UserActions.uploadUserPreferences()
    preferencesActions.updatePreferences()
    $('#modal-preferences').modal('hide')
  }

  _takeValuesFromUserData() {
    var userPreferences = this.state.user.preferences

    if (userPreferences.notifyOnListShared) {
      document.getElementById('cb-list-shared').checked = true
    }
    else {
      document.getElementById('cb-list-shared').checked = false
    }

    if (userPreferences.notifyOnMovieAdded) {
      document.getElementById('cb-movie-added').checked = true
    }
    else {
      document.getElementById('cb-movie-added').checked = false
    }

    console.log('Current is')
    console.log(userPreferences.theme)
    switch (userPreferences.theme) {
      case PConstants.THEMES.BLUE_DARK:
        document.getElementById('theme-chooser').value = PConstants.THEMES.BLUE_DARK
        break
      case PConstants.THEMES.PINK_DARK:
        document.getElementById('theme-chooser').value = PConstants.THEMES.PINK_DARK
        break
      case PConstants.THEMES.GRADIENT_BLUE_DARK:
        document.getElementById('theme-chooser').value = PConstants.THEMES.GRADIENT_BLUE_DARK
        break
      case PConstants.THEMES.GRADIENT_PINK_DARK:
        document.getElementById('theme-chooser').value = PConstants.THEMES.GRADIENT_PINK_DARK
        break
      default:
        document.getElementById('theme-chooser').value = PConstants.THEMES.BLUE_DARK
    }
  }

  _themeChanged() {
    var chosen = document.getElementById('theme-chooser').value
    switch (chosen) {
      case PConstants.THEMES.BLUE_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/blue-dark.css?r=' + Math.random())
        break
      case PConstants.THEMES.PINK_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/pink-dark.css?r=' + Math.random())
        break
      case PConstants.THEMES.GRADIENT_BLUE_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-blue-dark.css?r=' + Math.random())
        break
      case PConstants.THEMES.GRADIENT_PINK_DARK:
        document.getElementById('theme-stylesheet').setAttribute('href', './src/css/themes/gradient-pink-dark.css?r=' + Math.random())
        break
    }
  }
}

export default Preferences