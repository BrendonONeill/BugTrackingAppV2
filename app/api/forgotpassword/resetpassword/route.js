import {NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import ResetPassword from "@/models/resetPasswordSchema";
import bcrypt from "bcrypt"


export async function POST(req,res)
{
    try
    {
        let body = await req.json()
        await clientPromise();
        const data = await ResetPassword.findOne({link : body.link})
        const checked = await bcrypt.compare(body.code, data.code)
        if(checked)
        {
            let password = await bcrypt.hash(body.password, 12);
            let email = data.email.toLowerCase()
            await User.findOneAndUpdate({email},{password})
            await ResetPassword.findOneAndDelete({link : body.link})
            return NextResponse.json({accepted: true},{status: 203})
        }

        throw new Error("failed to update user")
    }
    catch(err)
    {
        console.error(err.message)
        return NextResponse.json({message: err.message, status: 401}, {status: 401, statusText: "something went wrong"})
    }
}