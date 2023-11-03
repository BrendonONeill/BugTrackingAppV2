import Nav from "@/app/components/Nav"
import BugContainer from "@/app/components/BugContainer"
import { Suspense } from "react"
import NonMobileNav from "@/app/components/NonMobileNav"
import RecyclingBin from "@/app/components/RecyclingBin"

export default async function page() {
    
  return (
    <main>
      <Nav />
      <div className="grid-container">
      <NonMobileNav />
      <div className="main-content-container">
      <Suspense fallback={<h1>Loading...</h1>}>
        <RecyclingBin />
      </Suspense>
      </div>
      </div>
    </main>
  )
}