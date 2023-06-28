import clientPromise from "../../lib/mongo/index";
import Bug from "../../models/bugSchema"
import User from "../../models/userSchema"

export async function allBugs(){
  try{
  await clientPromise();
  const bugs = await Bug.find().where().populate("bugUserId");
  console.log("db was called on all bugs")
  return bugs
  }
  catch(error)
  {
    console.log(error)
  }
};

export async function filterBugs(input){
  try{
  await clientPromise();
  let bugs;
  if(input === "private")
  {
    bugs = await Bug.find().where({bugPrivate : "false"}).populate("bugUserId");
  }
  return bugs
  }
  catch(error)
  {
    console.log(error)
  }
};


