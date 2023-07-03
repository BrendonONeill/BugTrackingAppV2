"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import EditForm from "@/app/components/EditForm"

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
    <div>
        {editBug !== null ?
        <EditForm data={editBug} id={pathName.bugId} /> : null
        }
    </div>
  )
}

export default page