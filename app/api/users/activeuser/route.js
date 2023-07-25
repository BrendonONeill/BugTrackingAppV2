import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Session from "@/models/sessionSchema";
import { cookies } from 'next/headers'
import {NextResponse, NextRequest} from 'next/server'
import { verifyAuthJWT  } from "@/lib/auth/auth";

export async function GET(req, res){
  try{
    const sessionid = cookies().get('session')
    if(sessionid)
    {
      await clientPromise();
      const session = await Session.findOne({sessionId: sessionid.value});
      const payload = await verifyAuthJWT(session.jwt);
      const user = await User.findOne({_id : payload.user})
      return NextResponse.json({user});
    }
  
  }
  catch(error)
  {
    console.log(error)
  }
};