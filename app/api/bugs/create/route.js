import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'

export async function POST(req,res)
{
  await clientPromise();
  const user = await User.findById("649abfcc0a1699ba345df267");
  const body = await req.json()
  body.bugUserId = user
  await Bug.create(body);
  console.log("bug was created")
  return NextResponse.json({message: "Bug was created"}, {status: 201})
}