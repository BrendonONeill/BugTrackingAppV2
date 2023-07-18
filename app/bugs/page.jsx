import Nav from "@/app/components/Nav"
import BugContainer from "../components/BugContainer"
import { Suspense } from "react"
import BugFilter from "../components/BugFilter"
import BugInfo from "../components/BugInfo"

export default async function page() {
 
  return (
    <main>
      <Nav />
      <BugFilter />
      <BugInfo />
      <Suspense fallback={<h1>Loading...</h1>}>
      <BugContainer />
      </Suspense>
    </main>
  )
}
