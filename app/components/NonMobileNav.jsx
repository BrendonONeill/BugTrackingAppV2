'use client'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import NonMobileAdminNav from "./NonMobileAdminNav";
import NonMobileUserNav from "./NonMobileUser";


function NonMobileNav() {
  let {LoginUser} = useContext(MainContext)
  return (
    <>
    {
    LoginUser?.role === "User" ? <NonMobileUserNav /> : LoginUser?.role === "Admin" || LoginUser?.role === "Super-Admin" ? <NonMobileAdminNav /> : null
    }
    </>
  )
}

export default NonMobileNav