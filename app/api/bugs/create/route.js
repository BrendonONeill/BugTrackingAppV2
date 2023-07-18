import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'

export async function POST(req,res)
{
  await clientPromise();
  const body = await req.json()
  const user = await User.findById(body.user);
  body.formData.bugUserId = user
  await Bug.create(body.formData);
  console.log("bug was created")
  return NextResponse.json({message: "Bug was created"}, {status: 201})
}