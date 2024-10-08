import Nav from '@/app/components/Nav';
import NonMobileNav from '@/app/components/NonMobileNav';
import EditFormContainer from '@/app/components/EditFormContainer';
import AppContainer from "@/app/components/AppContainer"
import { headers } from 'next/headers'

function page() {
    const checkAccess = headers().get('x-noaccesstoken')
    return (
      <AppContainer checkAccess={checkAccess}>
      <main>
      <Nav />
      <div className="grid-container">
      <NonMobileNav />
      <div className="form-content-container">
      <EditFormContainer />
      </div>
      </div>    
      </main>
      </AppContainer>
  )
}

export default page