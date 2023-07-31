import Nav from '@/app/components/Nav'
import Profile from '@/app/components/Profile'
import React from 'react'
import Link from 'next/link';
import NonMobileNav from "@/app/components/NonMobileNav"

function page() {
  return (
    <main>
    <Nav />
    <div className="form-grid-container">
    <NonMobileNav />
    <div className="form-content-container">
    <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
    <Profile />
    </div>
    </div>
    </main>
    
  )
}

export default page