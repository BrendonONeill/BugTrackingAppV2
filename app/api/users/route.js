import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'
import { limiter } from "../config/limiter"

export async function GET(){
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      await clientPromise();
      const users = await User.find().select(' _id -password');
      return NextResponse.json(users)
    }
    else
    {
      return NextResponse({},{status: 429, statusText: "Too Many Requests"})
    }
  }
  catch(error)
  {
      console.log(error)
  }
};