import {NextRequest, NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"

export async function POST(req,res)
{
    try
    {
        await clientPromise();
        const body = await req.json()
        await User.findByIdAndDelete(body);
        return NextResponse.json({message: "bug deleted", status: 201})
    } 
    catch(err)
    {
        err.message = "This page doesn't exist";
        next(err);
    }
}