import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'
import { limiter } from "../../config/limiter";


export async function POST(req,res)
{
  try
  {
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
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
    else
    {
      return NextResponse({},{status: 429, statusText: "Too Many Requests"})
    }
  }
  catch(error)
  {
    return NextResponse.json({message: error.message, status: 401},{status: 404, statusText: "Something went wrong" })
  }
}