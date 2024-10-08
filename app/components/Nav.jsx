'use client'
import Link from 'next/link'
import { useContext, useEffect } from "react";
import MainContext from "@/app/components/MainContext";
import AdminNav from './AdminNav';
import UserNav from './UserNav';

function Nav() {
  let {LoginUser,setMobileNav} = useContext(MainContext)
  useEffect(() => {
    setMobileNav(false)
  },[])
  return (
    <div className='mobile'>
    {
      LoginUser?.role === "User" ? <UserNav /> : LoginUser?.role === "Admin" || LoginUser?.role === "Super-Admin" ? <AdminNav /> : null
    }
    </div>
  )
}

export default Nav