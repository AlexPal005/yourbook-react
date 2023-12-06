import './App.css'
import {Route, Routes} from "react-router-dom";
import {Login} from "./Auth/Login.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>

        </>
    )
}

export default App
