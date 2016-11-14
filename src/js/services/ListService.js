
import {apiUrls} from '../lists/LConstants'
let request = require('request')
let GWConstants = require('./../constants/toWatchConstants')


class ListService {

  fetchList(ownerEmail, listId, callback) {

    let url = apiUrls.FETCH_LIST
    url += '?owner_email=' + ownerEmail
    url += '&list_id=' + listId

    fetch(url)
      .then(response => { return response.json() })
      .then(jResponse => { callback(null, jResponse) })
      .catch(err => { callback(err, null) })
  }

  fetchListsNames(email, callback) {

    let url = apiUrls.FETCH_LISTS_NAMES
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

    let url = apiUrls.FETCH_PERSONAL_LIST
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

    request.post(apiUrls.POST_LIST, payload, (err, response, body) => {
        if (err) {
          callback(err, null)
        } else {
          callback(null, JSON.parse(body))
        }
    })
  }

  postMovie(listId, movie) {

    // Add data to payload
    movie.addedByEmail = GWConstants.userData.email
    movie.addedByName = GWConstants.userData.name

    // Prepare target url
    let url = apiUrls.POST_MOVIE + listId + '/movie'

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

  shareList(email, listId, callback) {

    let payload = {
      form: {
        list_id: listId,
        email: email
      }
    }

    request.post(apiUrls.SHARE_LIST, payload, (err, response, body) => {
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