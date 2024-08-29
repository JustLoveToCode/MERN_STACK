import {Link, useRouteError} from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () =>{
    // Invoking the useRouteError from the React Router DOM:
    const error = useRouteError();
    // If the Error Status is Strictly Equal to 404:
    if(error.status === 404){
        return(
        <Wrapper>
            <div>
            <img src={img} alt="not found"/>
            <h3>Oh! Page is Not Found</h3>
            <p>We cannot seem to find the page you are looking for</p>
            <Link to="/dashboard">Back to HomePage</Link>
            </div>
        </Wrapper>
        )
    }
}

export default Error;