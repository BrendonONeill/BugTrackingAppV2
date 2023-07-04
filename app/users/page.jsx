import Nav from "@/app/components/Nav"
import UserContainer from "../components/UserContainer"

export default async function page() {
  return (
    <main>
      <Nav />
      <UserContainer />
    </main>
  )
}