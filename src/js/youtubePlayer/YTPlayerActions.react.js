
let AppDispatcher = require('./../dispatcher/AppDispatcher')
import YTPlayerConstants from "./YTPlayerConstants";

let YTPlayerActions = {

  playVideo(videoId) {
    AppDispatcher.dispatch({
      type: YTPlayerConstants.ACTION_PLAY_VIDEO,
      videoId: videoId
    })
  },

  searchVideos(searchTerm) {
    AppDispatcher.dispatch({
      type: YTPlayerConstants.ACTION_SEARCH_VIDEOS,
      searchTerm: searchTerm
    })
  },

  stopAndCloseModal() {
    AppDispatcher.dispatch({
      type: YTPlayerConstants.ACTION_STOP_AND_CLOSE_PLAYER
    })
  }
}

export default YTPlayerActions
