"use client"
import UserCard from "../components/UserCard"
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import Loading from "./Loading";

function UserContainer() {
  const {accessToken, flashCard, setFlashCard} = useContext(MainContext)
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

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

  setTimeout(() => {
    if(flashCard !== '')
    {
      setFlashCard('');
    }
  }, 3000)  

  return (
    <div className="user-card-container">
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
                <UserCard user={user} users={users} setUsers={setUsers} key={user._id} />
                )) : <Loading />
      }
    </div>
  )
}

export default UserContainer
