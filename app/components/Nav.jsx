'use client'
import Link from 'next/link'
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
            <Link className='nav-link' href={{pathname: '/users/profile'}} replace>Profile</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/users'}} replace>View Users</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/users/create'}} replace>Create Users</Link>
            </li>
            <li>
            <Link className='nav-link' as='/bugs' href='/bugs' >View Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/create'}} replace>Create Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: ''}} >Logout</Link>
            </li>
        </ul>
    </nav>
    <div onClick={navbarMove} className={mobileNav ? "mobile-nav-bg mn-bg" : "mobile-nav-bg mn-bg-trans"}></div>
    </>
  )
}

export default Nav