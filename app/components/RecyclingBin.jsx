"use client"
import RecycleCard from "@/app/components/RecycleCard";
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";


function RecyclingBin() {
    const {LoginUser, setRecyclingBinBugs, recyclingBinBugs} = useContext(MainContext)
    const [emptyList,setEmptyList] = useState(false)
    useEffect(() => {
        async function test()
        {
          const res = await fetch("/api/bugs/recyclingbin", {method: "GET", cache: 'no-store'})
          const data = await res.json()
          if(data.length === 0)
          {
            setEmptyList(true);
          }
          setRecyclingBinBugs(data);
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
         )) : emptyList === true ? <div className="noticeblock"><p>You have no cards in the recycling bin.</p></div> :<> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
   </div>
   </>
  )
}

export default RecyclingBin