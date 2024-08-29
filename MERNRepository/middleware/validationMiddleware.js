import {body, param, validationResult} from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError} from '../errors/customErrors.js';
import {JOB_STATUS, JOB_TYPE} from '../utils/constants.js';
import mongoose from 'mongoose';
import Job from '../models/JobModel.js';
import User from '../models/userModel.js';

// Using the withValidationErrors Variable
const withValidationErrors = (validateValues)=>{
    return [
        validateValues,
        (req,res,next)=>{
        const errors = validationResult(req);
        // If the errors is Not Empty At All:
        if(!errors.isEmpty()){
            // Convert the errors into an array and use
            // the map method and get the error message using error.msg:
            const errorMessages = errors.array().map((error)=>error.msg);
            if(errorMessages[0].startsWith('No Job')){
            throw new NotFoundError(errorMessages)
            }
            // If the User that Created the Job is not the Same as the one that access it
            if(errorMessages[0].startsWith('Not Authorized'))
            {
                throw new UnauthorizedError('Not Authorized to Access this Route')
            }
            throw new BadRequestError(errorMessages);
        }
        next();
        },
    ];
};

// The body of the different properties must not be empty
export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job Location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid Status Value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid Type Value')
]);


// Using the validateIdParam Variable
export const validateIdParam = withValidationErrors([
    param('id')
    // Using the custom function here
    // async function is not going to return true or false
    .custom(async(value, {req})=>{
    // Have the method of isValid here to see whether it return True or False
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    // If the Id is not valid:
    if(!isValidMongoId) throw new BadRequestError('Invalid MongoDB id, Please enter the Proper Id')
    // job Assignment Variable is assigned once the findById(id) have been found for
    // await Job.findById(id):
    const job = await Job.findById(value);
    // throw new NotFoundError, this is the class NotFoundError
    // if the job is actually not found:
    if(!job) throw new NotFoundError(`No Job with the id ${value}`);
    // If this person is not an Admin User
    const isAdmin = req.user.role === 'admin'
    // If this person is not an Owner of the Creation of the Job
    const isOwner = req.user.userId === job.createdBy.toString()
    if(!isAdmin && !isOwner) throw new UnauthorizedError('Not Authorized to Access this Route')
    })

]);


// Using the validateRegisterInput Variable
export const validateRegisterInput = withValidationErrors([
    // isEmail() check whether it is a Valid Email:
    body('email').notEmpty().withMessage("Email is required").isEmail().withMessage(
        "Invalid Email Format").custom(async(email)=>{
        // Using the findOne method with the email properties:
        // Find the user based on a certain condition such as email property
        // using the findOne method:
        const user = await User.findOne({email});
        // If user existed using the findOne method: 
        // throw the BadRequestError which is 'Email already existed'
        // If user is equal to true or existed
        if(user){
            throw new BadRequestError('Email already existed');
        }
    }),
    // Using isLength() to check the length of the password:
    // minimum length of password is 8:
    body('password').notEmpty().withMessage('Password is required').isLength({min:8})
    .withMessage('Password must be at least 8 character long'),
    // Using notEmpty() to see that the location is not Empty at all:
    // The body is not empty at all and if it is empty, it will have 'Location is required'
    body('location').notEmpty().withMessage('Location is required'),
    body('lastName').notEmpty().withMessage('Last Name is required')
]);

// Using the validateLoginInput Variable:
export const validateLoginInput = withValidationErrors([
    // Check that the email property is not empty and it has the message 
    // Email is Required when it is Empty and it has the message of Invalid Email Format
    // when the Email is Invalid
    body('email').notEmpty().withMessage('Email is Required').withMessage('Invalid Email Format'),
    // Using the password property in the body
    body('password').notEmpty().withMessage('Password is Required')
])

export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required').isEmail().withMessage('Invalid Email Format')
    .custom(async (email, {req})=>{
        // Finding the user based on the email:
        const user = await User.findOne({email});
        // If the user Actually Exist:
        if(user && user._id.toString() !== req.user.userId){
            throw new BadRequestError("Email Already Existed");
        }
    }),
    body('location').notEmpty().withMessage('Location is Requred'), 
    body('lastName').notEmpty().withMessage('Last Name is Required')
])


