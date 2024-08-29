import {readFile} from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/userModel.js';

try{
    // Connect to the MongoDB DataBase Management
    await mongoose.connect(process.env.MONGO_URL);
    // Finding the email in the User Collection in the MongoDB DataBase Management
    // The email that I want to find is the test email which is test@test.com
    const user = await User.findOne({email:'test@test.com'});
    console.log(user)

    const jsonJobs = JSON.parse(
        await readFile(new URL('./utils/mockData.json', import.meta.url))
    );
   
    const jobs = jsonJobs.map((job)=>{
        return{...job, createdBy:user._id};
    });
    await Job.deleteMany({createdBy:user._id});
    await Job.create(jobs);
    console.log('Success');
    process.exit(0);
} catch(error){
    console.log(error);
    process.exit(1);
}


