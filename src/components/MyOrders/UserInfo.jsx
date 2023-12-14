import {useContext, useEffect, useState} from "react";
import axios from "../../Axios.js";
import {AuthContext} from "../../context/authContext.jsx";
import "./MyOrders.scss"

export const UserInfo = () => {
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
        <div className="user-info">
            <table>
                <tbody>
                <tr>
                    <td><h3>Ім'я: </h3></td>
                    <td><h3>{user.name}</h3></td>
                </tr>
                <tr>
                    <td><h3>Прізвище: </h3></td>
                    <td><h3>{user.surname}</h3></td>
                </tr>
                <tr>
                    <td><h3>Email: </h3></td>
                    <td><h3>{user.email}</h3></td>
                </tr>
                <tr>
                    <td><h3>Телефон: </h3></td>
                    <td><h3>{user.number}</h3></td>
                </tr>
                {
                   user?.address &&
                    <tr>
                        <td><h3>Адреса: </h3></td>
                        <td><h3>{user.address}</h3></td>
                    </tr>
                }
                </tbody>
            </table>
        </div>
    )
}