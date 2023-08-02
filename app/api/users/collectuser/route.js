import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import User from "@/models/userSchema"
import { limiter } from "../../config/limiter";

export async function GET(req){
    
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get('q')
    await clientPromise();
    const user = await User.findById(userId);
    console.log(user)
    return NextResponse.json({user})
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