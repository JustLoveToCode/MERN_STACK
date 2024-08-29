import {FormRow, SubmitBtn} from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import {useOutletContext} from 'react-router-dom';
// import the Form from react-router-dom
import {Form} from 'react-router-dom'
// import the customFetch which is the Base URL
import customFetch from '../utils/customFetch';
// Import the toast from react-toastify
import {toast} from 'react-toastify';

// Access the request
export const action = async({request})=>{
    // Invoke the formData() from the request:
    const formData = await request.formData();
    // Using the get method here for the formData():
    const file = formData.get('avatar');
    // Using the if statement
    // For the File Existence and the File Size
    // Checking the File Size Condition here
    // If the file exist, check that the size is bigger than 0.5MB
    if(file && file.size > 500000){
    // Using the toast.error here
        toast.error('Image Size is TOO LARGE');
    // Return null
        return null;
    }
    // Using the try and catch method here
    try{
        //{{URL}}/users/update-user to update the details using the patch method
        await customFetch.patch('/users/update-user', formData);
        // Using toast.success here
        toast.success('Profile UPDATED Successfully');
    }
    catch{
        // Using toast.error here
        toast.error(error?.response?.data?.msg);
    }
    return null;
    
};

// Creating the Profile Component
const Profile = () =>{
    // Getting the user using useOutletContext()
    // Passing it down from the DashboardLayout Page
    const {user} = useOutletContext();
    // Using Object Destructuring to get the 
    // Different Properties from the user here using Object Destructuring Method
    const {name, lastName, email, location} = user
    // In React, useNavigation() is a Custom Hook
    // created to manage navigation within the React Application
    // Navigation refer to the Process of moving between Different Screens
    // or pages within the Single Page Application.
    // const navigation = useNavigation();
    // If the navigation.state is Strictly Equal to 'submitting':
    // const isSubmitting = navigation.state === 'submitting';

    return(
    <Wrapper>
        {/* Using the encType which is multipart/form-data */}
        {/* Since we are sending the file to the Server, we need
        the encType */}
        <Form method="post" className="form" encType="multipart/form-data">
            <h4 className="form-title">
                Profile
            </h4>
            {/* This is the div with the className of form-center */}
            <div className="form-center">
                {/* This is the div with the className form-row */}
                <div className="form-row">
                    {/* The label htmlFor="avatar" must be equal to the id
                    which is also called the "avatar" */}
                    <label htmlFor="avatar" className="form-label">
                        Select an Image File (Max 0.5 MB)
                    </label>
                    {/* This is the input type HTML element */}
                    {/* When type is equal to file, the person is able to 
                    upload the file */}
                    <input type="file" id="avatar" name="avatar" className="form-input"
                    // Only accept the image file
                    accept="image/*" />

                </div>
                {/* File Input */}
                {/* name is the key value that is sent to the Server
                as identification for the data that is sent */}
                {/* This is the FormRow Parent Component by itself, the type is text */}
                {/* name is the Key Value Pairing */}
                <FormRow type="text" name="name" defaultValue={name}/>
                {/* This is the FormRow Parent Component by itself, the type is text */}
                <FormRow type="text" name="lastName" defaultValue={lastName} labelText="last name"/>
                {/* This is the FormRow Parent Component by itself, the text is email */}
                <FormRow type="email" name="email" defaultValue={email}/>
                {/* This is the FormRow Parent Component by itself, the type is text*/}
                <FormRow type="text" name="location" defaultValue={location}/>
                {/* Using the button HTML element */}
                {/* Using the SubmitBtn Component that is created
                in the components file in the SubmitBtn.jsx */}
                {/* The formBtn is passed down from the SubmitBtn */}
                <SubmitBtn formBtn/>
            </div>
        </Form>
    </Wrapper>
    )
}
export default Profile