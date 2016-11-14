
import React from 'react'

import ListContentStore from './../listContents/ListContentStore'
import ListShareActions from './ListShareActions'


class ListShare extends React.Component {

  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)
    this.isEmail = this.isEmail.bind(this)
    this.isSharedWith = this.isSharedWith.bind(this)
    this.onClickBtnShare = this.onClickBtnShare.bind(this)

    this.state = ListContentStore.getState()
  }

  componentDidMount() {
    ListContentStore.addChangeListener(this._onChange)

    // Clear form on modal close
    $('#modal-list-share').on('hidden.bs.modal', () => {
      $('#p-email').addClass('hidden')
      $('#p-error-repeated-email').addClass('hidden')
      $('#inp-email').val('')
    })
  }

  componentWillUnmount() {
    ListContentStore.removeChangeListener(this._onChange)
  }

  render() {
    let list = this.state.currentList
    let emailsJSX = this.constructEmailsJSX(list.sharedWith)

    return (
      <div id="modal-list-share" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Share list</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xs-12">
                  <h4>{list.name}</h4>
                </div>

                {/* Form to share */}
                <div className="col-xs-8 col-sm-10">
                  <label htmlFor="inp-email">Share with</label>
                  <input
                    id="inp-email"
                    className="form-control"
                    placeholder="Type email to share"
                    type="text"
                  />
                  <p
                    id="p-error-email"
                    className="alert alert-danger hidden"
                  >
                    Please type a valid email
                  </p>
                  <p
                    id="p-error-repeated-email"
                    className="alert alert-danger hidden"
                  >
                    The list is already shared with this email
                  </p>
                </div>

                {/* Button to share */}
                <div className="col-xs-4 col-sm-2 no-padding-left">
                  <label>&nbsp;</label><br/>
                  <button
                    className="btn btn-primary"
                    onClick={this.onClickBtnShare}
                  >
                    <span className="glyphicon glyphicon-send"></span>
                    <span>&nbsp;&nbsp;Share</span>
                  </button>
                </div>
              </div>

              <div className="row">

                {/* Shared with */}
                <div className="col-xs-12"><br/>
                  <b>Currently shared with:</b>
                </div>
                <div className="col-xs-12" style={{paddingTop: '5px'}}>
                  {emailsJSX}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(ListContentStore.getState())
  }

  constructEmailsJSX(emails) {
    if (emails.length === 0) {
      return <i>No shared yet</i>
    }

    let emailsJSX = []
    for (let i = 0; i < emails.length; i++) {
      let emailJSX = (
        <span
          key={'shared-with-' + i}
          className="label label-primary"
          style={{display: 'inline-block', marginRight: '5px', marginTop: '5px', padding: '5px'}}
        >
          {emails[i]}
        </span>
      )
      emailsJSX.push(emailJSX)
    }

    return emailsJSX
  }

  isEmail(str) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(str)
  }

  belongsTo(email) {
    let ownerEmail = this.state.currentList.ownerEmail
    return ownerEmail === email
  }

  isSharedWith(email) {
    let sharedWith = this.state.currentList.sharedWith
    for (let i = 0; i < sharedWith.length; i++) {
      if (sharedWith[i] === email) {
        return true;
      }
    }

    return false;
  }

  onClickBtnShare() {
    $('#p-error-email').addClass('hidden')
    $('#p-error-repeated-email').addClass('hidden')

    let email = $('#inp-email').val()
    if (!this.isEmail(email)) {
      $('#p-error-email').removeClass('hidden')
      $('#inp-email').select()
    }
    else if (this.isSharedWith(email) || this.belongsTo(email)) {
      $('#p-error-repeated-email').removeClass('hidden')
      $('#inp-email').select()
    }
    else {
      $('#inp-email').val('')
      $('#inp-email').focus()

      ListShareActions.shareList(email)
    }
  }
}

export default ListShare