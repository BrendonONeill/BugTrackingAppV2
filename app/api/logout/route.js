
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req,res)
{
try{
  cookies().set({name: 'user', value: '', httpOnly: true, secure: true, maxAge: 5})
  return NextResponse.json({message: "logged out"},{status: 201})
}
  catch(err)
  {
    console.error(err)
  }
}