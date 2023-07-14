import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import User from "@/models/userSchema"

export async function GET(req){
    
  try{
  const {searchParams} = new URL(req.url)
  const userId = searchParams.get('q')
  await clientPromise();
  const user = await User.findById(userId);
  console.log(user)
  return NextResponse.json({user})
  }
  catch(error)
  {
    console.log(error)
  }
};