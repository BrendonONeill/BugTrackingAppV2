import Nav from "@/app/components/Nav"
import UserContainer from "../components/UserContainer"
import { Suspense } from "react"


async function fetchBugs()
{
  const res = await fetch("http://localhost:3000/api/users", {method: "GET", cache: 'no-store'})
  const users = res.json()
  return users
}

export default async function page() {
  const data = await fetchBugs()
  return (
    <main>
      <Nav />
      <Suspense fallback={<h1>Loading...</h1>}>
      <UserContainer users={data} />
      </Suspense>
    </main>
  )
}
