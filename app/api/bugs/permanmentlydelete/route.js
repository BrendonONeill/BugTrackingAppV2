import {NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import RecycleBin from '@/models/recycleBinSchema';
import { limiter } from "../../config/limiter";

export async function POST(req,res)
{
    try {
        const limit = await limiter.removeTokens(1)
        if(limit > 0)
        {
            await clientPromise();
            const body = await req.json()
            await RecycleBin.findByIdAndDelete(body.id);
            return NextResponse.json({},{message: "bug deleted", status : 201})
        }
        else
        {
            return NextResponse({},{status: 429, statusText: "Too Many Requests"})
        }
    } 
    catch (err) 
    {
        return NextResponse({},{status: 404, statusText: "Something went wrong"})
    }
}