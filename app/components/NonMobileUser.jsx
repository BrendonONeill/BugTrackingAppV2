'use client'
import Link from 'next/link'
import { useRouter} from 'next/navigation';

function NonMobileUserNav() {
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
            <Link className='nav-link' href={{pathname: '/users/profile'}} replace> <img src="/nav-user.svg" width={20} height={20} alt="" /> Profile</Link>
            </li>
            <li>
            <Link className='nav-link' as='/bugs' href='/bugs' ><img src="/buglist.svg" width={20} height={20} alt="" /> View Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/create'}} replace><img src="/create.svg" width={20} height={20} alt="" /> Create Bugs</Link>
            </li>
            <li>
            <a href="#" className='nav-link' onClick={test} > <img src="/logout.svg" width={20} height={20} alt="" /> Logout</a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default NonMobileUserNav