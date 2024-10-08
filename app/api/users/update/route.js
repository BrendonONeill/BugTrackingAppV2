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
            const checkEmail = container.checkEmail
            if(checkEmail !== body.email)
            {
                const user = await User.findOne({email : body.email})
                if(user)
                {
                    throw new Error("Email already Exists")
                }
            }
            await User.findByIdAndUpdate(id, body, {new: true});
            return NextResponse.json({},{statusText: "Successful updated", status: 201})
        }
        else
        {
            return NextResponse({},{status: 429, statusText: "Too Many Requests"}) 
        }
        } 
    catch(err)
    {
       console.log(err)
       return NextResponse.json({message: err.message, status: 404},{status: 404, statusText: "Something went wrong"}) 
    }
}