"use client"
import BugCard from "@/app/components/BugCard"
import { useContext, useEffect } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";

function BugContainer(){
const {LoginUser, setBugs, bugCards} = useContext(MainContext)

useEffect(() => {
  async function test()
  {
    const res = await fetch("https://bug-tracking-app.vercel.app/api/bugs", {method: "GET", cache: 'no-store'})
    const data = await res.json()
    setBugs(data)
  }
  test()

},[]) 

  return (
    <div className="card-container">
      {
      bugCards.length > 0 && LoginUser ?
      bugCards.map((post, index) => (
        <BugCard post={post} index={index} key={post._id} test={post._id} />
      )) :<> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
      </div>
  )
}

export default BugContainer
