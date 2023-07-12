"use client"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function Profile() {
    let {LoginUser} = useContext(MainContext)
  return (
    <div className='profile-container'>
        <img src="code.svg" width={50} height={50} alt="" />
        {LoginUser !== null ?
        <>
        <h1>{LoginUser.fname} {LoginUser.lname}</h1>
        <p>{LoginUser.email}</p>
        <p>{LoginUser.role}</p>
        <p>{LoginUser.title}</p>
        <p>{LoginUser.dateCreated.slice(0,10)}</p></> : null}
    </div>
  )
}

export default Profile