import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function POST(request,response)
{
  try
  {
    cookies().set({name: 'cookie-access', value: "accepted", httpOnly: true, sameSite: true, secure: process.env.LOCATION === "prod", maxAge: 2147483647})
    return NextResponse.json({message: "Successful", status: 201},{status: 201, statusText: "Cookie was created"})
  }
  catch(err)
  {
    console.error(err.message)
    return NextResponse.json({message: err.message, status: 401}, {status: 401, statusText: "Something went wrong"})
  }
}


