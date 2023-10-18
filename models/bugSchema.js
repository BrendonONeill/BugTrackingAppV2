import mongoose from 'mongoose';

const {Schema, SchemaTypes, model} = mongoose;


const bugSchema = new Schema({
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
        default: () => Date.now(),
        immutable: true},
    dateBugUpdated: Date,
    bugPrivate: {type: Boolean, required: true, default: true},
    Comments: [{
        userID: {type: SchemaTypes.ObjectId, ref: "User", required: true},
        userComment: {type: String, required: true},
        commentCreated: {type: Date,
            default: () => Date.now(),
            immutable: true},
    }]
})

const Bug =  mongoose.models.Bug || model("Bug", bugSchema);
export default Bug