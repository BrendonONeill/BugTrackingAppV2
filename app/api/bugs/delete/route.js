import {NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"

export async function POST(req,res)
{
    try {
        await clientPromise();
        const body = await req.json()
        await Bug.findByIdAndDelete(body);
        return NextResponse.json({message: "bug deleted", status : 201})
    } 
    catch (err) 
    {
        err.message = "This Bug doesn't exist";
    }
}