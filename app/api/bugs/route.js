import clientPromise from "../../../lib/mongo/index";
import {NextResponse} from 'next/server'
import Bug from "../../../models/bugSchema"
import User from "../../../models/userSchema"

export async function GET(){
  try{
  await clientPromise();
  const bugs = await Bug.find().populate("bugUserId");
  console.log("db was called on all bugs")
  return NextResponse.json(bugs)
  }
  catch(error)
  {
    console.log(error)
  }
};



