import Nav from "@/app/components/Nav"
import UserContainer from "../components/UserContainer"
import { Suspense } from "react"
import NonMobileAdminNav from "../components/NonMobileAdminNav"


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
      <div className="grid-container">
      <NonMobileAdminNav />
      <div className="user-main-content-container">
      <Suspense fallback={<h1>Loading...</h1>}>
      <UserContainer users={data} />
      </Suspense>
      </div>
      </div>
    </main>
  )
}
