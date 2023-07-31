import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Session from "@/models/sessionSchema";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { createSessionToken, createAuthToken } from "@/lib/auth/auth";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request,response)
{
  try
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
    const sessionToken = await createSessionToken(user, "Session")
    const authToken = await createAuthToken(sessionId, "Auth")
    await Session.create( {sessionId, jwt: sessionToken});

   
    cookies().set({name: 'session', value: sessionId, httpOnly: true, maxAge: 172800})


    cookies().set({name: 'user', value: authToken, httpOnly: true, secure: process.env.LOCATION === "prod", maxAge: 20 * 5000}) // this will be deleted once everything runs on sessions
   return NextResponse.json({message: "Successful", status: 201})
  }
  catch(err)
  {
    console.error(err.message)
    return NextResponse.json({message: err.message, status: 401})
  }
}

