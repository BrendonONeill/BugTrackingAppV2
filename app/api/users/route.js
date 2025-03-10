import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'
import { limiter } from "../config/limiter"
import { cookies } from "next/headers";

export async function GET(){
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      const accessToken = cookies().get('accessToken')
      if(accessToken)
      {
        await clientPromise();
        const users = await User.find().select(' _id -password');
        if(!users)
        {
         throw new Error("Failed to load data, please try again later")
        }
        return NextResponse.json({users},{status: 201})
      }
      else
      {
        throw new Error("Access Token being checked")
      }
    }
    else
    {
      return NextResponse.json({},{status: 429, statusText: "Too Many Requests"})
    }
  }
  catch(error)
  {
    console.log(error.message)
    return NextResponse.json({message: error.message},{status: 404, statusText: error.message})
  }
};
