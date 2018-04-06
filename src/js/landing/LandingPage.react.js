
import React from 'react'
import userActions from '../watchlist/UserActions'

class LandingPage extends React.Component {

  componentDidMount() {
    this.renderGoogleSignInButton()
  }

  static displayAnimatedLoadProcess() {
    $('#container-loading').removeClass('hidden');
    $('#container-google-signin').addClass('hidden');
  }

  renderGoogleSignInButton() {

    gapi.signin2.render('g-signin2-custom', {
      'scope': 'profile email',
      'width': '240',
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': function (googleUser) {
        LandingPage.displayAnimatedLoadProcess()

        let profile = googleUser.getBasicProfile()
        let email   = profile.getEmail()
        let name    = profile.getName()

        userActions.loginUser(email, name)
      },
      'onfailure': function (error) {
        console.error('Google login just fail')
        console.error(error)

        userActions.logoutUser()
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

export default LandingPage