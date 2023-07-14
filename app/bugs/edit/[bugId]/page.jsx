"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import EditForm from "@/app/components/EditForm"
import Nav from '@/app/components/Nav';

function page() {
   const pathName = useParams()
   const [editBug, setEditBug] = useState(null)

   useEffect(() => {
    function test()
    {
        fetch(`/api/bugs/collectedit?q=${pathName.bugId}`, {method: "GET"}).then(res => res.json()).then(data => {
        setEditBug(data.bug)}).catch(error => console.log(error))
    }
    test()
   },[])
  return (
    <main>
    <Nav />
    {editBug !== null ?
        <EditForm data={editBug} id={pathName.bugId} /> : null
    }    
    </main>
  )
}

export default page