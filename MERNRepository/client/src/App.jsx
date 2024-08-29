import React from 'react'
// Import from react-router-dom Library
import {createBrowserRouter, RouterProvider} from 'react-router-dom';


import {HomeLayout, Landing, Register, Login, DashboardLayout, AddJob, Stats, Profile,
Error,AllJobs,Admin, EditJob} from './pages';

import {loader as dashboardLoader} from './pages/DashboardLayout';
// Using the Alias action as register:
import {action as register} from './pages/Register';
// Using the Alias action as login:
import {action as login} from './pages/Login';
// Using the Alias action as addJobAction:
import {action as addJobAction} from './pages/AddJob';
import {loader as allJobsLoader} from './pages/AllJobs';
// Using the alias editJobLoader as loader
import {loader as editJobLoader} from './pages/EditJob';
// Using the alias editJobAction which is the action:
import {action as editJobAction} from './pages/EditJob';
// Using the alias deleteJobAction which is the action:
import {action as deleteJobAction} from './pages/DeleteJob';
// Import the loader and give it a named import
// In this case, it is called a adminLoader
import {loader as adminLoader} from './pages/Admin';
// Import the action and give it a named import
// In this case, it is called profileAction
import {action as profileAction} from './pages/Profile';
import {loader as statsLoader} from './pages/Stats';



// The Dark Theme will be set for all of the Pages
// rather than just for 1 Single Page:
const checkDefaultTheme = () =>{
  // Using the getItem to get the darkTheme key and check
  // whether it is strictly equal to true
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme
}

// Invoke the checkDefaultTheme Here and setting it
// to the Variable isDarkThemeEnabled Here:
const isDarkThemeEnabled = checkDefaultTheme()

//  Using the createBrowserRouter
const router = createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement: <Error/>,
    // This is the children elements
    children:[
      {
        // This is the Page that will be displayed by Default
        // which is the element of Landing Component:
        // That is why it has index:true
        index:true,
        element:<Landing/>,
      },
      // Creating the path which is called register
      {
        path:'register',
        element:<Register/>,
        action: register
      },
      // Creating the path which is called login
      {
        path:'login',
        element:<Login/>,
        action: login
      },
      // Creating the path which is called dashboard
      // which will give you the DashboardLayout Component
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled}/>,
        loader: dashboardLoader,
        // This is the children elements
        children:[
          // This is the Default Page that will be Displayed
          {index:true, element:<AddJob/> , action:addJobAction},
          // This is the Page that will be displayed when it is /dashboard/stats
          // The loader would be the statsLoader
          {path:'stats', element:<Stats/>, loader:statsLoader},
          // This is the Page that will be displayed when it is /dashboard/all-jobs
          {path:'all-jobs', element:<AllJobs/>, loader:allJobsLoader},
          // This is the Page that will be displayed when it is /dashboard/profile
          {path:'profile', element:<Profile/>, action:profileAction},
          // This is the Page that will be displayed when it is /dashboard/admin
          {path:'admin', element:<Admin/>, loader:adminLoader},
          // This is the Page that will be displayed when it is /dashboard/edit-job/:id
          // This use the action of editJobAction to Edit the Job
          {path: 'edit-job/:id', element:<EditJob/>, loader:editJobLoader,
           action:editJobAction
          },
          // This is the Page that will be displayed when it is /dashboard/delete-job/:id
          // This use the action:deleteJobAction to Handle the Job Deletion
          {path:'delete-job/:id', action:deleteJobAction}
        ],
      },
    ],
  },
])

// Creating the App Component
const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;

