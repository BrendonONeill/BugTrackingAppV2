"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import Nav from '@/app/components/Nav';

function page() {
    let {data} = useContext(MainContext)
    const pathName = useParams()
    const [infoBug, setInfoBug] = useState(null)

    useEffect(() => {
     console.log("use effect")
     function test()
     {
         console.log("use effect function")
         let test = data.filter(bug => bug._id === pathName.idBug)
         setInfoBug(test[0])
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