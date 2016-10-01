
import React, {Component} from 'react'

import Lists from './../lists/Lists.react'

class Toolbar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="top-bar">

          {/* Horizontal bar */}
          <div className="row">
            <div className="col-sm-4">

            </div>

            <div className="col-sm-8 text-right" style={{paddingTop: '4px'}}>

              {/* Add movie button */}
              <button className="btn btn-link btn-transparent hidden-xs" type="button">
                <span className="glyphicon glyphicon-film"></span>
                <span>&nbsp;&nbsp;ADD MOVIE</span>
              </button>

              {/* Share list button */}
              <button className="btn btn-link btn-transparent" type="button">
                <span className="fa fa-user-plus"></span>
                <span>&nbsp;&nbsp;SHARE LIST</span>
              </button>

              {/* Lists button */}
              <button
                className="btn btn-link btn-transparent"
                data-target="#modal-lists"
                data-toggle="modal"
                type="button"
              >
                <span className="fa fa-list-alt"></span>
                <span>&nbsp;&nbsp;LISTS</span>
              </button>

              {/* Spacing on small and up screens */}
              <label className="hidden-xs" style={{width: "30px"}}></label>

              {/* Preferences button */}
              <button
                className="btn btn-link btn-transparent"
                type="button"
                data-target="#preferences-modal"
                data-toggle="modal"
              >
                <span className="glyphicon glyphicon-cog" />
              </button>
            </div>
          </div>

          {/* FAB Button for extra small devices */}
          <button
            className="btn btn-fab visible-xs-block"
            data-target="#towatch-form-modal"
            data-toggle="modal"
            type="button"
          >
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          </div>

        {/* Modal for lists */}
        <Lists loggedUser={this.props.loggedUser} />
      </div>
    )
  }
}

export default Toolbar