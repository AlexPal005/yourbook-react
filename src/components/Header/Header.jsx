import './Header.scss'
import './../../scss/variables.scss'
import {FaRegUserCircle, FaShoppingBasket} from "react-icons/fa";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const {currentUser, logOut} = useContext(AuthContext)
    const exitHandler = () => {
        logOut()
    }
    const navigate = useNavigate()
    return (
        <header>
            <div className="logo">
                <a href="/">YourBook</a>
                <a href="/">Каталог</a>
            </div>
            {
                !currentUser ?
                    <div className="auth-header">
                        <FaShoppingBasket className="user-icon" onClick={() => {
                            navigate("/basket")
                        }}/>
                        <span className="count-of-books">{(JSON.parse(localStorage.getItem("basket")))?.length ?
                            (JSON.parse(localStorage.getItem("basket"))).length : 0}</span>
                        <a href="/login">Увійти</a>
                        <a href="/registration">Реєстрація</a>
                    </div> :
                    <div className="auth-header exit-block">
                        <FaShoppingBasket className="user-icon" onClick={() => {
                            navigate("/basket")
                        }}/>
                        <span className="count-of-books">
                            {(JSON.parse(localStorage.getItem("basket")))?.length ?
                                (JSON.parse(localStorage.getItem("basket"))).length : 0}
                        </span>
                        <FaRegUserCircle className="user-icon" onClick={()=>{navigate("/myOrders")}}/>
                        <span onClick={exitHandler}>Вийти</span>
                    </div>

            }
        </header>
    )
}