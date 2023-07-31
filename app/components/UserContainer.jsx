"use client"
import UserCard from "../components/UserCard"
import { useContext, useState } from "react";
import MainContext from "@/app/components/MainContext";

function UserContainer({users}) {
  const [data, setData] = useState(users)

  return (
    <div className="user-card-container">
      {
        users.length > 0 ?
                data.map((user) => (
                <UserCard user={user} data={data} setData={setData} key={user._id} />
                )) : null
            }
    </div>
  )
}

export default UserContainer