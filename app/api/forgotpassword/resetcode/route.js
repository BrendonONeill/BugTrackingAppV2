import {NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import ResetPassword from "@/models/resetPasswordSchema";
import bcrypt from "bcrypt"

export async function POST(request,response)
{
    try
    {
        let body = await request.json()
        await clientPromise();
        const data = await ResetPassword.findOne({link : body.link})
        const checked = await bcrypt.compare(body.code, data.code)
        if(checked)
        {
            return NextResponse.json({accepted: true},{status: 203})
        }
        return NextResponse.json({accepted: false},{status: 403})
        
    }
    catch(err)
    {
        console.error(err.message)
        return NextResponse.json({message: err.message, status: 401}, {status: 401, statusText: "something went wrong"})
    }
}