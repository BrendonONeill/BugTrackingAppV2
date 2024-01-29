"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Nav from '@/app/components/Nav';
import Link from 'next/link';
import BugExpandInfo from '@/app/components/BugExpandInfo';
import NonMobileNav from '@/app/components/NonMobileNav';
import Loading from '@/app/components/Loading';
import CommentsSection from '@/app/components/CommentsSection';

function page() {
    const pathName = useParams()
    const [infoBug, setInfoBug] = useState(null)
    const [comments, setComments] = useState([])
    const [commetsUpdated, setCommentsUpdated] = useState(false)
    const [errorText,setErrorText] = useState("")

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
    },[])

    useEffect(() => {
     if(commetsUpdated)
     {
      function test()
     {
        console.log("I HAVE RUN AFTER UPDATE")
         fetch(`/api/bugs/buginfo?q=${pathName.idBug}`, {method: "GET"}).then(res => res.json()).then(data => {
         setInfoBug(data.bug);setComments(data.bug.Comments);}).catch(error => console.log(error))
     }
     test()
     }
     setCommentsUpdated(false)
    },[commetsUpdated])

return (
    <main>
        <Nav />
        <div className="grid-container">
        <NonMobileNav />
        <div className="form-content-container">
        {infoBug !== null ?
        <>
        <Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../back.svg" alt="back arrow" /></Link>
        <BugExpandInfo infoBug={infoBug} />
        <CommentsSection id={infoBug._id} comments={comments} setComments={setComments} setCommentsUpdated={setCommentsUpdated} />
        </> 
        : errorText !== "" ?  <div className="bugApiError"><p>{errorText}</p></div> :  <Loading />}
      </div>
      </div>
    </main>
    
  )
}

export default page