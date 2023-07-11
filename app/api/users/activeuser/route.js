import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse, NextRequest} from 'next/server'
import { cookies } from 'next/headers'
import { jwtDecrypt } from "jose"
import { verifyAuthJWT  } from "@/lib/auth/auth";

export async function GET(req, res){
  try{
  const jwt = req.cookies.get('USER').value
  const payload = await verifyAuthJWT(jwt)
  return NextResponse.json({user: payload.user})
  }
  catch(error)
  {
    console.log(error)
  }
};