"use client"
import { useEffect, useState } from "react"
import {setCookie} from 'cookies-next'

function CookieNotice() {

    const [show, setShow] = useState(false)
    useEffect(() => {
        if(localStorage.getItem("cookies") === null)
        {
            setShow(true)
        }
    },[])

    const cookieCheck = (e) => {
        if (e.target.id === "accept") 
        {
            localStorage.setItem("cookies", "accept")
            setCookie("cookie-access", "accepted")
            setShow(false)
        }
        if (e.target.id === "decline") 
        {
            localStorage.setItem("cookies", "decline")
            setShow(false)
        }   
    } 

  return (
    <div className={ show ?'cookie-banner':'cookie-hide'}>
        <h3>We use cookies</h3>
        <p>In this application we use cookies for the basic functionality of our website.</p>
        <p className='cookie-warning'>If you decline the application will not be able to function as intended.</p>
        <div className='cookie-buttons'>
        <button onClick={cookieCheck} className='cookie-button' id='accept'>Accept</button>
        <button onClick={cookieCheck}  className='cookie-button' id='decline'>Decline</button>
        </div>
    </div>
  )
}
export default CookieNotice