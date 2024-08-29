import { useDashboardContext } from "../pages/DashboardLayout";
// This is the links from the links file
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({isBigSidebar}) =>{
    const {toggleSidebar, user} = useDashboardContext()
    return(
        <div className="nav-links">
        {/* Using the Map Method to Iterate through the Arrays of links */}
        {links.map((link)=>{
            // Object Destructuring Properties to EXTRACT the Individual Property
            // within the link property
            const {text,path,icon} = link
            // Object Destructuring to get the role here within the user Property
            const {role} = user
            // If this criteria of path==='admin' and role !=='admin'
            // Do not return the NavLink, it mean that the user who is not
            // an admin will not see the Admin Link, and it will continue with
            // the next instruction
            if(path==='admin' && role !== 'admin') return;

            // This NavLink is from the React Router DOM:
            // Return the NavLink Component
            return <NavLink to={path} key={text}
            className="nav-link" onClick={isBigSidebar ? null : toggleSidebar} end>
                <span className="icon">
                    {icon}
                </span>
                    {text}
            </NavLink>
        })}
    </div>
    )
}

export default NavLinks