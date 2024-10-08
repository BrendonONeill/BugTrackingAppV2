import Nav from "@/app/components/Nav"
import BugContainer from "@/app/components/BugContainer"
import BugFilter from "@/app/components/BugFilter"
import BugInfo from "@/app/components/BugInfo"
import NonMobileNav from "@/app/components/NonMobileNav"
import AppContainer from "@/app/components/AppContainer"
import { headers } from 'next/headers'




export default async function page() {

      const checkAccess = headers().get('x-noaccesstoken')
  return (
    <AppContainer checkAccess={checkAccess}>
    <main>
      <Nav />
      <div className="grid-container">
      <NonMobileNav />
      <div className="main-content-container">
      <BugFilter />
      <BugInfo />
      <BugContainer />
      </div>
      </div>
    </main>
    </AppContainer>
    
  )
}
