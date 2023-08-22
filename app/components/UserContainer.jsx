"use client"
import UserCard from "../components/UserCard"
import { useEffect, useState } from "react";
import Loading from "./Loading";

function UserContainer() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    async function test()
  {
    try 
    {
      const res = await fetch("http://localhost:3000/api/users", {method: "GET", cache: 'no-store'}).catch(error => console.log(error))
      if(res.staus === 201)
      {
        const data = await res.json()
        console.log(data)
        setUsers(data.users)
      }
      else
      {
        throw new Error(res.statusText)
      }
      
    } 
    catch (error) 
    {
      console.log(error)
      setError(error.message)
    }
  }
  test()
  },[]) 
  return (
    <div className="user-card-container">
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
