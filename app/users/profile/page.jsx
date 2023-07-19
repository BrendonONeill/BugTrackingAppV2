import Nav from '@/app/components/Nav'
import Profile from '@/app/components/Profile'
import React from 'react'
import Link from 'next/link';

function page() {
  return (
    <main>
    <Nav />
    <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
    <Profile />
    </main>
    
  )
}

export default page