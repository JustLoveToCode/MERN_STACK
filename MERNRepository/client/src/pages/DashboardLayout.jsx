import { Outlet, redirect, useLoaderData, useNavigate} from "react-router-dom";
import Wrapper from '../assets/wrappers/Dashboard';
import {BigSidebar, Navbar, SmallSidebar} from '../components';
import {useState, createContext, useContext} from 'react';
// This is importing the customFetch and get the Base URL
import customFetch from '../utils/customFetch';
// This is importing the toast from react-toastify
import {toast} from 'react-toastify';


// Get the component here, Using the try and catch method here:
// Using the async for try and catch method here:
export const loader = async()=>{
    try{
        // This will complete the URL and store it in the {data}
        const {data} = await customFetch.get('/users/current-user')
        // If it is successful, it will return data
        return data
    }
    // If there is an error, it will redirect to the '/' page
    catch(error){
        return redirect('/');
    }
}

// Invoking the createContext() Here:
const DashboardContext = createContext();



// The isDarkThemeEnabled actually come from Prop Drilling:
const DashboardLayout = ({isDarkThemeEnabled}) =>{
    // The useLoaderData() function is being called without any arguments
    // Which suggests that it might be a hook or utility function provided 
    // by the framework or library like React or Vue
    // Get the Component even before it even render
    const {user} = useLoaderData();
    // Using the useNavigate Hook Settings here to be the Variable of navigate
    const navigate = useNavigate();
    
    // Setting the Initial state to be false:
    const [showSidebar, setShowSidebar] = useState(false)
    const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

    const toggleDarkTheme = () =>{
        // Getting the variable newDarkTheme
        // Change from true to false or false to true using the ! Ternary Conditional Operator
        const newDarkTheme = !isDarkTheme
        // Using the setIsDarkTheme State Management to CHANGE from true to false or false to true
        setIsDarkTheme(newDarkTheme)
        // This is Vanilla JavaScript:
        // I am Targeting the Entire body of the Document
        // and having the class as the dark-theme as part of the CSS classes
        // It will toggle the Presence of the class 'dark-theme' on the 
        // body element based on the value of the newDarkTheme Variable
        // if newDarkTheme is true, the class 'dark-theme' will be added
        // to the body element, if the newDarkTheme is false, the class
        // dark-theme will be removed from the body element.
        // The CSS Component will be toggled for the class dark-theme:
        document.body.classList.toggle('dark-theme', newDarkTheme)
        // This is to Persist the true or false in the Session Settings
        // into the localStorage by using the set Method:
        localStorage.setItem('darkTheme', newDarkTheme);
      
    }
    
    // Toggling the SideBar Functionality 
    // to Hide or Show Them by Changing the State here:
    // Change from true to false or false to true
    // Ternary Conditional Operator:
    const toggleSidebar = () =>{
        setShowSidebar(!showSidebar)
    }
    
    // Creating the logoutUser
    const logoutUser = async() =>{
        // Using the useNavigate Hook here to navigate to the '/' Route
        // Navigate Back to the HomePage Here
        navigate('/');
        // Make a request to the Logout Route
        await customFetch.get('/auth/logout');
        // It will display a toast success that the User is Successfully Logged Out
        toast.success('User has Successfully Logged Out Here');
    }

    return(
    // Using DashboardContext.Provider Method:
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,toggleDarkTheme,
    toggleSidebar, logoutUser}}>
    <Wrapper>
        <main className="dashboard">
                    <SmallSidebar/>
                {/* BigSidebar is Hidden by Default CSS here */}
                    <BigSidebar/>
                <div>
                    {/* Creating the Navbar Component */}
                    <Navbar/>
                <div className="dashboard-page">
                    {/* The Child Route inside DashboardLayout will be Rendered
                    as the DashboardLayout is the Parent Here */}
                    <Outlet context={{user}}/>
                </div>
                </div>
        </main>
    </Wrapper>
    </DashboardContext.Provider>
    )
}

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout