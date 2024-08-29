import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";
import {FaTimes} from 'react-icons/fa';
import Logo from './Logo';
import NavLinks from './NavLinks';


const SmallSidebar = () =>{
    // Getting the showSidebar and toggleSidebar from the useDashboardContext
    const {showSidebar, toggleSidebar} = useDashboardContext();

    return(
    <Wrapper>
        {/* Using the Ternary Conditional Operator to change the State
        from the True to False and Vice Versa for the CSS Style,
        if it is true, the CSS would be sidebar-container show-sidebar,
        if it is false, it will just be sidebar-container*/}
        <div className={showSidebar? 'sidebar-container show-sidebar':'sidebar-container'}>
            <div className="content">
                {/* Creating the Close Button */}
                <button type="button" className="close-btn" onClick={toggleSidebar}>
                    <FaTimes/>
                </button>
                <header><Logo/></header>
                <NavLinks/>
               
            </div>

        </div>
    </Wrapper>
    )
}

export default SmallSidebar