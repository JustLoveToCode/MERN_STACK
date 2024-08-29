// This is the CSS for the JobInfo Component
import Wrapper from '../assets/wrappers/JobInfo';


// Create the JobInfo Component
const JobInfo = ({icon, text})=>{
    return (
    // The Wrapper which has the CSS of the JobInfo
    <Wrapper>
        <span className="job-icon">{icon}</span>
        <span className="job-text">{text}</span>
    </Wrapper>
    );
};

export default JobInfo;