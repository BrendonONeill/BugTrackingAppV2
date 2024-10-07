import mongoose from 'mongoose';

const {Schema, model} = mongoose;


const refreshSchema = new Schema({
    id: {type: String, required: true},
    jwt: {type: String, required: true}
},{timestamps: true})
refreshSchema.index({createdAt: 1}, {expireAfterSeconds: 86400000})

const Refresh =  mongoose.models.Refresh || model("Refresh", refreshSchema);
module.exports = Refresh;