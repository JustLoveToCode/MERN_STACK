import {Link, Form, redirect, useNavigate, useActionData} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {FormRow, Logo, SubmitBtn} from '../components';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({request})=>{
    const formData = await request.formData();
    // This is the data property that is added into the
    // customFetch.post method here
    const data = Object.fromEntries(formData);
    // const errors = {msg:''}
    // if(data.password.length < 3){
    //     errors.msg = 'password too short'
    //     return errors;
    // }
    // Using the try and catch method here:
    // The data property here is what we want to post into the
    // Database Management MongoDB, this is how we refer the data property
    // The customFetch will have the Base URL here:
    // Using the try and catch method:
    try{
        await customFetch.post('/auth/login', data)
        toast.success('Login is now Successful');
        // Return and Redirect the User to the /dashboard 
        return redirect('/dashboard')
    }
    catch(error){
        // Using toast.error
        toast.error(error?.response?.data?.msg);
        // Returning the error here
        return error;  
    }
   
}

// Creating the Login Component Here
const Login = ()=>{
    // Using the useNavigate() Hook and assign it
    // to the navigate variable here
    const navigate = useNavigate();

    // Creating the loginDemoUser Component
    const loginDemoUser = async()=>{
        // Creating the test data in the Form of the Object
        const data ={
        // Creating the email and password with the 
        // email, password and the value            
            email:'test@test.com',
            password:'secret123',
        };
        // Using the try and catch method here
        // the try method will try to login
        try{
            await customFetch.post('auth/login', data);
            // Creating the toast.success here
            toast.success('Login to the Test Drive Application Successful');
            // Once login to the Test Drive Application, navigate to the '/dashboard' page
            navigate('/dashboard');
        }
        // If there is an error, it will catch an error here
        catch(error){
        // Using the Optional Chaining Method Here for the
        // toast.error here, Using the Optional Chaining Method
        toast.error(error?.response?.data?.msg);
        }
    }

    // Access to the errors object
    // const errors = useActionData();
    // const navigation = useNavigation();
    // Check whether navigation.state is strictly equal to "submitting":
    // const isSubmitting = navigation.state === "submitting";
    // This is the return keyword which is what will be return here
    return(
    <Wrapper>
        {/* Using the Form Component */}
        <Form method="post" className="form">
            <Logo/>
            <h4>Login Your Page Here</h4>
            {/* If the errors have some kind of values, display the errors.msg */}
            {/* {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>} */}
            {/* Creating the FormRow Component */}
            <FormRow type="email" name="email"/>
            {/* Creating the FormRow Component */}
            <FormRow type="password" name="password"/>
            {/* Getting the SubmitBtn Component Here */}
            <SubmitBtn/>
            {/* The onClick will invoke the loginDemoUser Component */}
            <button type='button' className='btn btn-block' onClick={loginDemoUser}>
                Explore the Demo App Option Here
            </button>
            {/* Using the button Component */}
            {/* <button type="submit" className="btn btn-block" disabled={isSubmitting}> */}
            {/* Using the Ternary Conditional Operator whether isSubmitting 
            is Strictly Equal to submitting, if this condition is true,
            it will return 'submitting', otherwise it will be false where it 
            will return submit */}
            {/* {isSubmitting?'submitting':'submit'}</button> */}
            <p>
            Not a Member Yet? Sign Up NOW
            <Link to="/register" className="member-btn">Register Here</Link>
            </p>
        </Form>
    </Wrapper>
    )
}

export default Login