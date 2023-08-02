"use client"
import UserCard from "../components/UserCard"
import { useEffect, useState } from "react";
import Loading from "./Loading";

function UserContainer() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function test()
  {
    const res = await fetch("http://localhost:3000/api/users", {method: "GET", cache: 'no-store'})
    const data = await res.json()
    setUsers(data.users)
  }
  test()
  },[]) 
  return (
    <div className="user-card-container">
      {
        users.length > 0 ?
                users.map((user) => (
                <UserCard user={user} users={users} setUsers={setUsers} key={user._id} />
                )) : <Loading />
      }
    </div>
  )
}

export default UserContainer