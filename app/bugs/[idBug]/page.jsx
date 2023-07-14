"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Nav from '@/app/components/Nav';

function page() {
    const pathName = useParams()
    const [infoBug, setInfoBug] = useState(null)

    useEffect(() => {
     function test()
     {
         fetch(`/api/bugs/buginfo?q=${pathName.idBug}`, {method: "GET"}).then(res => res.json()).then(data => {
         setInfoBug(data.bug)}).catch(error => console.log(error))
     }
     test()
    },[])
  return (
    <main>
        <Nav />
        {infoBug !== null ?
        <div>
        <h1>{infoBug.bugName}</h1>
        <p>{infoBug.bugDate}</p>
        <p>{infoBug.bugCode}</p>
        <p>{infoBug.bugDes}</p>
        <p>{infoBug.bugImportant}</p>
        </div>: null
        }
    </main>
    
  )
}

export default page