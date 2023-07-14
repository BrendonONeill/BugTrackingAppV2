"use client"
import BugCard from "@/app/components/bugCard"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import BugLoading from "./BugLoading";

function BugContainer({data}) {

  const {LoginUser} = useContext(MainContext)
  return (
    <div className="card-container">
      {
      data && LoginUser ?
      data.map((post, index) => (
        <BugCard post={post} index={index} key={post._id} test={post._id} />
      )) :<> <BugLoading /> <BugLoading /> <BugLoading /> </>
    }
      </div>
  )
}

export default BugContainer