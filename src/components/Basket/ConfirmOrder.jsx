import "./ConfirmOrder.scss"
import {useContext, useEffect, useRef, useState} from "react";
import axios from "../../Axios.js";
import {AuthContext} from "../../context/authContext.jsx";

// eslint-disable-next-line react/prop-types
export const ConfirmOrder = ({resultOrder, clearBasket, setShowConfirm}) => {
    const [user, setUser] = useState({})
    const currUser = useContext(AuthContext)
    const [message, setMessage] = useState("")
    const addressRef = useRef(null)
    const [err, setErr] = useState("")

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

    const clear = () => {
        clearBasket()
        setShowConfirm(false)
    }
    useEffect(() => {
        console.log(user)
    }, [user]);
    const confirmOrder = () => {
        if (!addressRef.current.value.length) {
            setErr("Адреса не може бути пустою!")
            return
        } else {
            setErr("")
        }
        axios.put(`/user/update/${currUser.currentUser?.userId}`, {...user, address: addressRef.current.value})
            .then(() => {
                axios.post('/order/create', resultOrder)
                    .then((res) => {
                        setMessage("Успішно створено замовлення!")
                        console.log(res)
                        setTimeout(clear, 5000)

                    })
                    .catch(err => {
                        console.log(err)
                        setMessage("Помилка! Спробуйте ще раз!")
                    })
            })
            .catch(err => {
                console.log(err)
                setMessage("Помилка! Спробуйте ще раз!")
            })

    }
    return (
        <div className="confirm-order">
            {
                !currUser?.currentUser ?
                    <p className="error">Зареєструйтеся, щоб зробити замовлення!</p> :
                    <div>
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
                            </tbody>
                        </table>

                        <div className="address-block">
                            <h4>Уведіть адресу доставки</h4>
                            <input type="text" placeholder="Адреса" ref={addressRef} defaultValue={user?.address}/>
                        </div>
                        {err && <p className="error">{err}</p>}
                        <div className="confirm-button-block">
                            <button onClick={confirmOrder}>Підтвердити</button>
                        </div>
                    </div>
            }
            {
                message &&
                <h1 className="green">
                    {message}
                </h1>
            }
        </div>
    )

}