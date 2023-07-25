import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'

export async function POST(req,res)
{
  await clientPromise();
  const body = await req.json()
  await User.create(body);
  return NextResponse.json({message: "User was created", status: 201})
}