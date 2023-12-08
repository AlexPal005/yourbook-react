import './Header.scss'
import './../../scss/variables.scss'
import {FaRegUserCircle} from "react-icons/fa";
export const Header = () => {
    return(
        <header>
            <h2>YourBook</h2>
            <FaRegUserCircle className="user-icon"/>
        </header>
    )
}