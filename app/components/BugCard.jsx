"use client"
import { useRouter} from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

export default function bugCard({post}) {
  const { push } = useRouter();
  const {LoginUser, setBugs, bugs} = useContext(MainContext)
  
  async function cardClicked(e, post)
  {
    if(e.target.classList.contains('delete-bug-button'))
    {
      
      await fetch('/api/bugs/delete', {
        method: 'POST',
        body: JSON.stringify(post._id),
      });
      let data = bugs.filter(bug => bug._id !== post._id)
      setBugs([...data])
    }
    if(e.target.classList.contains('edit-bug-button'))
    {
      push(`/bugs/edit/${post._id}`)
    }
    if(e.target.classList.contains('expand-bug-button'))
    {
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
            <img src="folder.svg"  role="presentation" width={15} height={15} alt="" />
          <p>{post.bugProject}</p>
          </div>

          <div className='project-badge'>
            <img src="code.svg"  role="presentation" width={15} height={15} alt="" />
          <p>{post.bugCode}</p>
          </div>
          </div>
          <div className="bug-card-text">
          <img src="user-card.svg"  role="presentation" width={20} height={20} alt="" />
          <p>{post.bugUserId.fname+ " " + post.bugUserId.lname[0]}</p>
          </div>
          <div className="bug-card-text">
          <img src="calendar.svg"  role="presentation" width={20} height={20} alt="" />
          <p>{post.dateBugCreated.slice(0,10)}</p>
          </div>
          <div className="bug-card-buttons">
            <button className="expand-bug-button card-button"><img  role="presentation" src="down.svg" width={15} height={15} alt="" />  Expand</button>
            { post.bugUserId?._id === LoginUser?._id ?
            <>
              <button className="card-button edit-bug-button"><img  role="presentation" src="edit.svg" width={15} height={15} alt="" />  Edit</button>
              <button className="delete-bug-button card-button" ><img  role="presentation" src="bin.svg" width={15} height={15} alt="" /> Delete</button>
            </> : null
            }
          </div>
          </div>
        </div>
  )
}

