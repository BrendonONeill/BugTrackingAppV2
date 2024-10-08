'use client'
import { useEffect, useState, useContext } from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import EditForm from "@/app/components/EditForm"
import Loading from '@/app/components/Loading';
import MainContext from "@/app/components/MainContext";


function EditFormContainer() {
    const pathName = useParams()
    const [editBug, setEditBug] = useState(null)
    const {accessToken} = useContext(MainContext)


    useEffect(() => {
        function test()
        {
            fetch(`/api/bugs/collectedit?q=${pathName.bugId}`, {method: "GET"}).then(res => res.json()).then(data => {
            setEditBug(data.bug)}).catch(error => console.log(error))
        }
        test()
       },[accessToken])

    
  return (
    <>
    {editBug ?
        <><Link className='back-link' href={{pathname: '/bugs'}} ><img width={30} height={30} src="../../back.svg" alt="back arrow" /></Link>
        <EditForm data={editBug} id={pathName.bugId} /> </> 
        : <Loading />
    }
    </>
  )
}

export default EditFormContainer