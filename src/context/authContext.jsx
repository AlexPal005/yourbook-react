import {createContext, useEffect, useState} from "react";
import axios from "./../Axios.js";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user') || "[]") || null);
    const navigate = useNavigate()
    const login = async (inputs) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const res = await axios.post("/login", inputs);
            const jwtToken = res.data;
            const decodeUser = jwtDecode(jwtToken);
            console.log(decodeUser)
            setCurrentUser({...decodeUser, jwtToken: jwtToken});
        } catch (err) {
            throw err;
        }
    };

    const logOut = async () => {
        // Clear local storage, log the action, and navigate to login page
        localStorage.setItem("user", "")
        console.log("storage cleared");
        setCurrentUser(null);
        navigate('/login');
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logOut}}>
            {children}
        </AuthContext.Provider>
    )
};