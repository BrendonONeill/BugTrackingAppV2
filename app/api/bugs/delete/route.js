import {NextRequest, NextResponse} from 'next/server'
import {redirect} from 'next/navigation'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"

export async function POST(req,res)
{

    try {
        await clientPromise();
        const body = await req.json()
        await Bug.findByIdAndDelete(body);
        redirect("/bugs/create")

      } catch (err) {
        err.message = "This page doesn't exist";
      }
}