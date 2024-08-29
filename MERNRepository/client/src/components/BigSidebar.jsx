import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from './NavLinks';
import Logo from './Logo';
import {useDashboardContext} from '../pages/DashboardLayout';

const BigSidebar = () =>{
    const {showSidebar} = useDashboardContext()

    return(
    <Wrapper>
        {/* Using the Ternary Conditional Operator, 
        If showSidebar is true, it will have sidebar-container show-sidebar,
        if it is false, it will only have sidebar-container */}
        <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>

            <div className="content">
            <header>
            <Logo/>
            </header>
            <NavLinks isBigSidebar/>
            </div>  
        </div>
    </Wrapper>
    )
}

export default BigSidebar;