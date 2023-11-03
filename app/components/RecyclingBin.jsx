"use client"
import RecycleCard from "@/app/components/RecycleCard";
import { useContext, useEffect } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";


function RecyclingBin() {
    const {LoginUser, setRecyclingBinBugs, recyclingBinBugs} = useContext(MainContext)
    useEffect(() => {
        async function test()
        {
          const res = await fetch("/api/bugs/recyclingbin", {method: "GET", cache: 'no-store'})
          const data = await res.json()
          setRecyclingBinBugs(data)
        }
        test()
      
      },[]) 
  return (
   <>
   <div className="card-container"> 
    {
         recyclingBinBugs.length > 0 && LoginUser ?
         recyclingBinBugs.map((post, index) => (
           <RecycleCard post={post} index={index} key={post._id} test={post._id} />
         )) :<> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
   </div>
   </>
  )
}

export default RecyclingBin