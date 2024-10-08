import Nav from "@/app/components/Nav"
import UserContainer from "@/app/components/UserContainer"
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
      <div className="user-main-content-container">
      <UserContainer />
      </div>
      </div>
    </main>
    </AppContainer>
  )
}
