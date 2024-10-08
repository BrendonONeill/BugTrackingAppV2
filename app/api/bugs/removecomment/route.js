import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import {NextResponse} from 'next/server'
import { limiter } from "../../config/limiter";

export async function PUT(req)
{
  try
  {
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      await clientPromise();
      const body = await req.json()
      const bug  = await Bug.findById(body.id)
      bug.Comments = bug.Comments.filter((obj) => obj._id.toString() !== body.commentid)
      await bug.save()
      console.log("bug deleted sucessful")
      return NextResponse.json({message: "comment was deleted" , status: 201})
    }
    else
    {
      return NextResponse({},{status: 429, statusText: "Too Many Requests"})
    }

  }
  catch(error)
  {
    console.log(error)
    return NextResponse({},{status: 404, statusText: "Something went wrong"})
  }
}
