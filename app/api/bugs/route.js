import clientPromise from "../../../lib/mongo/index";
import {NextResponse} from 'next/server'
import Bug from "../../../models/bugSchema"
import User from "../../../models/userSchema"

export async function GET(){
  try{
  await clientPromise();
  const bugs = (await Bug.find().or([{bugUserId : { _id : "649abfcc0a1699ba345df267"} },{bugPrivate : false}]).populate("bugUserId"));
  console.log("db was called on all bugs")
  return NextResponse.json(bugs)
  }
  catch(error)
  {
    console.log(error)
  }
};



