// Import the express-async-errors module
import 'express-async-errors';

// Import the dotenv module
import * as dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Import the Express Module
import express from 'express';

// Invoking the Express module
const app = express();

// Importing the morgan module
import morgan from 'morgan';

// Routers
import jobRouter from './routes/jobRouter.js';

// Routers
import authRouter from './routes/authRouter.js';

// Routers
import userRouter from './routes/userRouter.js';



//public folder
// dirname will return the path to the directory:
// excluding the final file path:
import {dirname} from 'path';
// This will convert it into C:\path\to\file filepath:
import {fileURLToPath} from 'url';
import path from 'path';


// Importing the mongoose model:
import mongoose from 'mongoose';

// Import the Cookie Parser:
import cookieParser from 'cookie-parser';

// Import the cloudinary from cloudinary:
import cloudinary from 'cloudinary';


// import {validateTest} from './middleware/validationMiddleware.js';

// Import the Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

// Import authenticateUser here using the Named Exports
import {authenticateUser} from './middleware/authMiddleware.js';





// Using the cloudinary.config() here to setup the
// cloud_name, api_key and api_secret here
// Get the env variable from process.env.
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});


const __dirname = dirname(fileURLToPath(import.meta.url));




// Using the try and catch method
// try{
    // Using the fetch method to fetch the data from the API
    // const response = await fetch('https://www.course-api.com/react-useReducer-cart-project');
    // Converting the response to JSON format
//     const cartData = await response.json();
//     console.log(cartData);
// } catch(error){
//     console.log(error);
//     process.exit(1);
// }


// Check the NODE_ENV which is strictly equal to === 'development':
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
// C:\Users\GuestUser\Desktop\Jobify\server.js
// This _dirname will give you the path to Jobify
// and then you will use the path.resolve to combine with the
// public folder here
// If App.js is located in the /Jobify Folder Directory
// the __dirname would be /Jobify itself
// When you call the path.resolve(__dirname, 'public')
// It will resolve to /project/public
// This is the Absolute Path to the public directory
// In your Express.Js Setup, path.resolve(__dirname, 'public')
// create an Absolute Path to the 'public' Directory
// based on the Location of the App.Js File.
// This ensure that the Express.Js can find and serve
// Static Files from the Correct Directory, Providing
// a reliable and straightforward Path
app.use(express.static(path.resolve(__dirname, './client/dist')));

// Parse cookies sent by client in their requests:
// Have access to the req object, res object and the next middleware functions
// in the application request-response cycle
// The cookieParser() function, when it is used as a middleware, parses the cookie
// attached to the client request object(req.cookies), it extract the cookies data
// parses it and add to the req.cookies object so that you can easily access it
// in your Routes or Subsequent Middleware
app.use(cookieParser());

// Parse the JSON payload and exposed it on the req.body here:
app.use(express.json());


// Using the Get Method:
app.get('/', (req,res)=>{
    res.send('Hello World');
});

// Using the Post Method:
// req is the Actual Data that we are Sending
// in the req.body here: Creating the Post Request:
// We have access to the req and res as the Paramter:
// app.post('/api/v1/test',
//     validateTest,
//     (req,res)=>{
//     console.log(req);
//     res.json({message:'Data Received', data:req.body});
// })

app.get('/api/v1/test',(req,res)=>{
    res.json({msg:'Testing the Route Application'})
});

// Creating the GET Method to GET all the Jobs:
app.get('/api/v1/jobs', )

// Create the Jobs using the Post Method:
app.post('/api/v1/jobs',)

// Get the Single Job:
app.get('/api/v1/jobs/:id', )

//  Using the Patch Method to Update the Job based on the Specific id:
app.patch('/api/v1/jobs/:id', )

// Delete Job to Delete the Job based on the Specific id:
app.delete('/api/v1/jobs/:id', )



// Creating 2 Different Routes:
// Protect the Route using authenticateUser in front of the jobRouter
app.use('/api/v1/jobs', authenticateUser, jobRouter);

// Protect the Route using authenticateUser in front of the userRouter
app.use('/api/v1/users', authenticateUser, userRouter);

app.use('/api/v1/auth', authRouter);

// res.sendFile is the method that is used to send
// the file as the response to the Client
// __dirname will basically give you the Current Directory that you are in
// ./public will bring you to the public Directory
// index.html will actually serve the index.html file as the FrontEnd
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/dist', 'index.html'))
});

// It has to be after all the routes has been Created
// The WildCard * is meant to catch any Routes that do not matched
// any of the Above Routes, Hence, it will need to be place at the Very End of the Code Block:
// Using the WildCard * here
app.use('*',(req,res)=>{
    res.status(404).json({msg:'Not Found'})
})

// Using the errorHandlerMiddleware
app.use(errorHandlerMiddleware);

// Access the PORT variable in .env File using the process.env.PORT 
// where the PORT is the Variable itself or 5100:
const port = process.env.PORT || 5100

// Using the try and catch method is trying to connect to the Mongoose Library:
try{
// This line attempt to connect to the MongoDB DataBase Management
// using the mongoose.connect() method, it is using the value of MONGO_URL
// from the Environment Variables which is inside the .env file
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, ()=>{
        console.log(`Server is running on ${port}...`)
    });

} catch(error){
// This will console.log out the error
    console.log(error)
// process.exit(1) will exit the NodeJs Processes with the Exit Code of 1
// Indicating an error
    process.exit(1)
}

