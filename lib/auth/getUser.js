export default async function fetchUser()
{
  const res = await fetch("http://localhost:3000/api/user", {method: "GET", cache: 'no-store'})
  //const user = res.json()
  //return user
}