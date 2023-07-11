"use client"
import BugCard from "@/app/components/bugCard"
import { useEffect, useState } from "react"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function BugContainer() {
    let {data, setData} = useContext(MainContext)
    
  return (
    <div className="card-container">
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