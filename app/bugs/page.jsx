import Nav from "@/app/components/Nav"
import BugContainer from "../components/BugContainer"
import { Suspense } from "react"


async function fetchBugs()
{
  const res = await fetch("http://localhost:3000/api/bugs", {method: "GET", cache: 'no-store'})
  const bugs = res.json()
  return bugs
}
export default async function page() {
  const data = await fetchBugs()
  return (
    <main>
      <Nav />
      <Suspense fallback={<h1>Loading...</h1>}>
      <BugContainer data={data} />
      </Suspense>
      </main>
  )
}
