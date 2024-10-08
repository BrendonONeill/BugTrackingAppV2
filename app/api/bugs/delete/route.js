import {NextResponse} from 'next/server'
import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import RecycleBin from '@/models/recycleBinSchema';
import { limiter } from "../../config/limiter";

export async function POST(req)
{
    try {
        const limit = await limiter.removeTokens(1)
        if(limit > 0)
        {
        await clientPromise();
        const body = await req.json()
        let oldBug = await Bug.findById(body.id);
        let { bugName,bugUserId,bugDes,bugCode,bugProject,bugImportance,bugPrivate,dateBugCreated,Comments} = oldBug
        let recyceledBug = { bugName,bugUserId,bugDes,bugCode,bugProject,bugImportance,bugPrivate,dateBugCreated,Comments}
        recyceledBug.bugUserId = body.user
        await RecycleBin.create(recyceledBug);
        await Bug.findByIdAndDelete(body.id);
        return NextResponse.json({},{statusText: "bug deleted", status : 200})
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