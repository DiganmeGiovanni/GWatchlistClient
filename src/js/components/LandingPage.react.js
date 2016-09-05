
let React = require('react')

let LandingPage = React.createClass({

  render: () => {
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
        </div>
      </div>
    )
  }
})

module.exports = LandingPage
