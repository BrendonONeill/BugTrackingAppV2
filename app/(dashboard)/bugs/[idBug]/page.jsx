
import BugInfoContainer from '@/app/components/BugInfoContainer';
import Nav from '@/app/components/Nav';
import NonMobileNav from '@/app/components/NonMobileNav';
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
        <BugInfoContainer />
      </div>
      </div>
    </main>
    </AppContainer>
  )
}

export default page