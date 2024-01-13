import React from 'react'
import spinner from './Spinner.gif'

const Spinner=()=> {
  
    return (
      <div className='text-center'>
        <img className="my-3" src={spinner} alt="loading" />
      </div>
    )
  
}

export default Spinner
