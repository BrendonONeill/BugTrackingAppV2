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
            <Link className='nav-link' href={{pathname: '/users/profile'}} replace> <img src="/nav-user.svg"  role="presentation" width={20} height={20} alt="" /> Profile</Link>
            </li>
            <li>
            <Link className='nav-link' as='/bugs' href='/bugs' ><img src="/buglist.svg"  role="presentation" width={20} height={20} alt="" /> View Bugs</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/create'}} replace><img src="/create.svg"  role="presentation" width={20} height={20} alt="" /> Create Bug</Link>
            </li>
            <li>
            <Link className='nav-link' href={{pathname: '/bugs/recyclingBin'}} replace><img src="/recycle.svg" width={20} height={20} alt=""  role="presentation" /> Recycling Bin</Link>
            </li>
            <li>
            <a href="#" className='nav-link' onClick={test} > <img src="/logout.svg"  role="presentation" width={20} height={20} alt="" /> Logout</a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default NonMobileUserNav