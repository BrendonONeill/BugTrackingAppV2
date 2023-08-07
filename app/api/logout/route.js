import clientPromise from "@/lib/mongo/index";
import Session from "@/models/sessionSchema";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export const dynamic = "force-dynamic";
export async function GET(req,res)
{
try{
  const sessionid = cookies().get('session')
  await clientPromise();
  await Session.findOneAndDelete({sessionId: sessionid.value})
  cookies().set({name: 'session', value: '', httpOnly: true, secure: true, maxAge: 5})
  cookies().set({name: 'user', value: '', httpOnly: true, secure: true, maxAge: 5})
  return NextResponse.json({message: "logged out", status: 201},{status: 201, statusText: "Successful"})
}
catch(err)
{
    console.error(err)
  return NextResponse.json({message: "Failed", status: 404}, {status: 404, statusText: "Something went wrong"})
}
}
