import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'

export async function GET(){
  try{
      await clientPromise();
      const users = await User.find().select(' _id -password');
      return NextResponse.json(users)
  }
  catch(error)
  {
      console.log(error)
  }
};