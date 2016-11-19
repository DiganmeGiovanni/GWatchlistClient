
let LConstans = {

  ACTION_DELETE_LIST: 'ACTION_DELETE_LIST',
  ACTION_FETCH_LISTS_NAMES: 'FETCH_LISTS_NAMES',
  ACTION_POST_LIST: 'ACTION_POST_LIST',
  ACTION_RENDER_CREATE_LIST: 'ACTION_RENDER_CREATE_LIST',
  ACTION_RENDER_LISTS: 'ACTION_RENDER_LISTS',

  VIEW_LISTS: 'VIEW_LISTS',
  VIEW_CREATE_LIST: 'VIEW_CREATE_LIST',
  VIEW_SHARE_LIST: 'VIEW_SHARE_LIST'
}

let baseApiUrl = 'http://localhost:8080/api/'
let apiUrls = {
  DELETE_LIST: baseApiUrl + 'movies/list/',
  FETCH_LIST: baseApiUrl + 'movies/list',
  FETCH_LISTS_NAMES: baseApiUrl + 'movies/lists',
  FETCH_PERSONAL_LIST: baseApiUrl + 'movies/list/personal',
  POST_LIST: baseApiUrl + 'movies/list',
  POST_MOVIE: baseApiUrl + 'movies/list/',
  SHARE_LIST: baseApiUrl + 'movies/list/share'
}

export {apiUrls}
export default LConstans