'use client'
import Link from 'next/link'
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function UserNav() {
    let {mobileNav, navbarMove} = useContext(MainContext)
    
    
  return (
    <>
    <nav className={mobileNav? "mobile-nav mn-open" : "mobile-nav mn-close"}>
        
        <div className="mobile-nav-close-box">
            <button className="mobile-nav-close" onClick={navbarMove}>x</button>
        </div>
        <ul>
            <li>
            <Link className='nav-link' href={{pathname: '/users/profile'}} replace> <img src="/nav-user.svg" width={20} height={20} alt=""  role="presentation" /> Profile</Link>
            </li>
            <li>
            <Link className='nav-link' as='/bugs' href='/bugs' ><img src="/buglist.svg" width={20} height={20} alt=""  role="presentation" /> View Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/create'}} replace><img src="/create.svg" width={20} height={20} alt=""  role="presentation" /> Create Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: ''}} > <img src="/logout.svg" width={20} height={20} alt=""  role="presentation" /> Logout</Link>
            </li>
        </ul>
    </nav>
    <div onClick={navbarMove} className={mobileNav ? "mobile-nav-bg mn-bg" : "mobile-nav-bg mn-bg-trans"}></div>
    </>
  )
}

export default UserNav