import clientPromise from "../../../lib/mongo/index";
import { cookies } from "next/headers";
import {NextResponse} from 'next/server'
import Bug from "../../../models/bugSchema"
import User from "../../../models/userSchema"
import { verifyAuthJWT } from "@/lib/auth/auth";

export async function GET(req){
  try{
    const token = req.cookies.get("user")
    let accessGranted = await verifyAuthJWT(token.value)
  await clientPromise();
  const bugs = (await Bug.find().or([{bugUserId : { _id : accessGranted.user} },{bugPrivate : false}]).populate("bugUserId"));
  console.log("The database was called for users bugs")
  return NextResponse.json(bugs)
  }
  catch(error)
  {
    console.log(error)
  }
};



