import React, { Component } from 'react'
import spinner from './Spinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className="my-3" src={spinner} alt="loading" />
      </div>
    )
  }
}

export default Spinner
