import clientPromise from "@/lib/mongo/index";
import Bug from "@/models/bugSchema"
import User from "@/models/userSchema"

export async function POST(req,res)
{
  await clientPromise();
  const user = await User.findById("649abfcc0a1699ba345df267");
  const body = await req.json()
  body.bugUserId = user
  body.bugPrivate = true

  await Bug.create(body);
}