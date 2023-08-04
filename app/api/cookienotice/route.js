import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function POST(request,response)
{
  try
  {
    console.log("hello yes you did call me")
    cookies().set({name: 'cookie-access', value: "accepted", httpOnly: true, sameSite: true, secure: process.env.LOCATION === "prod", maxAge: 172800})
    return NextResponse.json({message: "Successful", status: 201})
  }
  catch(err)
  {
    console.error(err.message)
    return NextResponse.json({message: err.message, status: 401})
  }
}


