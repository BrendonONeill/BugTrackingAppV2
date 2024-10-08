import Nav from '@/app/components/Nav';
import UserForm from '@/app/components/UserForm';
import Link from 'next/link';
import NonMobileNav from "@/app/components/NonMobileNav"
import AppContainer from "@/app/components/AppContainer"
import { headers } from 'next/headers'

function page() {

  const checkAccess = headers().get('x-noaccesstoken')
  return (
    <AppContainer checkAccess={checkAccess}>
    <main>
        <Nav />
        <div className="form-grid-container">
        <NonMobileNav />
        <div className="form-content-container">
        <Link className='back-link' href={{pathname: '/users'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
        <UserForm />
        </div>
        </div>  
    </main>
    </AppContainer>
  )
}

export default page