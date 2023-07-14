import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse, NextRequest} from 'next/server'

import { verifyAuthJWT  } from "@/lib/auth/auth";

export async function GET(req, res){
  try{
  const jwt = req.cookies.get('USER').value
  if(jwt)
  {
    await clientPromise();
    const payload = await verifyAuthJWT(jwt)
    const user = await User.findById(payload.user).select(' _id -password');
    return NextResponse.json({user})
  }
  
  }
  catch(error)
  {
    console.log(error)
  }
};