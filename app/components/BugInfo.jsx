import React from 'react'

function BugInfo() {
  return (
    <div className='bug-info-box'>
        <div className='bug-info-section'>
        <p>Low</p>
        <div className='bug-info-colour green'></div>
        </div>
        <div className='bug-info-section'>
        <p>Med</p>
        <div className='bug-info-colour yellow'></div>  
        </div>
        <div className='bug-info-section'>
        <p>High</p>
        <div className='bug-info-colour red'></div>
        </div>
    </div>
  )
}

export default BugInfo