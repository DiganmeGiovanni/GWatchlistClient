
import React from 'react'

import ListContentStore from './ListContentStore'


class ListComponent extends React.Component {

  constructor (props) {
    super(props)
    this._onChange = this._onChange.bind(this)

    this.state = ListContentStore.getState()
  }

  componentDidMount() {
    ListContentStore.addChangeListener(this._onChange)
  }

  componentWillUnmount() {
    ListContentStore.removeChangeListener(this._onChange)
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h4>{this.state.currentList.name}</h4>
          <hr/>
        </div>

        {/* Pending movies */}
        <div className="col-xs-12">
          <h6>Movies in list</h6>
        </div>
      </div>
    )
  }

  //////////////////////////////////////////////////////////////////////////////

  _onChange() {
    this.setState(ListContentStore.getState())
  }

}

export default ListComponent