"use client"
import { useRouter} from 'next/navigation';
export default function bugCard({post}) {
  const { push } = useRouter();
  
  async function cardClicked(e, post)
  {
    if(e.target.id === 'delete-bug-button')
    {
      console.log("delete " + post._id)
      await fetch('/api/bugs/delete', {
        method: 'POST',
        body: JSON.stringify(post._id),
      });
    }
    if(e.target.id === 'edit-bug-button')
    {
      console.log("Edit " + post._id)
      push(`/bugs/edit/${post._id}`)
    }
    if(e.target.id === 'expand-bug-button')
    {
      console.log("Expand " + post._id)
      push(`/bugs/${post._id}`)
     
    }
  }
  return (
    <div className="card" onClick={(e) => cardClicked(e,post)}>
          <div className='bug-card-header'>
          <div className={post.bugImportance === 'low' ? 'bug-importance bug-low' : post.bugImportance === 'medium' ? 'bug-importance bug-med' : post.bugImportance === 'high' ? 'bug-importance bug-high': ""}></div>
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
          <p>{post.dateBugCreated.slice(0,10)}</p>
          </div>
          <div className="bug-card-buttons">
            <button id="expand-bug-button"><img src="down.svg" width={15} height={15} alt="" />  Expand</button>
            <button id="edit-bug-button"><img src="edit.svg" width={15} height={15} alt="" />  Edit</button>
            <button id="delete-bug-button" ><img src="bin.svg" width={15} height={15} alt="" /> Delete</button>
          </div>
          </div>
        </div>
  )
}

