import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Auth/Login.jsx";
import {Registration} from "./components/Auth/Registration.jsx";
import {Header} from "./components/Header/Header.jsx";
import {Books} from "./components/Books/Books.jsx";
import {Basket} from "./components/Basket/Basket.jsx";
import {MyOrders} from "./components/MyOrders/MyOrders.jsx";

function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/" element={<Books/>}/>
                <Route path="/basket" element={<Basket/>}/>
                <Route path="/myOrders" element={<MyOrders/>}/>
            </Routes>

        </>
    )
}

export default App
