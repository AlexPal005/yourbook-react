import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Auth/Login.jsx";
import {Registration} from "./components/Auth/Registration.jsx";
import {Header} from "./components/Header/Header.jsx";
import {Books} from "./components/Books/Books.jsx";
import {Basket} from "./components/Basket/Basket.jsx";
import {MyOrders} from "./components/MyOrders/MyOrders.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/authContext.jsx";
import axios from "./Axios.js";
import {AdminPage} from "./components/AdminPage/AdminPage.jsx";

function App() {
    const [user, setUser] = useState({})
    const currUser = useContext(AuthContext)
    useEffect(() => {
        if (currUser?.currentUser?.userId) {
            axios.get(`/user/${currUser.currentUser.userId}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [currUser])
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/" element={<Books/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/myOrders" element={<MyOrders/>}/>
                {
                    user.role === "USER" &&
                    <>
                        <Route path="/adminPage" element={<AdminPage/>}/>
                        <Route path="/adminPage/*" element={<AdminPage/>}/>
                    </>
                }
            </Routes>

        </>
    )
}

export default App
