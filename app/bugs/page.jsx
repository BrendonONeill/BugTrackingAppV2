import Nav from "@/app/components/Nav"
import BugContainer from "../components/BugContainer"
import { Suspense } from "react"
import BugFilter from "../components/BugFilter"
import BugInfo from "../components/BugInfo"
import NonMobileAdminNav from "../components/NonMobileAdminNav"

export default async function page() {
 
  return (
    <main>
      <Nav />
      <div className="grid-container">
      <NonMobileAdminNav />
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
