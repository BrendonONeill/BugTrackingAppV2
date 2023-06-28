import Link from "next/link";
import Nav from "./components/Nav";

export default function Home() {

  return (
    <main>
      <Nav />
      <h1><Link href="/bugs">This is a link</Link></h1>
    </main>
    
  )
}
