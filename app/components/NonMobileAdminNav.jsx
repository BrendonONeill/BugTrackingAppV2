'use client'
import Link from 'next/link'
import { useRouter} from 'next/navigation';

function NonMobileAdminNav() {
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
    <nav className="non-mobile-nav">
        <ul>
            <li>
            <Link className='nav-link' href={{pathname: '/users/profile'}} replace> <img src="/nav-user.svg" width={20} height={20}  role="presentation" alt="" /> Profile</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/users'}} replace><img src="/users.svg" width={20} height={20}  role="presentation" alt="" /> View Users</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/users/create'}} replace><img src="/createuser.svg" width={20} height={20}  role="presentation" alt="" /> Create Users</Link>
            </li>
            
            <li>
            <Link className='nav-link' as='/bugs' href='/bugs' ><img src="/buglist.svg" width={20} height={20}  role="presentation" alt="" /> View Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/create'}} replace><img src="/create.svg" width={20} height={20}  role="presentation" alt="" /> Create Bug</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/recyclingBin'}} replace><img src="/recycle.svg" width={20} height={20} alt=""  role="presentation" /> Recycling Bin</Link>
            </li>
            <li>
            <a href="#" className='nav-link' onClick={test} > <img src="/logout.svg" width={20} height={20} alt=""  role="presentation" /> Logout</a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default NonMobileAdminNav