import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Session from "@/models/sessionSchema";
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { createCookieToken } from "@/lib/auth/auth";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req,res)
{
  const response = NextResponse.next()
  try
  {
    await clientPromise();
    const {email, password} = await req.json()
    if (!email || !password) {
      throw new Error("Please Enter Email/Password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Email or Password not valid");
    }

    // Here I am creating an id for the session then I create a jwt token to store the logged in users info in the db. 
    const sessionId = uuidv4()
    const token = await createCookieToken(user)
    await Session.create( {sessionId, jwt: token});

   
    cookies().set({name: 'session', value: sessionId, httpOnly: true, maxAge: 172800})


    cookies().set({name: 'user', value: token, httpOnly: true, secure: true, maxAge: 20 * 5000}) // this will be deleted once everything runs on sessions
   return NextResponse.json({message: "Successful", status: 201})
  }
  catch(err)
  {
    console.error(err)
  }
}

