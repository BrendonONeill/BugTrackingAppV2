"use client"
import code from '@/public/code.svg'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function Profile() {
    let {LoginUser} = useContext(MainContext)
  return (
    <main>
    <div className='profile-container'>
      
        {LoginUser !== null ?
        <><div className='profile-image-container'>
        <img src="../user.svg" width={50} height={50} alt="" />
      </div>
        <div className='profile-text'>
        <div className='profile-name'>
        <h2>{LoginUser.fname} {LoginUser.lname}</h2>
        </div>
        <p><strong>Email: </strong>{LoginUser.email}</p>
        <div className='profile-badges-container'>
        <p className='profile-badge'>{LoginUser.role}</p>
        <p className='profile-badge'>{LoginUser.title}</p>
        </div>
        <p><strong>Account Created: </strong>{LoginUser.dateCreated.slice(0,10)}</p></div></> : null}
    </div>
    </main>
  )
}

export default Profile