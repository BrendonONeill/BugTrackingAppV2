"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import EditForm from "@/app/components/EditForm"
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import NonMobileNav from '@/app/components/NonMobileNav';
import Loading from '@/app/components/Loading';

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
    <div className="grid-container">
    <NonMobileNav />
    <div className="form-content-container">
    
    {editBug !== null ?
        <><Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../../back.svg" alt="back arrow" /></Link>
        <EditForm data={editBug} id={pathName.bugId} /> </> : <Loading />
    }
    </div>
    </div>    
    </main>
  )
}

export default page