'use client'
import Link from 'next/link'
import { useRouter} from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function AdminNav() {
    let {mobileNav, navbarMove, LoginUser} = useContext(MainContext)
    const { push } = useRouter();

    async function test()
    {
      await fetch('/api/logout', {
        method: 'GET'
      });
      push('/login')
    }
    
    
  return (
    <>
    <nav className={mobileNav? "mobile-nav mn-open" : "mobile-nav mn-close"}>
        
        <div className="mobile-nav-close-box">
            <button className="mobile-nav-close" onClick={navbarMove}>x</button>
        </div>
        <ul>
            <li>
            <Link  className='nav-link' href={{pathname: '/users/profile'}} replace> <img src="/nav-user.svg" width={20} height={20}  role="presentation" alt="" /> Profile</Link>
            </li>
            <li>
            <Link prefetch={true} className='nav-link' href={{pathname: '/users'}} replace><img src="/users.svg" width={20} height={20}  role="presentation" alt="" /> View Users</Link>
            </li>
            <li>
            <Link prefetch={true} className='nav-link' href={{pathname: '/users/create'}} replace><img src="/createuser.svg" width={20} height={20}  role="presentation" alt="" /> Create Users</Link>
            </li>
            
            <li>
            <Link prefetch={true} className='nav-link' as='/bugs' href='/bugs' ><img src="/buglist.svg" width={20} height={20} alt=""  role="presentation" /> View Bugs</Link>
            </li>
            <li>
            <Link prefetch={true} className='nav-link' href={{pathname: '/bugs/create'}} replace><img src="/create.svg" width={20} height={20} alt=""  role="presentation" /> Create Bugs</Link>
            </li>
            <li>
            <a href="#" className='nav-link' onClick={test} > <img src="/logout.svg" width={20} height={20} alt=""  role="presentation" /> Logout</a>
            </li>
        </ul>
    </nav>
    <div onClick={navbarMove} className={mobileNav ? "mobile-nav-bg mn-bg" : "mobile-nav-bg mn-bg-trans"}></div>
    </>
  )
}

export default AdminNav