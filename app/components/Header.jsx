'use client'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function Header() {
  const {navbarMove, LoginUser, loggedIn} = useContext(MainContext)
  

  return (
    <header>
      <div className="burger-box">
      { loggedIn === true ?
        <button className="burger-button" onClick={navbarMove}>
          <img src="/burger.svg" alt="burger icon for menu"></img>
        </button> : null
      }
      </div>
      <div className="logo-box">
      <img className="logo" src=
      {"/logo.png"} width="20" height="20" alt="Bug Tracking Logo"></img><h1>Bug Tracker</h1>
      </div>
      { loggedIn === true ? 
      <div className="login-box">
      <img className="login-box-img" src={"/user.svg"}></img>
      <p>{LoginUser.fname + " " + LoginUser.lname[0]}</p></div>: null}
      </header>
      
  )
}

export default Header