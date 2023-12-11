import './Header.scss'
import './../../scss/variables.scss'
import {FaRegUserCircle, FaShoppingBasket} from "react-icons/fa";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/authContext.jsx";

export const Header = () => {
    const {currentUser, logOut} = useContext(AuthContext);
    useEffect(() => {
        console.log(currentUser)
    }, [currentUser]);
    const exitHandler = () => {
        logOut()
    }
    return (
        <header>
            <div className="logo">
                <a href="/">YourBook</a>
                <a href="/">Каталог</a>
            </div>
            {
                !currentUser ?
                    <div className="auth-header">
                        <FaShoppingBasket className="user-icon"/>
                        <a href="/login">Увійти</a>
                        <a href="/registration">Реєстрація</a>
                    </div> :
                    <div className="auth-header exit-block">
                        <FaShoppingBasket className="user-icon"/>
                        <span className="count-of-books">0</span>
                        <FaRegUserCircle className="user-icon"/>
                        <span onClick={exitHandler}>Вийти</span>
                    </div>

            }
        </header>
    )
}