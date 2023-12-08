import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Auth/Login.jsx";
import {Registration} from "./components/Auth/Registration.jsx";
import {Header} from "./components/Header/Header.jsx";

function App() {

    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
            </Routes>

        </>
    )
}

export default App
