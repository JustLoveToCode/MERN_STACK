import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {FormRow, Logo, SubmitBtn} from '../components';
import {Form, redirect, useNavigation, Link} from 'react-router-dom';

// This customFetch will have the Base URL here
import customFetch from '../utils/customFetch';

// Import the toast from react-toastify
import {toast} from 'react-toastify';

// Creating the action Component here
export const action = async ({request}) =>{
    // Using the await keyword to grab the Form Data
    const formData = await request.formData();
    // Turn Array of Array into Object:
    const data = Object.fromEntries(formData)

    //  Using the try and catch method here
    // Using the try method to use this method
    try{
        // Using the customFetch Functionality which has the Base URL
        await customFetch.post('/auth/register', data);
        // Creating the toast.success('Registration Successful')
        toast.success('Registration Successful');
        // Using the redirect method to redirect the User away
        // to the login page: Getting the url /login
        return redirect('/login');
    }
    // Using the catch method to catch the error
    catch(error){
        // Creating the toast.error here
        toast.error(error?.response?.data?.msg);
        return error 
    }
}



// Creating the Register Component
const Register=()=>{
    // Invoking the Hook for useNavigation()
    // const navigation = useNavigation()
    
    // const isSubmitting = navigation.state === 'submitting'
    return(
    <Wrapper>
        {/* Telling React Router it is a Post Request */}
        <Form method="post" className="form">
            <Logo/>
            {/* Creating the h4 Tag using the text REGISTER here*/}
            <h4>REGISTER here</h4>
            {/* Creating the FormRow Parent Component */}
            <FormRow type="text" name="name" />
            {/* Creating the FormRow Parent Component */}
            <FormRow type="text" name="lastName" labelText="Last Name"/>
            {/* Creating the FormRow Parent Component */}
            <FormRow type="text" name="location"/>
            {/* Creating the FormRow Parent Component */}
            <FormRow type="text" name="email" />
            {/* Creating the FormRow Parent Component */}
            <FormRow type="password" name="password" />
            {/* Creating the SubmitBtn Component Here after importing
            them from the /components folder */}
            <SubmitBtn/>
            {/* if isSubmitting is true in this case where navigation.state === 'submitting' */}
            {/* <button type="submit" className="btn btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...': 'Submit'}
            </button> */}
            <p>Already a Member? <Link to="/login" className="member-btn">Login Here</Link></p>
        </Form>
    </Wrapper>
    )
}

export default Register