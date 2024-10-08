import Nav from "@/app/components/Nav"
import NonMobileNav from "@/app/components/NonMobileNav"
import RecyclingBin from "@/app/components/RecyclingBin"
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
        <RecyclingBin />
      </div>
      </div>
    </main>
    </AppContainer>
  )
}