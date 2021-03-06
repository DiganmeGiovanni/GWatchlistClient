
import LConstants from "../lists/LConstants";
let request = require('request')
let GWConstants = require('./../constants/toWatchConstants')


class ListService {

  fetchList(ownerEmail, listId, callback) {

    let url = LConstants.WS.LIST_GET
    url += '?owner_email=' + ownerEmail
    url += '&list_id=' + listId

    fetch(url)
      .then(response => { return response.json() })
      .then(jResponse => { callback(null, jResponse) })
      .catch(err => { callback(err, null) })
  }

  fetchListsNames(email, callback) {

    let url = LConstants.WS.LIST_ALL
    url += '?owner_email=' + email

    fetch(url)
      .then(response => { return response.json() })
      .then(jResponse => {
        callback(null, jResponse)
      })
      .catch((err) => {
        callback(err, null)
      })
  }

  fetchPersonalList(email, callback) {

    let url = LConstants.WS.LIST_PERSONAL
    url += '?owner_email=' + email

    fetch(url)
      .then(response => { return response.json() })
      .then(jResponse => {
        callback(null, jResponse)
      })
      .catch(err => {
        callback(err, null)
      })
  }

  postList(ownerEmail, listName, callback) {

    let payload = {
      form: {
        owner_email: ownerEmail,
        name: listName
      }
    }

    request.post(LConstants.WS.LIST_GET, payload, (err, response, body) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, JSON.parse(body))
        }
    })
  }

  deleteList(listId) {

    // Target url
    let url = LConstants.WS.LIST + listId

    // Prepare request paras
    let reqConfig = {
      url: url,
      method: 'DELETE'
    }

    request(reqConfig, (err, response, body) => {
      if (err) {
        console.error(err)
      } else if (response.statusCode === 204) {
        console.log('List deleted successfully')
      }
    })
  }

  postMovie(listId, movie) {

    // Add data to payload
    movie.addedByEmail = GWConstants.userData.email
    movie.addedByName = GWConstants.userData.name

    // Prepare target url
    let url = LConstants.WS.LIST + listId + '/movie'

    // Prepare request params
    let reqConfig = {
      url: url,
      method: 'POST',
      json: movie,
    }

    request(reqConfig, (err, response, body) => {
      if (err) {
        console.error(err)
      } else if (response.statusCode === 201) {
        //console.log("Movie added successful")
      }
    })
  }

  updateMovie(listId, movie) {

    // Target url
    let url = LConstants.WS.LIST + listId + '/movie'

    // Prepare request paras
    let reqConfig = {
      url: url,
      method: 'PUT',
      json: movie
    }

    request(reqConfig, (err, response, body) => {
      if (err) {
        console.error(err)
      } else if (response.statusCode === 204) {
        //console.log('Movie updated successfully')
      }
    })
  }

  deleteMovie(listId, movie) {

    // Target url
    let url = LConstants.WS.LIST + listId + '/movie'

    // Prepare request paras
    let reqConfig = {
      url: url,
      method: 'DELETE',
      json: movie
    }

    request(reqConfig, (err, response, body) => {
      if (err) {
        console.error(err)
      } else if (response.statusCode === 204) {
        //console.log('Movie deleted successfully')
      }
    })
  }

  shareList(email, listId, callback) {

    let payload = {
      form: {
        list_id: listId,
        email: email
      }
    }

    request.post(LConstants.WS.LIST_SHARE, payload, (err, response, body) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, {})
      }
    })
  }
}

let listService = new ListService()
export default listService