import mongoose from 'mongoose';

let cachedConnection = null;
const uri = ''
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
    console.log(error)
}
}

export default clientPromise