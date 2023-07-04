"use client"
import { useRouter} from 'next/navigation';
function UserCard({user}) {
    const { push } = useRouter();

    async function cardClicked(e, user)
  {
    if(e.target.id === 'delete-bug-button')
    {
      console.log("delete " + user._id)
      await fetch('/api/users/delete', {
        method: 'POST',
        body: JSON.stringify(user._id),
      });
    }
    if(e.target.id === 'edit-bug-button')
    {
      console.log("Edit " + user._id)
      push(`/users/edit/${user._id}`)
    }
  }
  return (
    <div onClick={(e) => cardClicked(e,user)}>
        <h1>{user.fname}</h1>
        <h2>{user.email}</h2>
        
        <div className="bug-card-buttons">
            <button id="edit-bug-button"><img src="edit.svg" width={15} height={15} alt="" />  Edit</button>
            <button id="delete-bug-button" ><img src="bin.svg" width={15} height={15} alt="" /> Delete</button>
          </div>
    </div>
  )
}

export default UserCard