"use client"
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import { useParams } from 'next/navigation';
import UserFormEdit from '@/app/components/UserFormEdit'
import Link from 'next/link';
import Loading from '@/app/components/Loading';

function UserFormEditContainer() {
    const {accessToken, setFlashCard} = useContext(MainContext)
    const pathName = useParams()
    const [editUser, setEditUser] = useState(null)
 
    useEffect(() => {
     function test()
     {
        fetch(`/api/users/collectuser?q=${pathName.userId}`, {method: "GET"}).then(res => res.json()).then(data => {
        setEditUser(data.user)}).catch(error => console.log(error))
     }
     test()
    },[accessToken])

  return (
    <>
    {editUser ?
        <>
        <Link className='back-link' href={{pathname: '/users'}} ><img width={30} height={30} src="../../back.svg" alt="back arrow" /></Link>
        <UserFormEdit user={editUser} id={pathName.userId} setFlashCard={setFlashCard}  /> 
        </>
        : <Loading /> 
        
    }
    </>
  )
}

export default UserFormEditContainer