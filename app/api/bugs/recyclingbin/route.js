import clientPromise from "@/lib/mongo/index";
import { cookies } from "next/headers";
import {NextResponse} from 'next/server'
import RecycleBin from "@/models/recycleBinSchema";
import { verifyAuthJWT } from "@/lib/auth/auth";
import { limiter } from "../../config/limiter";

export const dynamic = "force-dynamic";
export async function GET(req){
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      const accessToken = cookies().get('accessToken')
      if(accessToken)
      {
        const {user} = await verifyAuthJWT(accessToken.value, "Access");
        await clientPromise();
        const bugs = await RecycleBin.find().where({bugUserId : { _id : user.userId} }).populate("bugUserId")
      if(bugs != null)
      {
        return NextResponse.json(bugs, {status: 201, statusText: "Bugs were collected"})
      }
      else
      {
        throw new Error("Could not get information from database")
      }
     
    }
    }
    else
    {
      return NextResponse.json({},{status: 429, statusText: "Too Many Requests"})
    }
  }
  catch(error)
  {
    console.log(error)
    return NextResponse.json({},{status: 404, statusText: "Something went wrong"})
  }
};