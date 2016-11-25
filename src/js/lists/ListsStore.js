import EventEmmiter from "events";
import LConstants from "./LConstants";
import listService from "./../services/ListService";

let AppDispatcher = require('./../dispatcher/AppDispatcher')
let toWatchConstants = require('./../constants/toWatchConstants')

let CHANGE_EVENT = 'CHANGE_EVENT'

// Store state
let _state = {
  currentList: {
    id: '',
    name: '- - -',
    movies: [],
    sharedWith: [],
    viewingDetailsOf: ''
  },
  currentView: LConstants.VIEW.LIST_ALL,
  lists: [],
}


class ListsStore extends EventEmmiter {

  constructor() {
    super()
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getState() {
    return _state
  }

  /////////////////////////////////////////////////////////////////////////////

  addMovieToCurrentList(movie) {
    let listId = _state.currentList.id

    //
    // Display movie on current list
    // before send it to backend to improve UX
    movie.active = true
    movie.watched = false
    _state.currentList.movies.push(movie)
    this.emitChange()

    // Send movie to backend
    listService.postMovie(listId, movie)
  }

  deleteCurrentList() {
    let listId = _state.currentList.id

    // Check if current is personal list
    if (_state.currentList.personalList) {
      x0p(
        'Impossible action',
        'Personal list can not be removed',
        'error',
        false
      );

      return;
    }

    //
    // Search for list to delete
    let index = -1
    for (let i = 0; i < _state.lists.length; i++) {
      if (_state.lists[i].id === listId) {
        index = i
      }
    }

    if (index > 0) {

      // Request confirmation from user
      x0p(
        'Are you sure?',
        'The list will be deleted permanently from the list',
        'warning'
      ).then(data => {
        if (data.button === 'warning') {

          // Remove from local lists array
          _state.lists.splice(index, 1)
          this.emitChange()

          // Send delete request to backend
          listService.deleteList(listId)

          // Go to personal list
          let userEmail = toWatchConstants.userData.email
          this.viewPersonalList(userEmail)
        }
      })
    }
  }

  deleteMovie(movie) {
    let listId = _state.currentList.id

    //
    // Check if movie exists on current list
    let movieIndex = -1
    for (let i = 0; i < _state.currentList.movies.length; i++) {
      let lMovie = _state.currentList.movies[i]
      if (lMovie.tmdbId === movie.tmdbId) {
        movieIndex = i
        break
      }
    }

    if (movieIndex >= 0) {

      // Request confirmation from user
      x0p(
        'Are you sure?',
        '\'' + movie.title + '\' will be deleted permanently from the list',
        'warning'
      ).then(data => {
        if (data.button === 'warning') {

          // Delete movie from current list
          // before delete on backend to improve UX
          _state.currentList.movies.splice(movieIndex, 1)
          this.emitChange()

          // Send update request to backend
          listService.deleteMovie(listId, movie)
        }
      })
    }
  }

  displayMovieDetails(tmdbId) {
    _state.viewingDetailsOf = tmdbId
    this.emitChange()
  }

  fetchListsNames(email) {
    listService.fetchListsNames(email, (err, jResponse) => {
      if (err) {
        console.error(err)
      } else {
        _state.lists = jResponse
        this.emitChange()
      }
    })
  }

  postList(ownerEmail, listName) {
    listService.postList(ownerEmail, listName, (err, jResponse) => {
      if (err) {
        console.error(err)
      } else {

        // Reset lists array to force to re download
        // lists names
        _state.lists = []
      }

      _state.currentView = LConstants.VIEW.LIST_ALL
      this.emitChange()
    })
  }

  renderCreateList() {
    _state.currentView = LConstants.VIEW.LIST_CREATE
    this.emitChange()
  }

  /**
   * Shows all the user's lists
   */
  renderLists() {
    _state.currentView = LConstants.VIEW.LIST_ALL
    this.emitChange()
  }

  /**
   * Render the contents of a given list
   * @param list
   */
  renderList(list) {
    _state.currentList = list
    this.emitChange()
  }

  shareList(email) {
    listService.shareList(
      email,
      _state.currentList.id,
      (err, response) => {
        if (!err) {
          _state.currentList.sharedWith.push(email)
          this.emitChange()
        }
      })
  }

  updateMovie(movie) {
    let listId = _state.currentList.id

    //
    // Check if required movie exits in current list
    let movieIndex = -1
    for (let i = 0; i < _state.currentList.movies.length; i++) {
      let lMovie = _state.currentList.movies[i]
      if (lMovie.tmdbId === movie.tmdbId) {
        movieIndex = i
        break
      }
    }

    if (movieIndex >= 0) {

      // Update UI before send request to
      // backend to improve UX
      _state.currentList.movies[movieIndex] = movie
      this.emitChange()

      // Send update request to backend
      listService.updateMovie(listId, movie)
    }
  }

  viewList(ownerEmail, listId) {
    listService.fetchList(ownerEmail, listId, (err, list) => {
      if (err) {
        console.error(err)
      } else {
        this.renderList(list)
      }
    })
  }

  viewPersonalList(ownerEmail) {
    listService.fetchPersonalList(ownerEmail, (err, list) => {
      if (err) {
        console.error(err)
      } else {
        this.renderList(list)
      }
    })
  }
}

//
// Prepare list store instance to listen for events
// and export it
let listsStore = new ListsStore()
listsStore.dispatchToken = AppDispatcher.register(action => {
  let ownerEmail
  let listId
  let listName
  let email

  switch (action.type) {
    case LConstants.ACTIONS.LIST_CREATE:
      ownerEmail = action.ownerEmail
      listName = action.listName
      listsStore.postList(ownerEmail, listName)
      break

    case LConstants.ACTIONS.LIST_DELETE_CURRENT:
      listsStore.deleteCurrentList()
      break

    case LConstants.ACTIONS.LIST_READ:
      ownerEmail = action.ownerEmail
      listId = action.listId
      listsStore.viewList(ownerEmail, listId)
      break

    case LConstants.ACTIONS.LIST_READ_PERSONAL:
      listsStore.viewPersonalList(action.ownerEmail)
      break

    case LConstants.ACTIONS.LIST_SHARE:
      email = action.email
      listsStore.shareList(email)
      break

    case LConstants.ACTIONS.LISTS_READ:
      listsStore.fetchListsNames(action.email)
      break

    case LConstants.ACTIONS.LIST_RENDER_CREATE:
      listsStore.renderCreateList()
      break

    case LConstants.ACTIONS.LIST_RENDER_LISTS:
      listsStore.renderLists()
      break

    case LConstants.ACTIONS.MOVIE_CREATE:
      listsStore.addMovieToCurrentList(action.movie)
      break

    case LConstants.ACTIONS.MOVIE_DELETE:
      listsStore.deleteMovie(action.movie)
      break

    case LConstants.ACTIONS.MOVIE_DISPLAY_DETAILS:
      listsStore.displayMovieDetails(action.tmdbId)
      break

    case LConstants.ACTIONS.MOVIE_UPDATE:
      listsStore.updateMovie(action.movie)
      break
  }
})

export default listsStore