"use client"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

export default function RecycleCard({post, setEmptyList, deletionProcess}) {
  const {LoginUser, setRecyclingBinBugs, recyclingBinBugs, setFlashCard} = useContext(MainContext)

  async function cardClicked(e, post)
  {
    if(e.target.classList.contains('restore'))
    {
      await fetch('/api/bugs/restore', {
        method: 'POST',
        body: JSON.stringify({id:post._id, user: LoginUser}),
      });
      let data = recyclingBinBugs.filter(bug => bug._id !== post._id)
      setFlashCard('Bug was Restored')
      setRecyclingBinBugs([...data])
      if(data.length <= 0)
      {
        setEmptyList(true);
      }
    }
    if(e.target.classList.contains('delete'))
      {
        deletionProcess(post)
      }
  }

  function test(deleted)
  {
    let a = new Date()
    let b = new Date(deleted.slice(0,10))
    let ans = parseInt((b.getTime() - a.getTime())/8.64e+7)
    return ans
  }

  function convert(date)
  {
    let a = new Date(date)
    return a.toLocaleString('en-GB', {day:'numeric', month: 'short', year:'numeric'})
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
          <div className="bug-card-text recycle-name">
          <img src="../nav-user.svg"  role="presentation" width={20} height={20} alt="" />
          <p>{post.bugUserId.fname} {post.bugUserId.lname[0]}</p>
          </div>
          <div className="bug-card-p-text">
          <p><span className="bug-h">Created:</span>  {convert(post.dateBugCreated.slice(0,10))}</p>
          </div>
          <div className="bug-card-p-text">
          <p><span className="bug-h">Deleted:</span>  {convert(post.dateBugDeleted.slice(0,10))}</p>
          </div>
          <div className="bug-card-p-text">
          <p><span className="bug-h">Expires in:</span> {test(post.dateBugExpires)} Days</p>
          </div>
          <div className="recycle-card-buttons">
          <div className="recycle-card-button">
            <button className="restore"><img  role="presentation" className="none-pointer" src="../restore.svg" width={15} height={15} alt="" />  Restore</button>
          </div>
          <div className="recycle-card-button">
            <button className="delete"><img  role="presentation" className="none-pointer" src="../bin.svg" width={15} height={15} alt="" />  Delete</button>
          </div>
          </div>
          </div>
        </div>
  )
}

