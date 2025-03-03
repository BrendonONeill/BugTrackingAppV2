import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"
import {NextResponse} from 'next/server'
import { customAlphabet } from 'nanoid'
import ResetPassword from "@/models/resetPasswordSchema";
import bcrypt from "bcrypt"



export async function POST(request,response)
{

    try
    {
        let data = await request.json()
        await clientPromise();
        const alreadySent = await ResetPassword.findOne({email : data.email})
        if(alreadySent)
        {
            return NextResponse.json({link:alreadySent.link, status: 201})
        }
        const user = await User.findOne({email : data.email})
        const nanoidCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxzy?@[]', 8)
        const nanoidLink = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxzy', 8)
        let string = nanoidLink()
        if(user)
        {
            let code = nanoidCode()
            let codeHashed = await bcrypt.hash(code, 12);
            await ResetPassword.create({link:string,code: codeHashed,email: data.email})
            let res = await fetch('https://yko8kw06tyklhyhrgtrg.brendon-projects.blog/bugtracking', {
                headers: {
                    'Content-Type': 'application/json',
                    "Origin": "https://bug-tracking-app.vercel.app"
                },
                method: 'POST',
                body: JSON.stringify({link:`https://bug-tracking-app.vercel.app/login/forgotpassword/${string}`,code, email: data.email.toLowerCase()}),
            });
            if(res.ok)
            {
                return NextResponse.json({link:string, status: 201})
            }
        }

        return NextResponse.json({link:string, status: 201})
    }
    catch(err)
    {
        console.error(err.message)
            return NextResponse.json({message: err.message, status: 401}, {status: 401, statusText: "something went wrong"})
    }
}
