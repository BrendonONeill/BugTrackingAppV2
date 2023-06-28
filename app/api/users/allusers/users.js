import clientPromise from "@/lib/mongo/index";
import User from "@/models/userSchema"

export async function getUsers(res, req){
  try{
  await clientPromise();
  const users = await User.find();
  return users
  }
  catch(error)
  {
    console.log(error)
  }
};