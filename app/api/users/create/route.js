import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'

export async function POST(req,res)
{
  try
  {
  await clientPromise();
  const body = await req.json()
  const user = await User.findOne({email : body.email})
  if(user)
  {
    throw new Error("Email already Exists")
  }
  await User.create(body);
  return NextResponse.json({message: "User was created", status: 201})
  }
  catch(error)
  {
    return NextResponse.json({message: error.message, status: 401})
  }
}