import React from 'react'

function BugExpandInfo({infoBug}) {
  return (
    <div className='bug-expanded-info'>
        <h2>{infoBug.bugName}</h2>

        <p className='bug-expanded-info-label'>Created By</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugUserId?.fname} {infoBug.bugUserId?.lname}</p>
        </div>

        <p className='bug-expanded-info-label'>Description</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugDes}</p>
        </div>

        <p className='bug-expanded-info-label'>Code</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugCode}</p>
        </div>

        <p className='bug-expanded-info-label'>Project</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugProject}</p>
        </div>

        <p className='bug-expanded-info-label'>Importance</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugImportance}</p>
        </div>
      

        <p className='bug-expanded-info-label'>Date Created</p>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.dateBugCreated.slice(0,10)}</p>
        </div>
        </div>
  )
}

export default BugExpandInfo