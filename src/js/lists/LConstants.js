
let baseUrl = 'http://localhost:8080/api/'
let LConstants = {

  ACTIONS: {

    //
    // BASIC CRUD ACTIONS

    // MOVIES CRUD
    MOVIE_CREATE: 'ACTION_MOVIE_ADD',
    MOVIE_DELETE: 'MOVIE_DELETE',
    MOVIE_READ: 'MOVIE_READ',
    MOVIE_UPDATE: 'MOVIE_UPDATE',

    // LISTS CRUD
    LIST_CREATE: 'LIST_CREATE',
    LIST_DELETE: 'LIST_DELETE',
    LIST_READ: 'LIST_READ',
    LISTS_READ: 'LISTS_READ',

    //
    // ADDITIONAL ACTIONS

    // MOVIES
    MOVIE_DISPLAY_DETAILS: 'MOVIE_DISPLAY_DETAILS',

    // LISTS
    LIST_DELETE_CURRENT: 'LIST_DELETE_CURRENT',
    LIST_READ_PERSONAL: 'LIST_READ_PERSONAL',
    LIST_SHARE: 'LIST_SHARE',
    LIST_RENDER_CREATE: 'LIST_RENDER_CREATE',
    LIST_RENDER_LISTS: 'LIST_RENDER_LISTS'

  },

  WS_TMDB: {
    IMG: {
      SMALL: 'http://image.tmdb.org/t/p/w300',
      MEDIUM: 'http://image.tmdb.org/t/p/w780',
      LARGE: 'http://image.tmdb.org/t/p/w1280',
      ORIGINAL: 'http://image.tmdb.org/t/p/original'
    }
  },

  VIEW: {
    LIST_ALL: 'LIST_ALL',
    LIST_CREATE: 'LIST_CREATE',
    LIST_SHARE: 'LIST_SHARE'
  },

  WS: {
    LIST_GET:      baseUrl + 'movies/list',
    LIST:          baseUrl + 'movies/list/',
    LIST_ALL:      baseUrl + 'movies/lists/',
    LIST_PERSONAL: baseUrl + 'movies/list/personal',
    LIST_SHARE:    baseUrl + 'movies/list/share'
  }
}

export default LConstants