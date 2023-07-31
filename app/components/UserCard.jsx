"use client"
import { useRouter} from 'next/navigation';
import { useContext} from "react";
import MainContext from "@/app/components/MainContext";

function UserCard({user, setData, data}) {
    const { push } = useRouter();
    const {LoginUser} = useContext(MainContext)
    

    async function cardClicked(e, user)
  {
    if(e.target.classList.contains('delete-user-button'))
    {
      console.log("delete " + user._id)
      await fetch('/api/users/delete', {
        method: 'POST',
        body: JSON.stringify(user._id),
      });
      let card = data.filter(selectedCard => selectedCard._id !== user._id)
      setData([...card])
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
        {(user.role !== "Super-Admin" && LoginUser?.role === "Admin" && LoginUser?.email !== user.email ) ||  LoginUser?.role === "Super-Admin" && LoginUser?.email !== user.email ? 
        <div className="user-card-buttons">
        <button className="edit-user-button card-button"><img src="edit.svg" width={15} height={15} alt="" />  Edit</button>
        <button className="delete-user-button card-button" ><img src="bin.svg" width={15} height={15} alt="" /> Delete</button>
        </div>
        :null}
    </div>
  )
}

export default UserCard