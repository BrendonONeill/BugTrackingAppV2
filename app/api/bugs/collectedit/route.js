import clientPromise from "@/lib/mongo/index";
import {NextResponse} from 'next/server'
import Bug from "@/models/bugSchema"

export async function GET(req){
    
  try{
    const {searchParams} = new URL(req.url)
    const bugId = searchParams.get('q')
    await clientPromise();
    const bug = await Bug.findById(bugId).select("-bugUserId")
    return NextResponse.json({bug})
  }
  catch(error)
  {
    console.log(error)
  }
};