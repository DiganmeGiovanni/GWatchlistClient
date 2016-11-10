
import EventEmmiter from "events";
import YTPlayerConstants from "./YTPlayerConstants";
let AppDispatcher = require('./../dispatcher/AppDispatcher')
let youtubeService = require('./../services/youtubeService')

let CHANGE_EVENT = 'CHANGE_EVENT'

// State defaults
let _state = {
  currentVideoId: '',
  modalHidden: true,
  playing: false,
  searchTerm: 'Reactive programming',
  videos: []
}

class YTPlayerStore extends EventEmmiter {

  constructor() {
    super()
  }

  emitChange() {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return _state
  }

  //////////////////////////////////////////////////////////////////////////////

  playVideo(videoId) {
    _state.modalHidden = false
    _state.playing = true
    _state.currentVideoId = videoId
    this.emitChange()
  }

  searchVideos(searchTerm) {
    youtubeService.searchVideos(searchTerm, (err, foundVideos) => {
      if (err) {
        console.error('Error on youtube service')
        console.error(err)
      } else {
        foundVideos = JSON.parse(foundVideos)
        console.log('Found videos:')
        console.log(foundVideos);

        let videosItems = foundVideos.items
        let videos = []
        for (let i = 0; i < videosItems.length; i++) {
          let trailerJson = videosItems[i]
          videos.push({
            videoId: trailerJson.id.videoId,
            videoTitle: trailerJson.snippet.title,
            videoDesc: trailerJson.snippet.description,
            videoImgUrl: trailerJson.snippet.thumbnails.high.url
          })
        }

        _state.modalHidden = false
        _state.playing = false
        _state.searchTerm = searchTerm
        _state.videos = videos
        this.emitChange()
      }
    })
  }

  stopAndCloseModal() {
    _state.modalHidden = true
    _state.playing = false
    this.emitChange()
  }
}

//
// Prepare store instance for export
let ytPlayerStore = new YTPlayerStore()
ytPlayerStore.dispatchToken = AppDispatcher.register(action => {

  switch (action.type) {
    case YTPlayerConstants.ACTION_PLAY_VIDEO:
      ytPlayerStore.playVideo(action.videoId)
      break

    case YTPlayerConstants.ACTION_SEARCH_VIDEOS:
      ytPlayerStore.searchVideos(action.searchTerm)
      break

    case YTPlayerConstants.ACTION_STOP_AND_CLOSE_PLAYER:
      ytPlayerStore.stopAndCloseModal()
      break
  }
})

export default ytPlayerStore
