"use client"
import { useEffect, useState } from "react"

function CookieNotice() {

    const [show, setShow] = useState(false)
    useEffect(() => {
        if(localStorage.getItem("cookies") === null)
        {
            setShow(true)
        }
    },[])

   async function cookieNotice(e)
   {
    try
    {
        e.preventDefault()
        if(e.target.id === "accept")
        {
            setShow(false)
            localStorage.setItem("cookies", "accept")
            const res = await fetch('/api/cookienotice', {
                method: 'POST',
                body: JSON.stringify(),
              })
            const test = await res.json()    
        }
        else
        {
            localStorage.setItem("cookies", "decline")
            setShow(false)
        }
        
    }
    catch(err)
    {

    }
   }

  return (
    <div className={ show ?'cookie-banner':'cookie-hide'}>
        <h3>We use cookies</h3>
        <p>In this application we use cookies for the basic functionality of our website.</p>
        <p className='cookie-warning'>If you decline the application will not be able to function as intended.</p>
        <div className='cookie-buttons'>
        <button onClick={cookieNotice} className='cookie-button' id='accept'>Accept</button>
        <button onClick={cookieNotice}  className='cookie-button' id='decline'>Decline</button>
        </div>
    </div>
  )
}
export default CookieNotice