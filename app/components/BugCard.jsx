

export default function BugCard({post}) {
  return (
    <div className="card">
          
          <div className='bug-card-header'>
          <div className={post.bugImportance === 'low' ? 'bug-importance bug-low' : post.bugImportance === 'medium' ? 'bug-importance bug-med' : post.bugImportance === 'high' ? 'bug-importance bug-hight': ""}></div>
          <div className='bug-card-header-inner'>
          <h2>{post.bugName}</h2>
          </div>
          </div>
          <div className="bug-card-main">
          <div className="flex-badge">
          <div className='project-badge'>
            <img src="folder.svg" width={15} height={15} alt="" />
          <p>{post.bugProject}</p>
          </div>

          <div className='project-badge'>
            <img src="code.svg" width={15} height={15} alt="" />
          <p>{post.bugCode}</p>
          </div>
          </div>
          <div className="bug-card-text">
          <img src="user-card.svg" width={20} height={20} alt="" />
          <p>{post.bugUserId.fname+ " " + post.bugUserId.lname[0]}</p>
          </div>
          <div className="bug-card-text">
          <img src="calendar.svg" width={20} height={20} alt="" />
          <p>{post.dateBugCreated.toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
          </div>
          <div className="bug-card-buttons">
            <button><img src="down.svg" width={15} height={15} alt="" />  Expand</button>
            <button><img src="edit.svg" width={15} height={15} alt="" />  Edit</button>
            <button id="delete-button"><img src="bin.svg" width={15} height={15} alt="" />  Delete</button>
          </div>
          </div>
        </div>
  )
}

