'use client'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function LoginHeader() {
  const {navbarMove, LoginUser, loggedIn} = useContext(MainContext)
  

  return (
    <header>
      
      <div className="logo-box">
      <img className="logo" src=
      {"/logo.png"} width="20" height="20"></img><h1>Bug Tracker</h1>
      </div>
    </header>
      
  )
}

export default LoginHeader