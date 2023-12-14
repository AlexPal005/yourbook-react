import {useState} from "react";
import axios from "./../../Axios.js";

export const AddAdmin = () => {
    const [userEmail, setUserEmail] = useState("")
    const handleChangeEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const submit = (e) => {
        e.preventDefault()
        axios.put(`/user/updateRole/${userEmail}`, {role: "ADMIN"})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="add-book">
            <form>
                <h3>Електронна пошта адміністратора</h3>
                <input type="text" onChange={handleChangeEmail} placeholder="Пошта"/>
                <button onClick={submit}>Додати</button>
            </form>
        </div>
    )
}