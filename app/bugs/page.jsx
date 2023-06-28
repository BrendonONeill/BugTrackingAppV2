
import BugCard from "@/app/components/BugCard"
import {allBugs} from "@/app/api/bugstest"
import Nav from "@/app/components/Nav"

async function test()
{
    let cat = await allBugs()
    return cat
}

export default async function page() {
  let data = await test()
  return (
    <main>
      <Nav />
      <div className="card-container">
      {
      data.map((post) => (
        <BugCard post={post} />
      ))
    }
      </div>
      </main>
  )
}
