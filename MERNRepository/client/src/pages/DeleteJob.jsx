// import the customFetch which is the Base URL
import customFetch from '../utils/customFetch';
// import the toast from react-toastify
import {toast} from 'react-toastify';
// import the redirect from react-router-dom
import {redirect} from 'react-router-dom';


export const action = async({params})=>{
    // Using the try and catch method
    try{
    // Getting the Complete Delete Job Params
    await customFetch.delete(`/jobs/${params.id}`);

    // Using the toast success
    toast.success('Job Deleted Successfully')

    }
    catch(error){
    // Using the toast error   
    toast.error(error?.response?.data?.msg)

    }
    // Using the redirect from the React Router DOM
    return redirect('/dashboard/all-jobs');
};

