import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import {useDashboardContext} from '../pages/DashboardLayout';


const ThemeToggle = () =>{
    const {isDarkTheme, toggleDarkTheme} = useDashboardContext();
    return(
    <Wrapper onClick={toggleDarkTheme}>
        {/* If isDarkTheme is true here, it will have BsFillSunFill, otherwise, it
        will have the BsFillMoonFill Icon */}
        {isDarkTheme ? (<BsFillSunFill className='toggle-icon'/>) : (<BsFillMoonFill/>)} 
    </Wrapper>
    )
}

export default ThemeToggle;