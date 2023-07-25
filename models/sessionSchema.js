import mongoose from 'mongoose';

const {Schema, SchemaTypes, model} = mongoose;


const sessionSchema = new Schema({
    sessionId: {type: String, required: true},
    jwt: {type: String, required: true}
},{timestamps: true})
sessionSchema.index({createdAt: 1}, {expireAfterSeconds: 172800})

let Session =  mongoose.models.Session || model("Session", sessionSchema);
export default Session