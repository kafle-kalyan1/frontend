import { Link } from "react-router-dom";    
function Navlinks({ulClassName, liClassName}){

    return(
        <>
       <ul className={ulClassName}>
        <li className={liClassName}><Link to={'/'} >Home</Link></li>
        <li className={liClassName}><Link to={'/events'} >Events</Link></li>
        <li className={liClassName}><Link >Organizers</Link></li>
        <li className={liClassName}><Link >Support Us</Link></li>
       </ul>
       </>
    )
}
export default Navlinks;