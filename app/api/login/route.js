import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Refresh from "@/models/refreshSchema";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { createAccessToken, createRefreshToken } from "@/lib/auth/auth";
import { limiter } from "../config/limiter";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request,response)
{
  try
  {
    const acceptCookies = cookies().get("cookie-access");
    if(!acceptCookies)
    {
        throw new Error("Need Cookies enabled to login")
    }
    const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
      
      await clientPromise();
      const {email, password} = await request.json()
      if (!email || !password) {
        throw new Error("Please Enter Email/Password");
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error("Email or Password not valid");
      }


    // Here I am creating an id for the session then I create a jwt token to store the logged in users info in the db. 
    const loginUser = {
      userId: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    }
    const [refreshToken, accessToken] = await Promise.all([Refresh.create( {id:uuidv4(), jwt: await createRefreshToken(loginUser, "Refresh")}),createAccessToken(loginUser, "Access")]);


    cookies().set({name: 'refreshToken', value: refreshToken.jwt, httpOnly: true, sameSite: true, secure: process.env.LOCATION === "prod", maxAge: 1209600000})
    cookies().set({name: 'accessToken', value: accessToken, httpOnly: true, sameSite: true, secure: process.env.LOCATION === "prod", maxAge: 3600000})


    return NextResponse.json({message: "Successful", status: 201})}
   
    else
   {
    return NextResponse({},{status: 429, statusText: "Too Many Requests"})
   }
  }
  catch(err)
  {
    console.error(err.message)
    return NextResponse.json({message: err.message, status: 401}, {status: 401, statusText: "something went wrong"})
  }
}

