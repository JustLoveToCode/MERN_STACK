import {FaUserCircle, FaCaretDown} from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import {useState} from 'react';
import {useDashboardContext} from '../pages/DashboardLayout';

const LogoutContainer = () =>{
    const [showLogout, setShowLogout] = useState(false)
    const {user, logoutUser} = useDashboardContext();

    return(
    <Wrapper>
        <button type="button" className="btn logout-btn"
        // onClick will change the setShowLogout from true to false
        // and from false to true, vice versa
        onClick={()=>setShowLogout(!showLogout)}>
        {/* Using the Ternary Conditional Operator */}
        {user.avatar ? (<img src={user.avatar} alt='avatar' className="img"/>): (<FaUserCircle/>)}
        {/* Optional Chaining for the user */}
        {user?.name}
        <FaCaretDown/>
            
        </button>
        {/* We do not display anything if it is False */}
        <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
            {/* Using the HTML button element */}
            <button type="button" className='dropdown-btn'
            onClick={logoutUser}>Logout</button>
        </div>
    </Wrapper>
    )
}

export default LogoutContainer