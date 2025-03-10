import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import Bug from "@/models/bugSchema"
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
        const bugId = searchParams.get('q')
        await clientPromise();
        const bug = await Bug.findById(bugId).populate('bugUserId').populate("Comments.userID");
        if(bug != null)
        {
          return NextResponse.json({bug},{status: 201, statusText: "Successful"})
        }
        else
        {
          throw new Error("Information could not be received")
        }
      }
      else
      {
        throw new Error("Checking Access Key.")
      }
    }
    else
    {
      return NextResponse.json({},{status: 429, statusText: "Too Many Requests"})
    }
  }
  catch(error)
  {
    return NextResponse.json({},{status: 404, statusText: error})
  }
};
