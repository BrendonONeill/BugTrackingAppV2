"use client"
import UserCard from "../components/UserCard"
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import Loading from "./Loading";
import ConfirmCard from "./ConfirmCard";

function UserContainer() {
  const {accessToken, flashCard, setFlashCard} = useContext(MainContext)
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  const [deleteCardContent, setDeleteCardContent] = useState({});
  const [deleteString, setDeleteString] = useState("");
  const [deleteCard, setDeleteCard] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);


  useEffect(() => {
    async function test()
  {
    try 
    {
      const res = await fetch("/api/users", {method: "GET", cache: 'no-store'}).catch(error => console.error(error))
      if(res.status === 201)
      {
        const data = await res.json()
        setUsers(data.users)
        setError("")
      }
      else
      {
        throw new Error(res.statusText)
      }
      
    } 
    catch (error) 
    {
      console.error(error)
      setError(error.message)
    }
  }
  test()
  },[accessToken])

  async function permanentlyDelete(e)
  {
    e.preventDefault();
    console.log(deleteCardContent)
    await fetch('/api/users/delete', {
      method: 'POST',
      body: JSON.stringify(deleteCardContent._id),
    });

    let card = users.filter(user => user._id !== deleteCardContent._id)
    setUsers([...card])
    setFlashCard("User was deleted")
    setDeleteString("");
    setDeleteCard(false);
    setDeleteCardContent({});
    setDeleteButton(false);
  }

  function hide(e)
  {
    if(e.target.classList.contains("confirm-card-user-bg") || e.target.classList.contains("delete-card-close"))
      {
        setDeleteCard(false);
        setDeleteButton(false);
      }
  }

  function deletionProcess(information)
  {
    let a = information.fname.trim();
    let b = information.lname.trim();
    let c = information.title.trim();
    c = c.replaceAll(" ", "_");
    setDeleteCardContent(information);
    setDeleteString(`${a}${b}/${c}`);
    setDeleteCard(true);
  }

  setTimeout(() => {
    if(flashCard !== '')
    {
      setFlashCard('');
    }
  }, 3000)  

  return (
    <div className="user-card-container">
      {
        deleteCard ?
        <div className="confirm-card-user-bg" onClick={(e) => hide(e)}>
        <ConfirmCard text={'This will permanently delete this user if you are sure re-type the below string into the input box and submit.(Case Sensitive)'} permanentlyDelete={permanentlyDelete} deleteString={deleteString} deleteButton={deleteButton} setDeleteButton={setDeleteButton} />
        </div> : null
      }
      {
      flashCard ? 
        <div className="flashCard">
          {flashCard}
        </div>
      : null
      }
      {
        error ? 
        <div>
          <h1>{error}</h1>
        </div>:
        users?.length > 0 ?
                users.map((user) => (
                <UserCard user={user} users={users} setUsers={setUsers} key={user._id} deletionProcess={deletionProcess} />
                )) : <Loading />
      }
    </div>
  )
}

export default UserContainer
