'use client'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function Header() {
  const {navbarMove, LoginUser, loggedIn} = useContext(MainContext)
  

  return (
    <header>
      { loggedIn === true ?
      <div className="burger-box">
        <button className="burger-button" onClick={navbarMove}>
          <img src="/burger.svg"></img>
        </button>
      </div> : null
      }
      <div className="logo-box">
      <img className="logo" src=
      {"/logo.png"} width="20" height="20"></img><h1>Bug Tracker</h1>
      </div>
      { loggedIn === true ? 
      <div className="login-box">
      <img className="login-box-img" src={"/user.svg"}></img>
      <p>{LoginUser.fname + " " + LoginUser.lname[0]}</p></div>: null}</header>
      
  )
}

export default Header