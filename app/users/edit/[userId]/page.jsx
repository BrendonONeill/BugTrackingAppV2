"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import UserFormEdit from '@/app/components/UserFormEdit'
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import NonMobileAdminNav from "@/app/components/NonMobileAdminNav"

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
        <div className="grid-container">
        <NonMobileAdminNav />
        <div className="form-content-container">
        <Link className='back-link' href={{pathname: '/users'}} ><img width={30} height={30} src="../../back.svg" alt="back arrow" /></Link>
        {editUser !== null ?
        <UserFormEdit user={editUser} id={pathName.userId}  /> : null}
      </div>
      </div>
    </main>
  )
}

export default page