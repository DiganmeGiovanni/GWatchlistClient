
import {apiUrls} from '../lists/LConstants'
let request = require('request')


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