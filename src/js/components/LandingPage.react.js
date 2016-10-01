
import React from 'react'
let UserActions = require('../actions/UserActions')

class LandingPage extends React.Component {

  componentDidMount() {
    this.renderGoogleSigninButton()
  }

  displayAnimatedLoadProcess() {
    $('#container-loading').removeClass('hidden');
    $('#container-google-signin').addClass('hidden');
  }

  renderGoogleSigninButton() {
    var self = this

    gapi.signin2.render('g-signin2-custom', {
      'scope': 'profile email',
      'width': '240',
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': function (googleUser) {
        self.displayAnimatedLoadProcess()

        var profile = googleUser.getBasicProfile()
        var email = profile.getEmail()
        var name  = profile.getName()

        console.log(email + ' just loged in [' + name + ']')
        UserActions.loginUser(name, email)
      },
      'onfailure': function (error) {
        console.error('Google login just fail')
        UserActions.logoutUser()
      }
    });
  }

  render() {
    return (
      <div className="jumbotron landing-jumbotron full-height">
        <div className="container text-center landing-container full-height">
          <div className="row">
            <div className="col-xs-12">
              <h1>GWatchlist</h1>
            </div>
            <div className="col-xs-12">
              <h3>Track all the movies you want to see and you ever seen</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12"><br/><br/>
              <span>Create multiple lists | Share with friends</span>
            </div>
          </div>

          { /* Signing button */ }
          <div id="container-google-signin" className="row"><br/><br/>
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
              <div id="g-signin2-custom" className="g-signin2-custom" style={{margin: 'auto'}}></div>
            </div>
          </div>

          { /* Spin for after successful login */ }
          <div id="container-loading" className="row hidden"><br/><br/>
            <div className="col-xs-12 col-sm-4 col-sm-offset-4 text-center">
              <span className="fa fa-spin fa-3x fa-spinner" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = LandingPage
