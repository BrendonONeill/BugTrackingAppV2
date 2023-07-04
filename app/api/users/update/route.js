import {NextRequest, NextResponse} from 'next/server'
import { redirect } from 'next/navigation'
import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema";

export async function PUT(req,res)
{

    try {
        await clientPromise();
        const container = await req.json()
        const body = container.formData
        const id = container.userId
        await User.findByIdAndUpdate(id, body, {new: true});
        return redirect("/users")
      } catch (err) {
       console.log("ouch")
      }
}