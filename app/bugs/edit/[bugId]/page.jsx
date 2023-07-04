"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import EditForm from "@/app/components/EditForm"
import Nav from '@/app/components/Nav';

function page() {
    let {data} = useContext(MainContext)
   const pathName = useParams()
   const [editBug, setEditBug] = useState(null)

   useEffect(() => {
    console.log("use effect")
    function test()
    {
        console.log("use effect function")
        let test = data.filter(bug => bug._id === pathName.bugId)
        setEditBug(test[0])
    }
    test()
   },[])
  return (
    <main>
    <Nav />
    <div className='form-bg-container'>
        {editBug !== null ?
        <EditForm data={editBug} id={pathName.bugId} /> : null
        }
    </div>
    </main>
  )
}

export default page