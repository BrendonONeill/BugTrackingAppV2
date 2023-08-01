import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Session from "@/models/sessionSchema";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { createSessionToken, createAuthToken } from "@/lib/auth/auth";
import { v4 as uuidv4 } from 'uuid';
import { limiter } from "../config/limiter";

export async function POST(request,response)
{
  try
  {
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
    const sessionId = uuidv4()
    const auth = {
      sessionId : sessionId,
      role: user.role
    }
    const sessionToken = await createSessionToken(user, "Session");
    const authToken = await createAuthToken(auth, "Auth");
    await Session.create( {sessionId, jwt: sessionToken});

   
    cookies().set({name: 'session', value: sessionId, httpOnly: true, sameSite: true, maxAge: 172800})
    cookies().set({name: 'user', value: authToken, httpOnly: true, sameSite: true, secure: process.env.LOCATION === "prod", maxAge: 20 * 5000})
   return NextResponse.json({message: "Successful", status: 201})}
   else
   {
    return new NextResponse({},{status: 429, statusText: "Too Many Requests"})
   }
  }
  catch(err)
  {
    console.error(err.message)
    return NextResponse.json({message: err.message, status: 401})
  }
}

