import clientPromise from "../../../lib/mongo/index";
import Session from "@/models/sessionSchema";
import { cookies } from "next/headers";
import {NextResponse} from 'next/server'
import Bug from "../../../models/bugSchema"
import User from "../../../models/userSchema"
import { verifyAuthJWT } from "@/lib/auth/auth";

export async function GET(req){
  try{
    const sessionid = cookies().get('session')
    if(sessionid)
    {
      await clientPromise();
      const session = await Session.findOne({sessionId: sessionid.value});
      const payload = await verifyAuthJWT(session.jwt, "Session");
      const bugs = await Bug.find().or([{bugUserId : { _id : payload.user} },{bugPrivate : false}]).populate("bugUserId");
      console.log("The database was called for users bugs")
      return NextResponse.json(bugs)
    }
  }
  catch(error)
  {
    console.log(error)
  }
};



