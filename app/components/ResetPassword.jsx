"use client"
import {useRouter} from 'next/navigation'
import { useState } from 'react'

export default function ResetPassword({code,link})
{
    const [password,setPassword] = useState("")
    const [retypePassword,setRetypePassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function resetPassword(e){
        e.preventDefault()
        const checked = validation()
        if(!checked)
        {
            return
        }
        if(password === retypePassword)
        {
            const res = await fetch("/api/forgotpassword/resetpassword",{
                method: 'POST',
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify({password,code,link}),
            });
            if(res.ok)
            {
              let data = await res.json();
              if(data.accepted)
              {
                setTimeout(() => {
                    router.push('/login')
                },3000)
              }
            }
        }
    }

    function validation()
    {
        if(password.length < 6)
        {
                setError("Password must be 6 characters long.")
                return false
        }
        if(password.indexOf(" ") != -1 && password.indexOf(" ") != (password.length - 1))
        {
            setError("Password can not contain spaces")
            return false
        }
        if(password !== retypePassword)
        {
            setError("Passwords don't match.")
            return false
        }

        return true
        
    }

    return (
        <>
        <div className={error == "" ? "error-hide" :'error-flashcard'}>
            <p>{error}</p>
        </div>
        <h1>Password reset code</h1>
        <p>Please insert a new password below to change your password.</p>
        <form >
            <div>
                <label htmlFor="password" className='forgot-label'>
                Password:
                <input type="text" className='forgot-input-password' minLength={6} maxLength={50}  name="password" id="" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label htmlFor="" className='forgot-label'>
                Verify Password:
                <input type="text" className='forgot-input-password' minLength={6} maxLength={50}  onChange={(e) => setRetypePassword(e.target.value)} />
                </label>
            </div>
            <input type="submit" className='forgot-button' value="Reset" onClick={resetPassword} />
        </form>
        </>
    )
}