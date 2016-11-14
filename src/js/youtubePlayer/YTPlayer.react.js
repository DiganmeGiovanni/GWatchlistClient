
import React from "react";
import YTPlayerStore from "./YTPlayerStore";
import YTPlayerActions from "./YTPlayerActions.react";

class YTPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.playVideo = this.playVideo.bind(this)
    this.searchVideosAgain = this.searchVideosAgain.bind(this)
    this.stopVideoPlaying = this.stopVideoPlaying.bind(this)

    this._onChange = this._onChange.bind(this)
    this.state = YTPlayerStore.getState()
  }

  componentDidMount() {
    YTPlayerStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    YTPlayerStore.removeChangeListener(this._onChange)
  }

  componentDidUpdate() {
    if (this.state.modalHidden) {
      $('#modal-yt-player').modal('hide')
    } else {
      $('#modal-yt-player').modal('show')
      $('#modal-yt-player').on('hidden.bs.modal', () => {
          YTPlayerActions.stopAndCloseModal()
      })

      if (this.state.playing) {
        new YT.Player('yt-player', {
          width: '100%',
          videoId: this.state.currentVideoId,
          events: {
            'onReady': function (event) {
              event.target.playVideo()
            }
          }
        })
      }
    }
  }

  render() {
    if (this.state.modalHidden) {
      return (
        <div className="hidden" />
      )
    } else if (this.state.playing) {
      return this.renderModalPlayer()
    }
    else {
      return this.renderModalList()
    }
  }

  renderModalList() {
    let modalTitle = this.props.modalTitle
    return (
      <div id="modal-yt-player" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{modalTitle}</h4>
            </div>

            <div className="modal-body">
              <div className="row">
                {this.constructVideosListJSX()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderModalPlayer() {
    let modalTitle = this.props.modalTitle

    return (
      <div id="modal-yt-player" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{modalTitle}</h4>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <div id="yt-player"></div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={this.searchVideosAgain}
                className="btn btn-warning"
              >
                <span className="glyphicon glyphicon-film"></span>
                <span>&nbsp;Back to videos list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(YTPlayerStore.getState())
  }

  constructVideosListJSX() {
    var videos = this.state.videos

    if (videos.length == 0) {
      return (
        <div className="col-xs-12">
          <div className="text-center" style={{margin: '25px'}}>
            <span className="fa fa-spin fa-4x fa-spinner"></span>
            <br/><br/>
            <span>Searching videos</span>
          </div>
        </div>
      )
    }

    var videosJSX = []
    for(var i = 0; i < videos.length; i++) {
      var video = videos[i]

      videosJSX.push(
        <div
          key={'video-thumb-' + video.videoId}
          className="col-xs-6 col-sm-4"
          onClick={this.playVideo.bind(null, video.videoId)}
          style={{
            'padding': '10px',
            'cursor': 'pointer'
          }}
        >

          <img
            src={video.videoImgUrl}
            alt="Video thumb image"
            width="100%"
          />
        </div>
      )
    }

    return videosJSX
  }

  playVideo(videoId) {
    YTPlayerActions.playVideo(videoId)
  }

  searchVideosAgain() {
    YTPlayerActions.searchVideos(this.state.searchTerm)
  }

  stopVideoPlaying() {
    YTPlayerActions.stopAndCloseModal()
  }
}

export default YTPlayer
