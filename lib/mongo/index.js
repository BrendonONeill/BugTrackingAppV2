import mongoose from 'mongoose';

let cachedConnection = null;
const uri = process.env.MONGOSTRING;
const options = {
}


async function clientPromise(req, res)
{

try{
    if (cachedConnection) {
        console.log("connection was cached")
        return cachedConnection;
      }
    let client = mongoose.connect(uri,options).then((mongoose) => {
        return mongoose
    })
    let connectdb = await client
    cachedConnection = connectdb;
    return connectdb;
}
catch(error)
{
    console.log("failed to connect to the database: ",error);
}
}

export default clientPromise
