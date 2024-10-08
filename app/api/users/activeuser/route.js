import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import { cookies } from 'next/headers'
import {NextResponse, NextRequest} from 'next/server'
import { verifyAuthJWT  } from "@/lib/auth/auth";
import { limiter } from "../../config/limiter";


export const dynamic = "force-dynamic";
export async function GET(req, res){
  try{
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      const refreshToken = cookies().get('refreshToken')
      if(refreshToken)
      {
        const {user} = await verifyAuthJWT(refreshToken.value, "Refresh");
        await clientPromise();
        const activeUser = await User.findOne({_id : user.userId})
        if(activeUser != null)
        {
          return NextResponse.json({activeUser},{status: 201});
        }
        else
        {
          return NextResponse({},{status: 404, statusText: "something went wrong"})
        }
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
    return NextResponse.json({message: "failed", status: 404}, {status: 404, statusText: "Something went wrong"})
  }
};
