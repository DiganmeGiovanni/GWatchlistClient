
/**
 * This component operates as a controller-view. It listens for
 * changes in the ToWatchStore and passes the new data to its children
 */

var React     = require('react')

//var Toolbar      = require('./Toolbar.react')
import Toolbar from "./../toolbar/Toolbar.react";
import ListContents from "./../lists/ListContents.react";
var TWConstants = require('../constants/toWatchConstants')
var LandingPage  = require('./LandingPage.react')
var ToWatchStore = require('../stores/ToWatchStore')
var UserStore   = require('../stores/UserStore')

/*****************************************************************************/

function getToWatchState() {
  return {
    areAllWatched: ToWatchStore.areCurrentListAllWatched(),
    currentList: ToWatchStore.getCurrentList(),
    isUserLogged: UserStore.isUserLogged(),
    listsWithoutContents: ToWatchStore.getListsWithoutContents()
  }
}

var ToWatchApp = React.createClass({

  getInitialState: function() {
    return getToWatchState()
  },

  componentDidMount: function () {
    ToWatchStore.addChangeListener(this._onChange)
    UserStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    ToWatchStore.removeChangeListener(this._onChange)
    UserStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState(getToWatchState())
  },

  render: function() {
    if(this.state.isUserLogged) {
      return (
        <div className="container">
          <Toolbar user={TWConstants.userData}/>

          <div style={{marginTop: '80px'}}>
            <ListContents/>
          </div>
        </div>
      )
    }
    else {
      return (
        <LandingPage />
      )
    }
  }

})

module.exports = ToWatchApp
