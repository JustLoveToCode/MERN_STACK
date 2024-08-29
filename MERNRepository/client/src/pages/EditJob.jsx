// import the FormRow, FormRowSelect and SubmitBtn Components Here
import { FormRow, FormRowSelect, SubmitBtn } from '../components';
// import the Wrapper from DashboardFormPage
import Wrapper from '../assets/wrappers/DashboardFormPage';
// import useLoaderData from react-router-dom
import { useLoaderData } from 'react-router-dom';
// import JOB_STATUS and JOB_TYPE from the constants file
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
// import the Form, useNavigation, redirect from react-router-dom
import { Form, redirect } from 'react-router-dom';
// import the toast from react-toastify here
import { toast } from 'react-toastify';
// import the customFetch which is the Base URL
import customFetch from '../utils/customFetch';

// Create the loader function here
export const loader = async ({ params }) => {
    // Using the try and catch method here:
    try {
      // Getting the Complete URL using customFetch.get()
      const { data } = await customFetch.get(`/jobs/${params.id}`);
      // Using the return keyword to return data here
      return data;
    } catch (error) {
      // Using the toast.error here to get the error
      // Using the Optional Chaining using ? here
      toast.error(error?.response?.data?.msg);
      // redirect to the /dashboard/all-jobs URL:
      return redirect('/dashboard/all-jobs');
    }
  };


// Create the action function here
export const action = async ({ request, params }) => {
    // The await keyword will asynchronously await the result
    // of the formData() method to be executed on the request object
    // This method will retrieve the form data from the body of the HTTP Request
    // If the request is made with the Content-Type: multipart/form-data, application/x-www-form-urlencoded
    // So the formData will contain the formData submitted with the HTTP Request, Parsed
    // into the FormData Object, which you can then use to access the Individual Form Fields
    // and their Values. This is Commonly Used in the Web Applications for Processing the Form Submissions
    // Grab the formData Variable here
    const formData = await request.formData();
    // Convert the formData into the Array and store it in the data Variable
    const data = Object.fromEntries(formData);
    // Using the try and catch method here
    try {
    // Using the patch method to edit the data using the Complete URL for the 
    // patch method here with the params.id
    await customFetch.patch(`/jobs/${params.id}`, data);
    // Once it is edited successfully, you can now now the toast.success
    // which is Job edited successfully
      toast.success('Job EDITED successfully');
    // Once it is edited successfully, it will return redirect
    // to the /dashboard/all-jobs
      return redirect('/dashboard/all-jobs');

    } catch (error) {
      // Using the toast.error
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
  
  const EditJob = () => {
    // This is to Extract the Data using the useLoaderData() Component
    const { job } = useLoaderData();
    
    // navigation.state is strictly equal to submitting
    
    // This is using the useNavigation Hook from the react-router-dom
    // const navigation = useNavigation();
    // Check whether navigation.state is strictly equal to 'submitting'
    // and if navigation.state is strictly equal to 'submitting'
    // it mean isSubmitting is true, otherwise, it is false
    // const isSubmitting = navigation.state === 'submitting';
    // Using the return keyword here to return the Wrapper
    return (
      <Wrapper>
        {/* This Form method that is equal to post,
        will mean you can submit the Form when you have Edited the
        Form Successfully */}
        <Form method="post" className="form">
          {/* Adding the h4 tag */}
          <h4 className="form-title">Edit Job</h4>
          {/* Creating the div with the className called form-center */}
          <div className="form-center">
            {/* This is the job property from the useLoaderData() here 
            and there is the different various properties such as position,
            company, jobLocation, jobStatus*/}
            {/* Using the FormRow Parent Component */}
            <FormRow type='text' name='position' defaultValue={job.position} />
            {/* Using the FormRow Parent Component */}
            <FormRow type='text' name='company' defaultValue={job.company} />
            {/* Using the FormRow Parent Component */}
            <FormRow
              type='text'
              // This is the labelText for the 'job location'
              labelText="job location"
              name='jobLocation'
              defaultValue={job.jobLocation}
            />
            {/* Using the FormRowSelect Parent Component */}
            <FormRowSelect
              name='jobStatus'
              labelText='job status'
              defaultValue={job.jobStatus}
              // Converting them into an Array:
              list={Object.values(JOB_STATUS)}
            />
            {/* Using the FormRowSelect Parent Component */}
            <FormRowSelect
              name='jobType'
              labelText='job type'
              defaultValue={job.jobType}
              // Converting them into an Array:
              list={Object.values(JOB_TYPE)}
            />
            {/* This is the SubmitBtn with the props formBtn */}
            <SubmitBtn formBtn/>

            {/* Creating the button element */}
            {/* <button
              type='submit'
              className='btn btn-block form-btn'
              disabled={isSubmitting}
            > */}
              {/* Using the Ternary Conditional Operator
              if isSubmitting is true, it will be submitting..., otherwise,
              it will be false and it will show submit as the text for the button */}
              {/* {isSubmitting ? 'submitting...' : 'submit'}
            </button> */}
          </div>
        </Form>
      </Wrapper>
    );
  };
  
  export default EditJob;