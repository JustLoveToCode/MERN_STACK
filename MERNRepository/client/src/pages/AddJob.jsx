// Get the FormRow, FormRowSelect and SubmitBtn from the Components
import {FormRow, FormRowSelect, SubmitBtn} from '../components';
// Import the Wrapper from the DashboardFormPage 
import Wrapper from '../assets/wrappers/DashboardFormPage';
// Using the useOutletContext from react-router-dom
import {useOutletContext} from 'react-router-dom';
import {JOB_STATUS, JOB_TYPE} from '../../../utils/constants';
// Import from react-router-dom
import {Form, useNavigation, redirect} from 'react-router-dom';
// Import the toast from react-toastify
import {toast} from 'react-toastify';
// Import the Base URL
import customFetch from '../utils/customFetch';



// Creating the action method to actually know where to go after the request
export const action = async({request})=>{
    // It specifically mean that you are expecting the Data to
    // be submitted in the FormData Format. FormData is an Object
    // that allowed you to easily construct the set of the key/value Pairing
    // representing the Form Fields and their Values, similar to what you
    // would see in the HTML form
    // request.formData() is typically used in the Context of making
    // the HTTP requests, particularly in the Fetch API or Libraries like Axios
    // When you make the HTTP Request, you often send the data along with the request
    // this data can be in the Different Format such as JSON, FormData, or Plain Text
    // const formData = await request.formData()
    // What the formData() do internally:
    // const username = formData.get('username')
    // const profilePicture = formData.get('profilePicture')
    const formData = await request.formData();
    // Converting it into the Lists into the Array
    const data = Object.fromEntries(formData)
    // Using the try and catch method here
    try{
        // Creating the Post Request Here using the Complete URL
        // the data is the input values, This is the URL to post the Data
        // for the jobs
        await customFetch.post('/jobs', data)
        // Using toast.success
        toast.success("Job Added Successfully");
        // redirect is from the React Router DOM
        return redirect('all-jobs');
        // Once the job is posted in the customFetch.post('/jobs', data)
        // It will display the toast.success("Job Added Successfully")
        // It will return redirect('all-jobs')
    }
    catch(error){
        // Using toast.error and Optional Chaining
        toast.error(error?.response?.data?.msg);
        return error;
    }  
}

// Creating the AddJob Component
const AddJob = () =>{
    // Using the Outlet context = {user}
    // It will provide the user value which is in the Outlet context = {{user}}/>
    // Use the context prop and provide the outlet it will be good
    const {user} = useOutletContext();
    // console.log out the user

    // Allowed the Components to access the Navigation Objects
    // which provide the Functionality to navigate between the Screen
    // const navigation = useNavigation();

    // If the navigation.state is strictly equal to "submitting":
    // the isSubmitting Variable will be true
    // const isSubmitting=navigation.state === "submitting";
    return(
    <Wrapper>
            <Form method="post" className="form">
                {/* Creating the h4 tags */}
                <h4 className="form-title">Adding the Job Here</h4>
                {/* Having the div of form-center */}
                <div className="form-center">
                    {/* Using the FormRow Component */}
                    {/* The Different FormRow Component */}
                    <FormRow type="text" name='position'/>
                    {/* Using the FormRow Component */}
                    <FormRow type="text" name='company'/>
                    {/* Using the FormRow Component */}
                    <FormRow type="text" labelText='job location'
                    // Using the user location using user.location
                    name='jobLocation' defaultValue={user.location}/>


                    {/* Using the FormRowSelect Component */}
                    {/* The name must be of the Exact Match which is jobStatus */}
                    {/* This is the FormRowSelect Component */}
                    {/* defaultValue is JOB_STATUS.PENDING */}
                    <FormRowSelect labelText="job status" name="jobStatus" defaultValue={JOB_STATUS.PENDING}
                    // Convert this into the Array using Object.values(JOB_STATUS)
                    list={Object.values(JOB_STATUS)}/>
                    {/* Using the FormRowSelect Component */}
                    {/* The name must be of the Exact Match which is jobType */}
                    {/* This is the FormRowSelect Component */}
                    {/* This is the FormRowSelect Component that we have created before individually */}
                    {/* This is the defaultValue for JOB_TYPE.FULL_TIME */}
                    <FormRowSelect labelText="job type" name="jobType" defaultValue={JOB_TYPE.FULL_TIME}
                    // The list is in the format of the Array
                    list={Object.values(JOB_TYPE)}/>
                    {/* Using the SubmitBtn Component */}
                    {/* formBtn is actually a Boolean of either true or false */}
                    <SubmitBtn formBtn/>
                    {/* The button is of the type submit */}
                </div>
                {/* Having the div of form-center */}
            </Form>
    </Wrapper>
    )
}

export default AddJob