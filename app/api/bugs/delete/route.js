import {NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import { limiter } from "../../config/limiter";

export async function POST(req,res)
{
    try {
        const limit = await limiter.removeTokens(1)
        if(limit > 0)
        {
        await clientPromise();
        const body = await req.json()
        await Bug.findByIdAndDelete(body);
        return NextResponse.json({message: "bug deleted", status : 201})
        }
        else
        {
            return NextResponse({},{status: 429, statusText: "Too Many Requests"})
        }
    } 
    catch (err) 
    {
        err.message = "This Bug doesn't exist";
    }
}