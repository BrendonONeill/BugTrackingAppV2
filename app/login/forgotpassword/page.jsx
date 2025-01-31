"use client"
import { useState } from 'react';
import LoginHeader from '../../components/LoginHeader';
import {useRouter} from 'next/navigation'

function page() {
  const [email, setEmail] = useState('')
    const router = useRouter()

    const sendEmail = async (e) => {
        e.preventDefault()
        const res =await fetch('/api/forgotpassword', {
            method: 'POST',
            body: JSON.stringify({email}),
          });
        if(res.ok)
        {
            const data = await res.json()
            router.replace(`/login/forgotpassword/${data.link}`)
        } 
    }
  return (
    <main>
      <LoginHeader />
      <div className='login-container'>
        <div className='forgot-form'>
        <h1 className='forgot-form-h1'>Password Reset </h1>
        <p className='forgot-form-p'>Please insert your e-mail. An e-mail will be sent to you shortly with a code. Please be sure to check your spam / junk folders.</p>
        <form onSubmit={sendEmail}>
            <input type="email" id='email' onChange={(e) => {setEmail(e.target.value)}} className='forgot-input' />
            <input type="submit" className='forgot-button' value="Request Password" />
        </form>
        </div>
        
      </div>
    </main>
  )
}

export default page