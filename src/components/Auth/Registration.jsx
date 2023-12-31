import {useEffect, useState} from "react";
import './Auth.scss';
import './../../scss/variables.scss';
import axios from "./../../Axios.js";
import {useNavigate} from "react-router-dom";

export const Registration = () => {
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        password2: ""

    });
    const [res, setRes] = useState("");
    const [checkTerms, setTerms] = useState(false);
    const [name, setName] = useState(false);
    const [surname, setSurname] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [password2Dirty, setPassword2Dirty] = useState(false);
    const [errorNickName, setErrorNickName] = useState("Ім'я не може бути пустим");
    const [errorSurname, setErrorSurname] = useState("Прізвище не може бути пустим");
    const [errorEmail, setErrorEmail] = useState("Пошта не може бути пустою");
    const [errorPassword, setErrorPassword] = useState("Пароль не може бути пустим");
    const [error2Password, setError2Password] = useState("");
    const [number, setNumber] = useState(false);
    const [errorNumber, setErrorNumber] = useState("Номер телефону не може бути пустим");

    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if (errorNickName || errorEmail || errorPassword || error2Password || errorNumber) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [errorNickName, errorEmail, errorPassword, error2Password, errorNumber])

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
        setRes("");
        switch (e.target.name) {
            case 'name':
                validateNickName(e)
                break
            case 'surname':
                validateSurname(e)
                break
            case 'number':
                validateNumber(e)
                break
            case 'email':
                validateEmail(e)
                break
            case 'password':
                validatePassword(e)
                break
            case 'password2':
                validatePassword2(e)
                break
            default:
                setRes("Помилка!")
                break
        }
    };
    const validatePassword2 = (e) => {
        if (e.target.value !== inputs.password) {
            setError2Password("Паролі не співпадають!");
        } else {
            setError2Password("");
        }
    };
    const validatePassword = (e) => {
        const regex = /(?=[#$-/:-?{-~!"^_`a-zA-Z]*([0-9#$-/:-?{-~!"^_`])){8,30}/
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorPassword('Пароль має містити хоча б 8 символів, велику літеру, маленьку літеру, цифру!');
        } else {
            setErrorPassword("");
        }
        if (e.target.value !== inputs.password2) {
            setError2Password("Паролі не співпадають!");
        } else {
            setError2Password("");
        }
    };
    const validateNickName = (e) => {
        if (!e.target.value) {
            setErrorNickName('Ім\'я не може бути пустим!');
        } else {
            setErrorNickName("");
        }
    };
    const validateNumber = (e) => {
        if (!e.target.value) {
            setErrorNumber('Номер не може бути пустим!');
        } else {
            setErrorNumber("");
        }
    };
    const validateSurname = (e) => {
        if (!e.target.value) {
            setErrorSurname('Ім\'я не може бути пустим!');
        } else {
            setErrorSurname("")
        }
    }
    const validateEmail = (e) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(e.target.value).toLowerCase())) {
            setErrorEmail('Пошта введена некоректно');
        } else {
            setErrorEmail("")
        }
    }
    const handleChangeCheck = (e) => {
        setTerms(e.target.checked)
    };
    const handleBlur = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(true);
                break
            case 'surname':
                setSurname(true);
                break
            case 'number':
                setNumber(true);
                break
            case 'email':
                setEmailDirty(true);
                break
            case 'password':
                setPasswordDirty(true);
                break
            case 'password2':
                setPassword2Dirty(true);
                break
            default:
                setRes("Помилка!");
                break
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkTerms) {
            setRes("Ви не згодні з умовами користувача!");
        } else {
            setRes("");
            try {
                const res = await axios.post("/register", inputs);
                console.log(res);
                navigate("/login")
            } catch (e) {
                setRes(e.response.data.message);
                console.log(e);
            }
        }
    };

    return (
        <div className="wrapper-center wrapper-auth">
            <form className="basic-form auth-form">
                <h1>Реєстрація</h1>
                {(name && errorNickName) && <p className="error">{errorNickName}</p>}
                <input required
                       className={(name && errorNickName) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="text"
                       placeholder="Ім'я"
                       name="name"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(surname && errorSurname) && <p className="error">{errorSurname}</p>}
                <input required
                       className={(surname && errorSurname) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="text"
                       placeholder="Прізвище"
                       name="surname"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(number && errorNumber) && <p className="error">{errorNumber}</p>}
                <input required
                       type="text"
                       className={(number && errorNumber) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="Номер телефону"
                       name="number"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(emailDirty && errorEmail) && <p className="error">{errorEmail}</p>}
                <input required
                       className={(emailDirty && errorEmail) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="email"
                       placeholder="Email"
                       name="email"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(passwordDirty && errorPassword) && <p className="error">{errorPassword}</p>}
                <input required
                       className={(passwordDirty && errorPassword) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       type="password"
                       placeholder="Пароль"
                       name="password"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                {(password2Dirty && error2Password) && <p className="error">{error2Password}</p>}
                <input required
                       type="password"
                       className={(password2Dirty && error2Password) ? ["input-color-blue", "error-input"].join(" ") : "input-color-blue"}
                       placeholder="Підтвердіть пароль" name="password2"
                       onChange={handleChange}
                       onBlur={handleBlur}
                /><br/>
                <label>
                    <input required
                           type="checkbox"
                           name="checkTerms"
                           onChange={handleChangeCheck}
                    />
                    Згоден з умовами користувача
                </label><br/>
                <button disabled={!isValid} type="submit" onClick={handleSubmit}
                        className="button-form button-register">Надіслати
                </button>
                {res && <p className="error">{res}</p>}
            </form>
        </div>
    );
}