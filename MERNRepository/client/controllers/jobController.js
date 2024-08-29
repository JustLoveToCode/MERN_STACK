import Job from '../../models/JobModel.js';
// Getting the Status Code from 'http-status-code'
import { StatusCodes } from 'http-status-codes';
// import { NotFoundError } from '../../errors/customErrors.js';
// import {nanoid} from 'nanoid';
// import mongoose from 'mongoose'
import mongoose from 'mongoose';
import day from 'dayjs';




// Creating the Arrays of 2 Different Objects:
// Using the let keywords to allow Overriding:
// Creating the jobs with the Objects Array:
// let jobs = [
//     {id:nanoid(), company: 'apple', position:'front-end'},
//     {id:nanoid(), company: 'google', position:'back-end'},

// ];


// Creating getAllJobs function:
export const getAllJobs = async (req,res)=>{
    // This is the Search Query for the User
    const {search, jobStatus, jobType, sort} = req.query

    const queryObject = {
        createdBy:req.user.userId,
    };
    // If search actually exist
    // If I do not provide anything on the search
    // I will get back everything
    // This is using regex Search Query
    if(search){
        queryObject.$or = [
            {position:{$regex:search, $options:'i'}},
            {company:{$regex:search, $options:'i'}}
        ]
    }

    if(jobStatus && jobStatus !=='all'){
        queryObject.jobStatus = jobStatus;
    }
    if(jobType && jobType !=='all'){
        queryObject.jobType = jobType;
    }
    
    // {} Empty Bracket represent all the Jobs
    // This is the createdBy Properties
    // When you click on Get All Jobs, it will find the job
    // that is created by that Particular User using the req.user.userId:
    // '-createdAt' will return everything in the Descending Order
    // 'createdAt' will return everything in the Ascending Order
    // Creating an Object called sortOptions
    
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z':'position',
        'z-a':'-position',
    }

    // Creating the sortKey
    // If everything fail, sort based on the newest
    // which is the default choice
    const sortKey = sortOptions[sort] || sortOptions.newest;

    // Setting Up the Pagination For the Page Number
    // By default, it will always look for the first page which is 1
    const page = Number(req.query.page) || 1;
    // Creating the limit Variable and it will default to 10
    const limit = Number(req.query.limit) || 10;
    // At Page 1, skip 0 Page, hence it is 1-1, the limit is also 10
    // At Page 2, skip 1 Page, hence it is 2-1, the limit is 10
    const skip = (page - 1) * limit;
    

    // Skip the First Job and move on to the Second Job
    // Limit the number of job to only 1
    // This is used for Pagination of the Page Purposes
    const jobs = await Job.find(queryObject).sort(sortKey).skip(skip).limit(limit);

    const totalJobs = await Job.countDocuments(queryObject);

    // Using the Match to Round it Upward
    const numOfPages = Math.ceil(totalJobs/limit);

    // json is what will be output in the Terminal Console
    res.status(StatusCodes.OK).json({totalJobs, numOfPages, currentPage:page, jobs});
}

// Creating createJob function:
export const createJob = async  (req,res)=>{
    // This will allocate the job created by that Specific User
    // using the userId when the user is Logged In
    req.body.createdBy = req.user.userId;
    // This is the company and position in the req.body that We Created
    // Using the Object Destructuring Properties to get company and position:
    // from the req.body here

    // The mongoose with the create Method:
    // create method is asynchronous, hence there is the await keyword in front
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}


// Creating getJob function:
export const getJob = async (req,res)=>{
    // Getting the id from the /:id
    const {id} = req.params;
    // const job = await Job.findById(req.params.id);
    // const job = jobs.find((job)=>job.id === id)
    // Using the findById method:
    const job = await Job.findById(id);
    // throw new NotFoundError, this is the class NotFoundError
    // if(!job) throw new NotFoundError(`No job with id ${id}`);
    
    // if(!job){
    //     res.status(404).json({msg:`No Job with the id ${id}`});
    //     return
    // }
    // If there is job Available, return it in the Json Format
    res.status(StatusCodes.OK).json({job});
}

// Creating updateJob function:
export const updateJob = async (req,res)=>{
    // const {company, position} = req.body;
    // If the company or position do not exist:
    // if(!company || ! position){
    // //  The Code stopped going downward after the return keyword is made:
    //     return res.status(400).json({msg:'Please Provide the Company and Position'})
    // }
    // Getting the id from req.params:
    const {id} = req.params;
    // Getting the Single Job using the id Params using the find method:
    // const job = jobs.find((job)=>job.id === id);
    // id is the id from the req.params, req.body is the information
    // that you want to update and new:true mean you want the 
    // updated information:
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new:true
    })
    // If the updatedJob do not exist here
    // if(!updatedJob) throw new NotFoundError(`No job with id ${id}`);
    // Job is Modified here:
    // job.company = company
    // job.position = position
    res.status(StatusCodes.OK).json({msg:'Job Modified', job:updatedJob});
}

// Creating deleteJob function:
export const deleteJob = async (req,res)=>{
    // req.params is getting the /:id here using the req.params for /:id
    const {id} = req.params;
    // Using the find method to find the item inside the Array:
    // const job = jobs.find((job)=>job.id === id)
    const removedJob = await Job.findByIdAndDelete(id)
    // If the removedjob do not exist here
    // if(!removedJob) throw new NotFoundError(`No job with id ${id}`);
    // Using the Filter Method to filter out the Job
    // if the id Do Not Match:
    // It return the New Array that satisfy the condition
    // which in this case is the job.id is strictly not equal
    // to the id itself that is passed in as the req.params:
    // filter method is what we want to keep:
    // const newJobs = jobs.filter((job)=>job.id !==id);
    // This is the New Array with the Filtered Data:
    // jobs = newJobs;
    res.status(StatusCodes.OK).json({msg:'Job Deleted', job:removedJob})
}


export const showStats = async(req,res)=>{
// Using the aggregate method
// MongoDB Aggregation Pipeline
    let stats = await Job.aggregate([
        // First Stage is the $match Stage
        {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
        // Second Stage is the $group Stage
        {$group:{_id:'$jobStatus', count:{$sum:1}}}
]);

// Using the reduce method here
// The reduce method got the accumulator and the
// curr which is the current iteration
    stats = stats.reduce((acc,curr)=>{
    // Iterator over the array
    const {_id:title, count} = curr
    // Get the Dynamic Property
    acc[title] = count
    // return the result which is acc
    return acc;
    }, {});
   
    // defaultStats is in the Format of an Object
    const defaultStats = {
        pending:stats.pending || 0,
        interview:stats.interview || 0,
        declined:stats.declined || 0
    };
    // For the monthlyApplications
    let monthlyApplications = await Job.aggregate([
        // Using the match method
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        // Using the group method
        {$group:{
            _id:{year:{$year:'$createdAt'}, month:{$month:'$createdAt'}},
            count:{$sum:1}
        }},
        // Using the sort method
        {$sort:{'_id.year':-1, '_id.month':-1}},
        // Set the limit equal to 6
        {$limit:6}

    ]);

    // Using the map method to loop through the Array
    monthlyApplications =monthlyApplications.map((item)=>{
        // Object Destructuring Method
        const {_id:{year,month}, count} = item
        // Using the day.js Library
        const date = day().month(month-1).year(year).format('MMM YY');
        // Using the return keyword to return th date and count
        return { date, count};
        // reverse is to call the Most Recent Date
    }).reverse()

    // let monthlyApplications =
    // [   
    // {
    //     date: 'May 23',
    //     count: 12
    // },
    // {
    //     date:'June 23',
    //     count: 9
        
    // },
    // {
    //     date: 'August 23',
    //     count: 3
    // }
    // ]
    // This is the Data that will be displayed in the Json Format
    res.status(StatusCodes.OK).json({defaultStats,monthlyApplications});
}

