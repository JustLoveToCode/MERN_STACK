import Wrapper from '../assets/wrappers/Navbar';
// Import the React Icons
import {FaAlignLeft} from 'react-icons/fa';
import Logo from './Logo';
import {useDashboardContext} from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

const Navbar = () =>{
    const {toggleSidebar} = useDashboardContext()
    return(
    <Wrapper>
        <div className="nav-center">
                {/* This is on the Left of the Screen */}
                <button type="button" className="toggle-btn" onClick={toggleSidebar}>
                    <FaAlignLeft/>
                </button>
            <div>
                {/* This will be on the Center of the Screen */}
                {/* On the Big Screen, the Dashboard will be Shown */}
                <Logo/>
                <h4 className="logo-text">Dashboard</h4>
            </div>
                {/* This will be on the Right Side of the Screen */}
                <div className="btn-container">
                    <ThemeToggle/>
                    <LogoutContainer/>
                </div>
        </div>
    </Wrapper>
    )
}

export default Navbar;