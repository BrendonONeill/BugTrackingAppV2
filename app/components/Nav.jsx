'use client'

import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function Nav() {
    let {mobileNav, navbarMove} = useContext(MainContext)
    
    
  return (
    <>
    <nav className={mobileNav? "mobile-nav mn-open" : "mobile-nav mn-close"}>
        
        <div className="mobile-nav-close-box">
            <button className="mobile-nav-close" onClick={navbarMove}>x</button>
        </div>
        <ul>
            <li>
                Profile
            </li>
            <li>
                View Users
            </li>
            <li>
                Create Users
            </li>
            <li>
                View Bugs
            </li>
            <li>
                Create Bugs
            </li>
            <li>
                Logout
            </li>
        </ul>
    </nav>
    <div onClick={navbarMove} className={mobileNav ? "mobile-nav-bg mn-bg" : "mobile-nav-bg mn-bg-trans"}></div>
    </>
  )
}

export default Nav