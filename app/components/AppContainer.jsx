"use client"

import { useEffect, useContext } from "react"
import MainContext from "@/app/components/MainContext";
import { useRouter } from 'next/navigation'

function AppContainer({checkAccess,children}) {
    const {setaccessToken} = useContext(MainContext)
   useEffect(() => {
        if(checkAccess)
        {
            a()   
        }
        else
        {
            setaccessToken(false)
        }
        
        async function a()
        {
            try{ 
                const res = await fetch('/api/auth')
                if(res.status === 200)
                {
                    setaccessToken(true)
                }
            } catch (error) {
                
            }
        }
   },[])

    return (
    <>
        {children}
    </>
    )
}

export default AppContainer