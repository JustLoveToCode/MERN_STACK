// Import the FaAlignLeft and FaCalendarCheck from react-icons
import {FaAlignLeft, FaCalendarCheck} from 'react-icons/fa';
// Import the useLoaderData and redirect from react-router-dom
import {useLoaderData, redirect} from 'react-router-dom';
// Import the StatItem from the components
import { StatItem } from '../components';
// Using the customFetch to import the Base URL
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
// Import the toast from react-toastify
import {toast} from 'react-toastify';

// Creating the loader Component
export const loader = async()=>{
    // Using the try and catch method
    try{
        // Using the customFetch.get to get the Complete URL and Data from
        // the BackEnd DataBase Management:
        const response = await customFetch.get('/users/admin/app-stats');
        console.log(response)
        // return the data property inside the response
        return response.data;
    }
    catch(error){
        // Using the toast.error(You are not authorized)
        toast.error('You are not authorized to view this page');
        // If there is an error, redirect the user to the /dashboard page
        return redirect('/dashboard');
    }
}


// Creating the Admin Component
const Admin = () =>{
    // users and jobs are what I am sending back 
    // from the Controllers itself
    const {users, jobs} = useLoaderData();
    // Using the return keyword here
    return(
    <Wrapper>
        {/* Creating the StatItem Component Here Passing in the Variables
        which is the current users, users, color, bcg and the icon */}
        <StatItem title="current users" count={users} color="#e9b949"
        bcg="#fcefc7" icon={<FaAlignLeft/>}/>
        {/* Creating the StatItem Component Here Passing in the Variables for
        the count, color, bcg and icon*/}
        <StatItem title="total jobs" count={jobs} color="#647acb"
        bcg="#e0e8f9" icon={<FaCalendarCheck/>}/>
    </Wrapper>
    )
}

export default Admin