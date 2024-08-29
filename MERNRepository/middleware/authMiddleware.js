import { UnauthenticatedError, UnauthorizedError, BadRequestError } from "../errors/customErrors.js";
import {verifyJWT} from '../utils/tokenUtils.js';

export const authenticateUser = (req,res,next)=>{
    // req.cookies likely hold all the cookies sent by the Client with the request
    // by using {token} in the Destructuring Assignment, this code specifically extract
    // the token cookie from the request cookies:
    const {token} = req.cookies;

    // If the token Do Not Exist:
    if(!token) throw new UnauthenticatedError('Authentication Invalid');

    // Using the try and catch method:
    try{
        // Destructuring and getting the userId and role properties:
        // the return decoded will then be passed as an Object Destructuring
        // in the form of userId and role
        // This is calling the verifyJWT function and then simultaneously
        // Destructuring the Properties for the userId and the role here
        const {userId, role} = verifyJWT(token);
        
        // If userId is strictly equal to the number
        // the testUser will be strictly equal to true
        // Getting the userId from the MongoDB Login
        const testUser = userId === '66c8169071d5ede980e70d29';
        
        req.user = {userId, role, testUser};
        // Passed on to the Next Middleware using the next keyword:
        next();
    }
    catch(error){
        throw new UnauthenticatedError('Authentication Invalid');
    }
};


// Creating the authorizePermissions Component
export const authorizePermissions = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError('Unauthorized to Access this Route')
        }
    next();
    }; 
};

// Check whether it is a TestUser using checkForTestUser
export const checkForTestUser = (req,res,next)=>{
    if(req.user.testUser) throw new BadRequestError('Demo User. Read Only');
    // Pass it on to the next middleware using the next() method here
    next();
}
