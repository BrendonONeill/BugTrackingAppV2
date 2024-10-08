"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BugExpandInfo from '@/app/components/BugExpandInfo';
import Loading from '@/app/components/Loading';
import CommentsSection from '@/app/components/CommentsSection';
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function BugInfoContainer() {

    const pathName = useParams()
    const [infoBug, setInfoBug] = useState(null)
    const [comments, setComments] = useState([])
    const [commetsUpdated, setCommentsUpdated] = useState(false)
    const [errorText,setErrorText] = useState("")
    const {accessToken} = useContext(MainContext)

    useEffect(() => {
     async function test(){
          try {
            const res = await fetch(`/api/bugs/buginfo?q=${pathName.idBug}`, {method: "GET"})
            if(res.ok === false){
              throw new Error(res.statusText)
            }
            const data = await res.json()
            setInfoBug(data.bug);
            setComments(data.bug.Comments);
          } catch (error) {
            setErrorText("Something went wrong, there was an error please try again later");
          }
      }
      test()
    },[accessToken])

    useEffect(() => {
     if(commetsUpdated)
     {
      function test()
     {
         fetch(`/api/bugs/buginfo?q=${pathName.idBug}`, {method: "GET"}).then(res => res.json()).then(data => {
         setInfoBug(data.bug);
         setComments(data.bug.Comments);}).catch(error => console.log(error))
     }
     test()
     }
     setCommentsUpdated(false)
    },[commetsUpdated])


    return (
    <>
    {
        infoBug?
                <>
                <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
                <BugExpandInfo infoBug={infoBug} />
                <CommentsSection id={infoBug._id} comments={comments} setComments={setComments} setCommentsUpdated={setCommentsUpdated} />
                </> 
        : errorText !== "" ?  
        <div className="bugApiError"><p>{errorText}</p></div> 
        :  <Loading />}
    </>
  )
}

export default BugInfoContainer