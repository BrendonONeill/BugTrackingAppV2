import {NextRequest, NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import Bug from '@/models/bugSchema';
import { limiter } from "../../config/limiter";

export async function POST(req,res)
{
    try
    {
        const limit = await limiter.removeTokens(1)
    if(limit > 0)
    {
        await clientPromise();
        const body = await req.json()
        await User.findByIdAndDelete(body);
        await Bug.deleteMany({bugUserId : {_id : body}})
        return NextResponse.json({message: "bug deleted", status: 201})
    }
    else
    {
        return NextResponse({},{status: 429, statusText: "Too Many Requests"})
    }
    } 
    catch(err)
    {
        return NextResponse({},{status: 404, statusText: "Something went wrong"})
    }
}