import mongoose from "mongoose";
// Import the constants.js file into JobModel.js file:
import { JOB_STATUS , JOB_TYPE} from "../utils/constants.js";


// Creating the JobSchema
const JobSchema = new mongoose.Schema({
    company: String,
    position: String,
    jobStatus:{
        type:String,
        // Retrieved an Array of all the Values of the Properties
        // for the JOB_STATUS Object using the enum properties:
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING
    },
    jobType:{
        type:String,
        enum:Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME
    },
    jobLocation:{
        type:String,
        default:'my city',
    },
    createdBy:{
    type: mongoose.Types.ObjectId,
    ref: 'User',
    }
},
{timestamps:true}
);

// Exporting the Mongoose Model called JobSchema:
// This will create a Collection
export default mongoose.model('Job', JobSchema);