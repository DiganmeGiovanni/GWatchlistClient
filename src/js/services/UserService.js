
import SConstants from './SConstants'

let request = require('request')
let ToWatchConstants= require('../constants/toWatchConstants')

class UserService {

  loginUser(name, email, callback) {

    var params = {
      method: 'GET',
      url: SConstants.WS.USER + "login",
      qs: {
        name: name,
        email: email
      },
      withCredentials: false
    }

    request(params, function (err, res, body) {
      callback(err, body)
    })
  }

  updatePreferences(callback) {
    let url = SConstants.WS.USER
    url += ToWatchConstants.userData.id
    url += '/preferences'
    console.log(url)

    let payload = {
      method: 'POST',
      url: url,
      json: {
        notifyOnListShared: ToWatchConstants.userData.preferences.notifyOnListShared,
        notifyOnMovieAdded: ToWatchConstants.userData.preferences.notifyOnMovieAdded,
        theme: ToWatchConstants.userData.preferences.theme
      }
    }

    request(payload, (err, res, body) => {
      callback(err, body)
    })
  }
}

let userService = new UserService()
export default userService