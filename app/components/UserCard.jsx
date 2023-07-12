"use client"
import { useRouter} from 'next/navigation';
function UserCard({user}) {
    const { push } = useRouter();

    async function cardClicked(e, user)
  {
    if(e.target.classList.contains('delete-user-button'))
    {
      console.log("delete " + user._id)
      await fetch('/api/users/delete', {
        method: 'POST',
        body: JSON.stringify(user._id),
      });
    }
    if(e.target.classList.contains('edit-user-button'))
    {
      console.log("Edit " + user._id)
      push(`/users/edit/${user._id}`)
    }
  }
  return (
    <div className='user-card' onClick={(e) => cardClicked(e,user)}>
        <div className='user-card-header'>
        <h2>{user.fname} {user.lname}</h2>
        </div>
        <div className='user-card-main'>
          <div className='user-card-email'>
          <p>{user.email}</p>
          </div>
        <p><strong>Role: </strong> {user.title}</p>
        <p><strong>Access Level: </strong> {user.role}</p>
        <p><strong>Account Created: </strong> {user.dateCreated.slice(0,10)}</p>
        </div>
        <div className="user-card-buttons">
            <button className="edit-user-button card-button"><img src="edit.svg" width={15} height={15} alt="" />  Edit</button>
            <button className="delete-user-button card-button" ><img src="bin.svg" width={15} height={15} alt="" /> Delete</button>
          </div>
    </div>
  )
}

export default UserCard