"use client"
import UserCard from "../components/UserCard"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function UserContainer() {
    const {users, setUsers} = useContext(MainContext)

  return (
    <div className="card-container">
      {
        users.length > 0 ?
                users.map((user) => (
                <UserCard user={user} key={user._id} />
                )) : null
            }
    </div>
  )
}

export default UserContainer