import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import Bug from "@/models/bugSchema"
import { limiter } from "../../config/limiter";

export async function GET(req){
    
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
    const {searchParams} = new URL(req.url)
    const bugId = searchParams.get('q')
    await clientPromise();
    const bug = await Bug.findById(bugId).select("-bugUserId")
    return NextResponse.json({bug})
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