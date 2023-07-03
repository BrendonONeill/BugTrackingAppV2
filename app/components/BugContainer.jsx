"use client"
import BugCard from "@/app/components/bugCard"
import { useEffect, useState } from "react"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function BugContainer() {
    let {data, setData} = useContext(MainContext)
    useEffect(() => {
        fetch("/api/bugs", {method: "GET", cache: 'no-store'}).then(res => res.json()).then(data => {setData(data)}).catch(error => console.log(error))
    },[])
  return (
    <div className="card-container">
        <h1>Testing</h1>
      {
      data.length > 0 ?
      data.map((post, index) => (
        <BugCard post={post} key={post._id} test={post._id} />
      )) : null
    }
    
      </div>
  )
}

export default BugContainer