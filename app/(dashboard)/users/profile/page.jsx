import Nav from '@/app/components/Nav'
import Profile from '@/app/components/Profile'
import React from 'react'
import Link from 'next/link';
import NonMobileNav from "@/app/components/NonMobileNav"
import AppContainer from "@/app/components/AppContainer"
import { headers } from 'next/headers'

function page() {
  const checkAccess = headers().get('x-noaccesstoken')
  return (
    <AppContainer checkAccess={checkAccess}>
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
    </AppContainer>
  )
}

export default page