import { cookies } from 'next/headers'
import {NextResponse} from 'next/server'
import { verifyAuthJWT } from '@/lib/auth/auth'

export async function GET(request){
    try{
    const allCookies = cookies() 
    const user = allCookies.get('user').value
    console.log(user)
    const payload = await verifyAuthJWT(user)
    console.log(payload)
    return NextResponse.json({user})
    }
    catch(error)
    {
      console.log(error)
    }
  };