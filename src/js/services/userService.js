
var request = require('request')
var ToWatchConstants = require('../constants/toWatchConstants')

/******************************************************************************/

var API_URL = ToWatchConstants.API_URL + "user/"

module.exports = {

  loginUser: function (name, email, callback) {

    var params = {
      method: 'GET',
      url: API_URL + "login",
      qs: {
        name: name,
        email: email
      },
      withCredentials: false
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  },

  uploadUserPreferences: function (callback) {
    var params = {
      method: 'POST',
      url: API_URL + "preferences",
      form: {
        email: ToWatchConstants.userData.email,
        notifyOnListShared: ToWatchConstants.userData.preferences.notifyOnListShared,
        notifyOnMovieAdded: ToWatchConstants.userData.preferences.notifyOnMovieAdded,
        theme: ToWatchConstants.userData.preferences.theme
      }
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }

}