import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Auth.scss';
import './../../scss/variables.scss';
import {AuthContext} from "../../context/authContext.jsx";

export const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [res, setRes] = useState(null);
    const [nickNameDirty, setNickNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [errorNickName, setErrorNickName] = useState("Нікнейм не може бути пустим");
    const [errorPassword, setErrorPassword] = useState("Пароль не може бути пустим");
    const [isValid, setIsValid] = useState(false);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (errorNickName || errorPassword) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
        console.log(inputs)
    }, [errorNickName, errorPassword]);

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
        setRes("");
        switch (e.target.name) {
            case 'email':
                if (e.target.value.length !== 0) {
                    setErrorNickName("");
                } else {
                    setErrorNickName("Нікнейм не може бути пустим");
                }
                break;
            case 'password':
                if (e.target.value.length !== 0) {
                    setErrorPassword("");
                } else {
                    setErrorPassword("Пароль не може бути пустим");
                }
                break;
            default:
                setRes("Помилка!");
                break;
        }
    };
    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'email':
                setNickNameDirty(true);
                break;
            case 'password':
                setPasswordDirty(true);
                break;
            default:
                setRes("Помилка!");
                break;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setRes("")
        try {
            await login(inputs)
            navigate("/")
        } catch (err) {
            setRes(err.response.data);
        }
    };
    return (
        <div className="wrapper-center wrapper-auth">
            <form className="basic-form auth-form">
                <h1>Увійти</h1>
                {(nickNameDirty && errorNickName) && <p className="error">{errorNickName}</p>}
                <input type="text"
                       className={(nickNameDirty && errorNickName) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="email" name="email" onChange={handleChange} onBlur={handleBlur}/><br/>
                {(passwordDirty && errorPassword) && <p className="error">{errorPassword}</p>}
                <input type="password"
                       className={(passwordDirty && errorPassword) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="Пароль" name="password" onChange={handleChange} onBlur={handleBlur}/><br/>
                {res && <p className="error">{res}</p>}
                <button disabled={!isValid} type="submit" onClick={handleSubmit} className="button-form">Увійти</button>
            </form>
        </div>
    )
}
