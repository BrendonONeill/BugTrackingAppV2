import mongoose from 'mongoose';

const {Schema, SchemaTypes, model} = mongoose;


const recycleBinSchema = new Schema({
    bugName: {type: String, required: true},
    bugUserId: {type: SchemaTypes.ObjectId, ref: "User", required: true},
    bugDes: {type: String, required: true},
    bugCode: {type: String, required: true},
    bugProject: {type: String, required: true},
    bugImportance: {type: String,
        enum: ["low","medium", "high"],
        required:true,
        default:'low'},
    dateBugCreated: {   type: Date,
        immutable: true},
    dateBugDeleted: {type: Date,  default: () => Date.now()},
    dateBugExpires: {type: Date,  default: () => Date.now() + 10*60*1000},
    bugPrivate: {type: Boolean, required: true, default: true},
    Comments: [{
        userID: {type: SchemaTypes.ObjectId, ref: "User", required: true},
        userComment: {type: String, required: true},
        commentCreated: {type: Date,
            default: () => Date.now(),
            immutable: true},
    }]
},{timestamps: true})
recycleBinSchema.index({createdAt: 1}, {expireAfterSeconds: 120})

const RecycleBin =  mongoose.models.RecycleBin || model("RecycleBin", recycleBinSchema);
export default RecycleBin