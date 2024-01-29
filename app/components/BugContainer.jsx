"use client"
import BugCard from "@/app/components/BugCard"
import { useContext, useEffect, useState } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";

function BugContainer(){
const {LoginUser, setBugs, bugs, bugCards} = useContext(MainContext)
const [errorText,setErrorText] = useState("")
const [emptyList,setEmptyList] = useState("")

useEffect(() => {
  async function test()
  {
    try {
      const res = await fetch("/api/bugs", {method: "GET", cache: 'no-store'})
      if(res.ok === false){
        throw new Error(res.statusText)
      }
      const data = await res.json()
      if(data.length === 0)
      {
        setEmptyList(true);
      }
      setBugs(data)

      } catch (error) {
        setErrorText("Something went wrong, there was an error please try again later");
      }
  }
  test()
},[]) 

useEffect(() => {
  console.log("Bugs updated on page")
},[bugs])

  return (
    <div className="card-container">
      {
      bugCards.length > 0 && LoginUser ?
      bugCards.map((post, index) => (
        <BugCard post={post} index={index} key={post._id} test={post._id} />
      )) : errorText !== "" ? <div className="bugApiError"><p>{errorText}</p></div> : emptyList === true || bugCards.length === 0? <div className="noticeblock"><p>There is no cards to view.</p></div> : <> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
      </div>
  )
}

export default BugContainer
