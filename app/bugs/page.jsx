import Nav from "@/app/components/Nav"
import BugContainer from "../components/BugContainer"
import { Suspense } from "react"
import BugFilter from "../components/BugFilter"
import BugInfo from "../components/BugInfo"
import NonMobileNav from "../components/NonMobileNav"

export default async function page() {
 
  return (
    <main>
      <Nav />
      <div className="grid-container">
      <NonMobileNav />
      <div className="main-content-container">
      <BugFilter />
      <BugInfo />
      <Suspense fallback={<h1>Loading...</h1>}>
      <BugContainer />
      </Suspense>
      </div>
      </div>
    </main>
  )
}
