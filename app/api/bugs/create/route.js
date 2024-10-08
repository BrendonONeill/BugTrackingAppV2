import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'
import { limiter } from "../../config/limiter";

export async function POST(req)
{
  try
  {
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      await clientPromise();
      const body = await req.json()
      const user = await User.findById(body.user);
      body.formData.bugUserId = user
      let a = await Bug.create(body.formData);
      return NextResponse.json({},{statusText: "Bug was created" , status: 201})
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