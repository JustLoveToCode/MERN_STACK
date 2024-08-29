import {FormRow, FormRowSelect, SubmitBtn} from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
// import the Form, useSubmit, Link from react-router-dom
import {Form, useSubmit, Link} from 'react-router-dom';
import {JOB_TYPE, JOB_STATUS, JOB_SORT_BY} from '../../../utils/constants';
import { useAllJobsContext } from '../pages/AllJobs';


const SearchContainer = () => {
    const {searchValues} = useAllJobsContext();
    const {search, jobStatus, jobType, sort} = searchValues;
    const submit = useSubmit();
    // Creating the debounce Functionality
    const debounce =(onChange)=>{
        let timeout;
        return(e)=>{
            const form = e.currentTarget.form;
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
            onChange(form);
            }, 2000);   
        };
    };

    return(
    <Wrapper>
        {/* Getting the Form Component from the react-router-dom */}
        <Form className="form">
            {/* Getting the h5 tag with the className of form-title */}
            <h5 className="form-title">Search Form</h5>
            <div className="form-center">
                {/* Creating the FormRow Parent Component with the default
                value of the alphabet a */}
                {/* Using the onChange method here */}
                {/* Persisting the Value */}
                <FormRow type='search' name='search' defaultValue={search} onChange={debounce((form)=>{
                    submit(form)
                })}
                />
                {/* Creating the FormRowSelect Parent Component,
                the list is in the format of the Array */}
                {/* Persisting the Value */}
                <FormRowSelect labelText='job status' name={jobStatus}
                list={['all', ...Object.values(JOB_STATUS)]} defaultValue='all'
                // Using the onChange Method
                onChange={(e)=>{
                submit(e.currentTarget.form)
                }}/>

                {/* Creating the FormRowSelect Parent Component,
                the list is in the format of the Array */}
                {/* Persisting the Value */}
                <FormRowSelect labelText='job type' name={jobType}
                list={['all', ...Object.values(JOB_TYPE)]} defaultValue='all'
                // Using the onChange Method
                onChange={(e)=>{
                submit(e.currentTarget.form)
                }}/>

                {/* Creating the FormRowSelect Parent Component */}
                {/* Persisting the Value */}
                <FormRowSelect name='sort' defaultValue={sort} list={
                [...Object.values(JOB_SORT_BY)]}
                // Using the onChange Method
                onChange={(e)=>{
                submit(e.currentTarget.form)
                }}/>
                {/* TEMP */}
                {/* Creating the Link Component Here */}
                <Link to='/dashboard/all-jobs' className='btn form-btn delete-btn'>
                Reset Search Values
                </Link>
                {/* Putting the SubmitBtn Component Here */}
                <SubmitBtn formBtn/>
            </div>

        </Form>
    </Wrapper>
    )
}

export default SearchContainer;