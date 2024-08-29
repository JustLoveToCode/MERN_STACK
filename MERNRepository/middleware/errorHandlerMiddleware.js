import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err,req,res,next)=>{
    console.log(err)
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    // Getting the msg Variable which is either err.message or 'Something Went Wrong, Please try again later'
    const msg = err.message || 'Something Went Wrong, Please try again later';
    res.status(statusCode).json({msg});
};

export default errorHandlerMiddleware;

