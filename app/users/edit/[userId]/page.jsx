"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import UserFormEdit from '@/app/components/UserFormEdit'
import Nav from '@/app/components/Nav';

function page() {
    const pathName = useParams()
    const [editUser, setEditUser] = useState(null)
 
    useEffect(() => {
     function test()
     {
        fetch(`/api/users/collectuser?q=${pathName.userId}`, {method: "GET"}).then(res => res.json()).then(data => {
        setEditUser(data.user)}).catch(error => console.log(error))
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