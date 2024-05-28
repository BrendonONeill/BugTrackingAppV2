"use client"
import RecycleCard from "@/app/components/RecycleCard";
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";


function RecyclingBin() {
    const {LoginUser, setRecyclingBinBugs, recyclingBinBugs, flashCard, setFlashCard} = useContext(MainContext)
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

      setTimeout(() => {
        if(flashCard !== '')
        {
          setFlashCard('');
        }
      }, 3000)

  return (
   <>
   <div className="card-container"> 
    {
      flashCard ? 
        <div class="flashCard">
          {flashCard}
        </div>
      : null
    }
    {
         recyclingBinBugs.length > 0 && LoginUser ?
         recyclingBinBugs.map((post, index) => (
           <RecycleCard post={post} index={index} key={post._id} test={post._id} setEmptyList={setEmptyList} />
         )) : emptyList === true ? <div className="noticeblock"><p>You have no cards in the recycling bin.</p></div> :<> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
   </div>
   </>
  )
}

export default RecyclingBin