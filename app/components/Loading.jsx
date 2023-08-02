import React from 'react'

function Loading() {
  return (
    <div className='loading-container'>
        <img src="/spinner.svg" width={40} height={40} alt="" />
        <p>Fetching Data...</p>
    </div>
  )
}

export default Loading