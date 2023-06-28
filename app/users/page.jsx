
import Nav from "@/app/components/Nav"
import {getUsers} from "@/app/api/users/allusers/users"

async function test()
{
    let cat = await getUsers()
    return cat
}

export default async function page() {
  let data = await test()
  return (
    <main>
      <Nav />
      <div className="card-container">
      {
                data.map((user) => (
            <div>
                <h1>{user.fname}</h1>
            </div>
                ))
            }
      </div>
      </main>
  )
}