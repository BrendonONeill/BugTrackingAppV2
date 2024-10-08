import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import User from "@/models/userSchema"
import { limiter } from "../../config/limiter";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export async function GET(req){
    
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      const accessToken = cookies().get('accessToken')
      if(accessToken)
      {
        const {searchParams} = new URL(req.url)
        const userId = searchParams.get('q')
        await clientPromise();
        const user = await User.findById(userId);
        if(user != null)
        {
          return NextResponse.json({user},{status : 201})
        }
        else
        {
          throw new Error("Could not get information from database")
        }
      }
      else
      {
        throw new Error("Checking Access Token")
      }
    
    }
    else
    {
      return NextResponse({},{status: 429, statusText: "Too Many Requests"})
    }
  }
  catch(error)
  {
    console.log(error)
      return NextResponse.json({message: "Something went wrong", status: 404}, {status: 404, statusText: "Something went wrong"})
  }
};
