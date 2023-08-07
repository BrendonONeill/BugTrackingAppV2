import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import Bug from "@/models/bugSchema"
import { limiter } from "../../config/limiter";

export const dynamic = "force-dynamic";
export async function GET(req){
    
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {

    const {searchParams} = new URL(req.url)
    const bugId = searchParams.get('q')
    await clientPromise();
    const bug = await Bug.findById(bugId).populate('bugUserId');
    if(bug != null)
    {
      return NextResponse.json({bug,status: 201})
    }
    else
    {
      throw new Error("Information could not be received")
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
