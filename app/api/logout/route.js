import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import Refresh from "@/models/refreshSchema"

export const dynamic = "force-dynamic";
export async function GET(req,res)
{
try{
  const {value : jwt} = cookies().get('refreshToken')
  await clientPromise();
  await Refresh.findOneAndDelete({jwt})
  cookies().set({name: 'refreshToken', value: '', httpOnly: true, secure: true, maxAge: 5})
  cookies().set({name: 'accessToken', value: '', httpOnly: true, secure: true, maxAge: 5})
  return NextResponse.json({message: "logged out", status: 201},{status: 201, statusText: "Successful"})
}
catch(err)
{
    console.error(err)
  return NextResponse.json({message: "Failed", status: 404}, {status: 404, statusText: "Something went wrong"})
}
}
