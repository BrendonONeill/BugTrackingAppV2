import { NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema";
import { limiter } from "../../config/limiter";

export async function PUT(req,res)
{

    try {
        const limit = await limiter.removeTokens(1)
        if(limit > 0)
        {
            await clientPromise();
            const container = await req.json()
            const body = container.formData
            const id = container.userId
            await User.findByIdAndUpdate(id, body, {new: true});
            return NextResponse.json({message: "Successful updated", status: 201})
        }
        else
        {
            return NextResponse({},{status: 429, statusText: "Too Many Requests"}) 
        }
        } 
    catch(err)
    {
       console.log(err)
       return NextResponse({},{status: 404, statusText: "Something went wrong"}) 
    }
}