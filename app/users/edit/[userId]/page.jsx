"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import UserFormEdit from '@/app/components/UserFormEdit'
import Nav from '@/app/components/Nav';

function page() {
    let {users} = useContext(MainContext)
    const pathName = useParams()
    const [editUser, setEditUser] = useState(null)
 
    useEffect(() => {
     console.log("use effect")
     function test()
     {
         console.log("use effect function")
         let test = users.filter(user => user._id === pathName.userId)
         setEditUser(test[0])
     }
     test()
    },[])

 return (
    <main>
        <Nav />
        {editUser !== null ?
        <UserFormEdit user={editUser} id={pathName.userId}  /> : null}
    </main>
  )
}

export default page