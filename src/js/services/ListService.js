
import {apiUrls} from '../lists/LConstants'


class ListService {

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
}

let listService = new ListService()
export default listService