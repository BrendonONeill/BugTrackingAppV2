import {NextRequest, NextResponse} from 'next/server'
import { redirect } from 'next/navigation'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"

export async function PUT(req,res)
{

    try {
          await clientPromise();
          const container = await req.json()
          const body = container.formData
          await Bug.findByIdAndUpdate(container.bugId, body);
          console.log("bug was updated")
          return NextResponse.json({message: "Bug was updated", status: 201})
    } 
    catch(err)
     {
       console.log(err)
     }
}