"use client"
import LoginHeader from '@/app/components/LoginHeader';
import ResetPassword from '@/app/components/ResetPassword';
import { useState } from 'react';
import { useParams } from 'next/navigation';


function page() {
  const pathName = useParams()
  const [codeAccepted, setCodeAccepted] = useState(false)
  const [codeValue, setCodeValue] = useState("")
  

  

 
  async function codeCheck(e)
  {
    e.preventDefault()
    if(codeValue.length < 8)
    {
      return 
    }
    const res = await fetch("/api/forgotpassword/resetcode",{
      method: 'POST',
      headers : { 'Content-Type': 'application/json'},
      body: JSON.stringify({link:pathName.id,code:codeValue}),
    });
    if(res.ok)
    {
      let data = await res.json();
      if(data.accepted)
      {
        setCodeAccepted(true)
      }
    }
  }

  return (
    <main>
      <LoginHeader />
      <div className='login-container'>
      <div className='forgot-form'>
      {codeAccepted ? <ResetPassword code={codeValue} link={pathName.id} /> : 
      <>
        <h1>Password reset code</h1>
        <p>Please insert your code. An e-mail will be sent to you shortly with a code. Please be sure to check your spam / junk folders.</p>
        <form className='forgot-form-inner' onSubmit={codeCheck}>
          <label htmlFor="">
            Reset Code:
          <input type="text" className='forgot-input' onChange={(e) => setCodeValue(e.target.value)} max={12} />
          </label>
          <input type="submit" className='forgot-button' value="Submit" />
        </form> </>}
        </div>
      </div>
    </main>
  )
}

export default page