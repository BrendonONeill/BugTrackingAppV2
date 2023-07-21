import Nav from '@/app/components/Nav'
import Profile from '@/app/components/Profile'
import React from 'react'
import Link from 'next/link';
import NonMobileAdminNav from "@/app/components/NonMobileAdminNav"

function page() {
  return (
    <main>
    <Nav />
    <div className="grid-container">
    <NonMobileAdminNav />
    <div className="main-content-container">
    <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
    <Profile />
    </div>
    </div>
    </main>
    
  )
}

export default page