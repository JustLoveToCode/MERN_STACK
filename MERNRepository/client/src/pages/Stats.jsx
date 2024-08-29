import {ChartsContainer, StatsContainer} from '../components';
import customFetch from '../utils/customFetch';
import {useLoaderData} from 'react-router-dom';

// This is the loader that will be exported
export const loader = async()=>{
    try{
        const response = await customFetch.get('/jobs/stats');
        return response.data
    }
    catch(error){
        return error;

    }

}
const Stats = ()=>{
    // Object Destructuring from the useLoaderData()
    const {defaultStats, monthlyApplications} = useLoaderData()
    return(
    <>
    <StatsContainer defaultStats={defaultStats}/>
    {
        // Checking if the length of the monthlyApplications is more than 1
        // If it is, show the ChartsContainer
        monthlyApplications?.length>1 && (<ChartsContainer data={monthlyApplications}/>)
    }
    </>
    )
}

export default Stats