import React from 'react'

function BugExpandInfo({infoBug}) {
  return (
    <div className='bug-expanded-info'>
        <h2>{infoBug.bugName}</h2>
        <div className='bug-expanded-info-name'>
        <p>{infoBug.bugUserId?.fname} {infoBug.bugUserId?.lname}</p>
        </div>
        <div className='bug-expanded-info-section'>
        <p>{infoBug.bugDes}</p>
        </div>
        <div className='bug-expanded-info-align'>
        <div className='bug-expanded-info-flex'>
        <div className='bug-expanded-info-block'>
        <img src="../codeWhite.svg" width={20} height={20} alt="" /><p>{infoBug.bugCode}</p>
        </div>
        <div className='bug-expanded-info-block'>
        <img src="../folderWhite.svg" width={20} height={20} alt="" />
        <p>{infoBug.bugProject}</p>
        </div>
        </div>
        <div className='bug-expanded-info-importance'>
        <div className='importance'></div>
        <p>{infoBug.bugImportance}</p>
        <p>Importance</p>
        </div>
        </div>
        <div className='bug-expanded-info-section'>
        <p>Created: {infoBug.dateBugCreated.slice(0,10)}</p>
        </div>
        </div>
  )
}

export default BugExpandInfo