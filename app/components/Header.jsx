'use client'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function Header() {
  const {navbarMove} = useContext(MainContext)
  

  return (
    <header>
      <div className="burger-box">
        <button className="burger-button" onClick={navbarMove}>
          <img src="/burger.svg"></img>
        </button>
      </div>
      <div className="logo-box">
      <img className="logo" src=
      {"/logo.png"} width="20" height="20"></img><h1>Bug Tracker</h1>
      </div>
      <div className="login-box">
      <img className="login-box-img" src={"/user.svg"}></img>
      <p>Brendon O'N</p></div></header>
      
  )
}

export default Header