import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);



const Job = ({
    _id,
    position,
    company,
    jobLocation,
    jobType,
    createdAt,
    jobStatus,
  }) => {
    // Format the date according to the Format Below:
    const date = day(createdAt).format('MMM Do, YYYY');
  
    return (
      <Wrapper>
        <header>
            {/* This is how the Card Component look like */}
          <div className='main-icon'>{company.charAt(0)}</div>
          <div className='info'>
            {/* This is the h5 Tag with position */}
            <h5>{position}</h5>
            {/* This is the p Tag with company  */}
            <p>{company}</p>
          </div>
        </header>
        <div className='content'>
          <div className='content-center'>
            {/* This will allowed the JobInfo properties
            to be passed down to the children props using the prop drilling method
            and the props to be passed down is the icon and the text props */}
            {/* 3 Instances of the JobInfo Component */}
            <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
            <JobInfo icon={<FaCalendarAlt />} text={date} />
            <JobInfo icon={<FaBriefcase />} text={jobType} />
            {/* This will change the Style of the Component Dynamically using the
            status ${jobStatus}, if it is PENDING, it is 1 CSS, if it is INTERVIEW,
            it is another CSS, if it is DECLINED, it is another CSS  */}
            <div className={`status ${jobStatus}`}>{jobStatus}</div>
          </div>
  
          <footer className='actions'>
            {/* This is the Link back to the Edit Page based on the ${_id} */}
            {/* Each job has that property of  */}
            <Link to={`/dashboard/edit-job/${_id}`} className='btn edit-btn'>Edit</Link>
            {/* Need to pass in the URL Params which is the ${_id}*/}
            <Form method="post" action={`../delete-job/${_id}`}>
            {/* This is the button element that is created for the Delete Button */}
              <button type='submit' className='btn delete-btn'>
                Delete
              </button>
            </Form>
          </footer>

        </div>
      </Wrapper>
    );
  };

  export default Job;