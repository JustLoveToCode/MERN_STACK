import {toast} from 'react-toastify';
import {JobsContainer, SearchContainer} from '../components';
import customFetch from '../utils/customFetch';
import {useLoaderData} from 'react-router-dom';
import {useContext, createContext} from 'react';

export const loader = async({request})=>{
    // Using the try and catch method
    // The resulting will be the object in the form of the key-value Pairing:
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ])
    // This will output in the format of {key:value, key:value}
    console.log(params)

    // Using the try and catch method
    try{
        // Get the {data} using the customFetch.get('/jobs')
        const {data} = await customFetch.get('/jobs', {
            params,
        });
        return {data, searchValues:{...params}}

    }
    catch(error){
        toast.error(error?.response?.data?.msg)
        return error
    }
};

// Using the createContext() method:
const AllJobsContext = createContext();

// Creating the AllJobs Component:
const AllJobs = () =>{
    // Invoke the useLoaderData() and stored it in the {data}
    const {data, searchValues} = useLoaderData();
    return(
    <AllJobsContext.Provider value={{data, searchValues}}>
        <SearchContainer/>
        <JobsContainer/>
    </AllJobsContext.Provider>
    )
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;