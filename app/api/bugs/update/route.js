import {NextRequest, NextResponse} from 'next/server'
import { redirect } from 'next/navigation'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"

export async function PUT(req,res)
{

    try {
        const token = req.cookies.get("user")
        let accessGranted = await verifyAuthJWT(token.value)
        await clientPromise();
        const user = await User.findById(accessGranted.user);
        const container = await req.json()
        const body = container.formData
        body.bugUserId = user
        await Bug.findByIdAndUpdate(container.bugId.body);
        return redirect("/bugs")
      } catch (err) {
       console.log("ouch")
      }
}