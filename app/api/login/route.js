import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'
import { cookies } from 'next/headers'
import { createCookieToken } from "@/lib/auth/auth";

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
  const token = await createCookieToken(user)
  cookies().set({name: 'user', value: token, httpOnly: true, secure: true, maxAge: 20 * 5000})
  const loggedInUser =
  {
    "_id": user._id,
    "fname": user.fname,
    "lname": user.lname,
    "email": user.email,
    "role": user.role,
    "title": user.title,
  }
  return NextResponse.json(loggedInUser,{status: 201})
  }
  catch(err)
  {
    console.error(err)
  }
}

