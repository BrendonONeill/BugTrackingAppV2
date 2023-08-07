import Nav from "@/app/components/Nav"
import UserContainer from "@/app/components/UserContainer"
import { Suspense } from "react"
import NonMobileNav from "@/app/components/NonMobileNav"

export default async function page() {
  return (
    <main>
      <Nav />
      <div className="grid-container">
      <NonMobileNav />
      <div className="user-main-content-container">
      <Suspense fallback={<h1>Loading...</h1>}>
      <UserContainer />
      </Suspense>
      </div>
      </div>
    </main>
  )
}
