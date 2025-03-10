import {NextRequest, NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import { limiter } from "../../config/limiter";

export async function PUT(req,res)
{

    try {
      const limit = await limiter.removeTokens(1)
      if(limit > 0)
      {
          await clientPromise();
          const container = await req.json()
          const body = container.formData
          await Bug.findByIdAndUpdate(container.bugId, body);
          return NextResponse.json({},{statusText: "Bug was updated", status: 201})
      }
      else
      {
        return NextResponse({},{status: 429, statusText: "Too Many Requests"})
      }
    } 
    catch(err)
     {
      return NextResponse({},{status: 404, statusText: "Something went wrong"})
     }
}