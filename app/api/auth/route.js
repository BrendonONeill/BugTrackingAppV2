
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import clientPromise from "@/lib/mongo/index";
import Refresh from "@/models/refreshSchema"
import { createAccessToken, verifyAuthJWT } from '@/lib/auth/auth';


export async function GET(request)
{
    try {
        cookies().set("man","cat")
    const {value : jwt} = cookies().get("refreshToken")

    await clientPromise();
    const b = await verifyAuthJWT(jwt, "Refresh")
    if(b)
    {
        const a = await Refresh.findOne({jwt})
        if(a)
        {
            const accessToken = await createAccessToken(b.user, "Access")
            cookies().set({name: 'accessToken', value: accessToken,  sameSite: true,  maxAge: 86400000})
        }
    }

    console.log("Access Key reactivated")
    return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: "couldn't access db", status: 500})
    }
}