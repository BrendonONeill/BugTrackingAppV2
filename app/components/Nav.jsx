'use client'
import Link from 'next/link'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import AdminNav from './AdminNav';
import UserNav from './UserNav';

function Nav() {
  let {LoginUser} = useContext(MainContext)
  return (
    LoginUser?.role === "Admin" || LoginUser?.role === "Super-Admin"? 
    <AdminNav /> : <UserNav />
  )
}

export default Nav