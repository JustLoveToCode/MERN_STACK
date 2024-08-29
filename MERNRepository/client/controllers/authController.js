import { StatusCodes } from "http-status-codes";
import User from '../../models/userModel.js';
// Importing the hashPassword Functionality:
import { hashPassword } from "../../utils/passwordUtils.js";
import { UnauthenticatedError } from "../../errors/customErrors.js";
// Importing the comparePassword Functionality:
import { comparePassword } from "../../utils/passwordUtils.js";
import { createJWT } from "../../utils/tokenUtils.js";


// Creating the register Functionality:
export const register = async(req,res)=>{
    // It is a method that is provided by the MongoDB NodeJs
    // to count the number of the Documents in the Collection named User
    // The === 0 will return strictly true or false
    const isFirstAccount = await User.countDocuments() === 0
    // Using the Ternary Conditional Operator to find the 'admin' or 'user'
    // If it is strictly equal to 0, it is true, hence it will be 'admin'
    // Otherwise, it will return 'user'
    req.body.role = isFirstAccount ? 'admin' : 'user';
    
    // The bigger the value, the more secured the password:
    // Getting the Hashed Version of the Password:
    // Getting the password from the req.body.password:
    // Invoking the hashPassword when it is imported
    // Getting the req.body.password and Invoking the hashPassword Functionality:
    const hashedPassword = await hashPassword(req.body.password);
    // Returning the result for the hashPassword and storing 
    // it into the req.body.password properties
    // Overriding the properties of the password:
    req.body.password = hashedPassword;
    
    // Using the create method to create in the req.body
    const user = await User.create(req.body);
    // What will be returned here? It will be the msg: 'user created'
    res.status(StatusCodes.CREATED).json({msg:'user created'});
};

// Creating the login Functionality:
export const login = async(req,res)=>{
    // Check if the User actually exist
    // Check if the Password is Correct
    // Checking whether the User exist using the findOne method
    // for the req.body.email here
    const user = await User.findOne({email:req.body.email});
    console.log(user)
    // If the user exist and the isMatch also returned true
    // the isValidUser will be true using the && Operator
    // if the comparePassword is the Same:
    // Using the await method and comparePassword:
    // Using the && Operator:
    const isValidUser = user && await comparePassword(
        req.body.password, user.password
    )
    // If isValidUser is False and not returned, which mean either the user or comparePassword is false
    // false returned by the isMatch
    if(!isValidUser) throw new UnauthenticatedError('Invalid Credentials');
    
    // createJWT will be Invoked Here:
    const token = createJWT({
        userId: user._id, role:user.role
    });
    // Getting oneDay in Milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token,{
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });
    res.status(StatusCodes.OK).json({msg:'User is Logged In'})
    
};

export const logout = (req,res)=>{
    res.cookie('token', 'logout',{
    httpOnly:true,
    expires: new Date(Date.now())
}
);
res.status(StatusCodes.OK).json({msg:'User Logged Out!'})

}