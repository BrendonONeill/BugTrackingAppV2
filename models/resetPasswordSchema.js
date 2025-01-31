import mongoose from 'mongoose';

const {Schema, SchemaTypes, model} = mongoose;


const resetPasswordSchema = new Schema({

    link: {type: String, required: true},
    code: {type: String, required: true},
    email:{type: String, required: true},
},{timestamps: true})
resetPasswordSchema.index({createdAt: 1}, {expireAfterSeconds: 1800})

const ResetPassword =  mongoose.models.ResetPassword || model("ResetPassword", resetPasswordSchema);
export default ResetPassword