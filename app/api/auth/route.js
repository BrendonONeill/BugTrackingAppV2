import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import clientPromise from "@/lib/mongo/index";
import Refresh from "@/models/refreshSchema"
import { createAccessToken, verifyAuthJWT } from '@/lib/auth/auth';


export async function GET()
{
    try {
        const {value : jwt} = cookies().get("refreshToken")
        await clientPromise();
        const verified = await verifyAuthJWT(jwt, "Refresh")
        if(verified)
        {
            const dbRefresh = await Refresh.findOne({jwt})
            if(dbRefresh)
            {
                const accessToken = await createAccessToken(verified.user, "Access")
                cookies().set({name: 'accessToken', value: accessToken,  sameSite: true,  maxAge: 86400000})
            }
        }
    return NextResponse.json({},{status: 201})
    } catch (error) {
        return NextResponse.json({},{status: 500, statusText: "Couldn't access database"})
    }
}