"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import BugExpandInfo from '@/app/components/BugExpandInfo';

import NonMobileNav from '@/app/components/NonMobileNav';
import Loading from '@/app/components/Loading';

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
        <div className="grid-container">
        <NonMobileNav />
        <div className="form-content-container">
        {infoBug !== null ?
        <>
        <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
        <BugExpandInfo infoBug={infoBug} />
        </> 
        : <Loading />}
      </div>
      </div>
    </main>
    
  )
}

export default page