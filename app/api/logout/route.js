import clientPromise from "@/lib/mongo/index";
import Session from "@/models/sessionSchema";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req,res)
{
try{
  const sessionid = cookies().get('session')
  await clientPromise();
  await Session.findOneAndDelete({sessionId: sessionid.value})
  cookies().set({name: 'session', value: '', httpOnly: true, secure: true, maxAge: 5})
  return NextResponse.json({message: "logged out", status: 201})
}
catch(err)
{
    console.error(err)
}
}