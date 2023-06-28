
import React from 'react'

export default function BugCard({post}) {
  return (
    <div className="card">
          <div className="card-importance"></div>
          <h1>{post.bugName}</h1>
          <p>{post.bugProject}</p>
          <p>{post.bugUserId.fname+ " " + post.bugUserId.lname[0]}</p>
          <p>{post.dateBugCreated.toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
          <p>{post.bugImportance}</p>
          <button>More Information</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
  )
}

