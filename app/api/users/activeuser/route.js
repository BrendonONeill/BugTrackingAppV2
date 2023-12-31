import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Session from "@/models/sessionSchema";
import { cookies } from 'next/headers'
import {NextResponse, NextRequest} from 'next/server'
import { verifyAuthJWT  } from "@/lib/auth/auth";
import { limiter } from "../../config/limiter";


export const dynamic = "force-dynamic";
export async function GET(req, res){
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
    const sessionid = cookies().get('session')
    if(sessionid)
    {
      await clientPromise();
      const session = await Session.findOne({sessionId: sessionid.value});
      const payload = await verifyAuthJWT(session.jwt, "Session");
      const user = await User.findOne({_id : payload.user})
      if(user != null)
      {
        return NextResponse.json({user});
      }
      else
      {
        throw new Error("Could get information from database")
      }
      
    }
  
  }
  else
  {
    return NextResponse({},{status: 429, statusText: "Too Many Requests"})
  }
}
  catch(error)
  {
    console.log(error)
    return NextResponse.json({message: "failed", status: 404}, {status: 404, statusText: "Something went wrong"})
  }
};
