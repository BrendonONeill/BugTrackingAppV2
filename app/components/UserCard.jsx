"use client"
import { useRouter} from 'next/navigation';
import { useContext} from "react";
import MainContext from "@/app/components/MainContext";

function UserCard({user, setUsers, users}) {
    const { push } = useRouter();
    const {LoginUser, setFlashCard} = useContext(MainContext)
    

    async function cardClicked(e, user)
  {
    if(e.target.classList.contains('delete-user-button'))
    {
      await fetch('/api/users/delete', {
        method: 'POST',
        body: JSON.stringify(user._id),
      });
      let card = users.filter(selectedCard => selectedCard._id !== user._id)
      setUsers([...card])
      setFlashCard("User was deleted")
    }
    if(e.target.classList.contains('edit-user-button'))
    {
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
        {(user.role !== "Super-Admin" && LoginUser?.role === "Admin" && LoginUser?.email !== user.email ) ||  LoginUser?.role === "Super-Admin" && LoginUser?.email !== user.email ? 
        <div className="user-card-buttons">
        <button className="edit-user-button card-button"><img src="edit.svg"  role="presentation" width={15} height={15} alt="" />  Edit</button>
        <button className="delete-user-button card-button" ><img src="bin.svg"  role="presentation" width={15} height={15} alt="" /> Delete</button>
        </div>
        :null}
    </div>
  )
}

export default UserCard