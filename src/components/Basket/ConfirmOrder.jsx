import "./ConfirmOrder.scss"
import {useContext, useEffect, useState} from "react";
import axios from "../../Axios.js";
import {AuthContext} from "../../context/authContext.jsx";

// eslint-disable-next-line react/prop-types
export const ConfirmOrder = ({resultOrder, clearBasket, setShowConfirm}) => {
    const [user, setUser] = useState({})
    const currUser = useContext(AuthContext)
    const [message, setMessage] = useState("")

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

    const confirmOrder = () => {
        console.log(resultOrder)
        setUser(prev => {
            return {prev}
        })
        axios.put(`/user/${currUser.currentUser?.userId}`,
        )
        axios.post('/order/create', resultOrder)
            .then((res) => {
                setMessage("Успішно створено замовлення!")
                setTimeout(clear, 5000)

            })
            .catch(err => {
                console.log(err)
                setMessage(err.data)
            })
    }
    return (
        <div className="confirm-order">
            {
                !currUser?.currentUser ?
                    <p className="error">Зареєструйтеся, щоб зробити замовлення!</p> :
                    <div>
                        <h3>Ім'я: {user.name}</h3>
                        <h3>Прізвище: {user.surname}</h3>
                        <h3>Email: {user.email}</h3>
                        {
                            user?.adress ?
                                <h3>Адреса: {user.adress}</h3> :
                                <div className="address-block">
                                    <h4>Уведіть адресу доставки</h4>
                                    <input type="text" placeholder="Адреса"/>
                                </div>
                        }
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