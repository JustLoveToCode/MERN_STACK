import Job from '../components/Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
// Import the PageBtnContainer from './PageBtnContainer';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = ()=>{
    const {data}= useAllJobsContext();
    // Object Destructuring for the jobs, totalJobs, numOfPages
    // within the data Variable itself
    const {jobs, totalJobs, numOfPages} = data

    // If the jobs.length is strictly equal to 0
    if(jobs.length === 0){
        return (
        // This is the Wrapper imported from the JobsContainer here:
        <Wrapper>
            <h2>No Jobs to Display Here...</h2>
        </Wrapper>
        );
    }
    return(
        // This is the Wrapper Component with the CSS Classes imported from the JobsContainer here:
        <Wrapper>
            <h5>{totalJobs} Job{jobs.length >1 && 's'} found</h5>
            <div className="jobs">
                {/* Using the map method to ITERATE over through the job Array*/}
                {jobs.map((job)=>{
                    // Using the map method must have the key properties
                    // Using the ...job to spread out all the properties
                    // When using the map method, have to provide the Unique key
                    return <Job key={job._id} {...job}/>
                })}

            </div>
            {numOfPages > 1 && <PageBtnContainer/>}
        </Wrapper>
    )
}

export default JobsContainer;