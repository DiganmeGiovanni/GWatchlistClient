
import React from 'react'
import ListContents from './../lists/ListContents.react'
import Toolbar from './../toolbar/Toolbar.react'

import userStore from './UserStore'
import LandingPage from '../landing/LandingPage.react'

class Watchlist extends React.Component {

  constructor(props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = {
      isUserLogged: false
    }
  }

  componentDidMount() {
    userStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    userStore.removeChangeListener(this._onChange)
  }

  _onChange() {
    console.log('Change received')
    console.log(userStore.getState().user.email)

    let userEmail = userStore.getState().user.email
    this.setState({
      isUserLogged: (userEmail && userEmail.length > 0)
    })
  }

  render() {
    if (this.state.isUserLogged) {
      return (
        <div className="container">
          <Toolbar user={ userStore.getState().user} />

          <div style={{marginTop: '80px'}}>
            <ListContents />
          </div>
        </div>
      )
    } else {
      return <LandingPage />
    }
  }
}

export default Watchlist