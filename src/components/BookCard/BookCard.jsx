import './../../scss/variables.scss'
import './BookCard.scss'
import {FaShoppingBasket} from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import axios from "../../Axios.js";
import {MdDelete} from "react-icons/md";
/* eslint-disable react/prop-types */

export const BookCard = ({book, setUpdateBooks}) => {
    const [message, setMessage] = useState("")
    const [role, setRole] = useState("")
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

    useEffect(() => {
        setRole(user.role)
    }, [user]);
    const addBookToCard = () => {
        let currBasket = JSON.parse(localStorage.getItem("basket"));
        if (currBasket) {
            let count = 0
            currBasket.forEach(currBook => {
                if (currBook.id === book.id) {
                    count++
                }
            })
            if (count) {
                setMessage("Вже в корзині!")
                return
            }
            currBasket.push(book)
            localStorage.setItem("basket", JSON.stringify(currBasket))
        } else {
            localStorage.setItem("basket", JSON.stringify([book]))
        }
    }
    const handleDeleteBook = () => {
        axios.delete(`/book/${book.id}`)
            .then(res => {
                console.log(res)
                setUpdateBooks(prev => prev + 1)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className="book-card">
            <img className="book-image" alt={book.title} src={`data:image/jpeg;base64,${book.picture}`}/>
            <p>{book.title}</p>
            <h5>{book.price} грн</h5>
            {
                role === "ADMIN" && window.location.href === "http://localhost:5173/adminPage/books" ?
                    <MdDelete className="card-basket red-busket" onClick={handleDeleteBook}/> :
                    <FaShoppingBasket className="card-basket" onClick={addBookToCard}/>
            }
            <p className="error">{message}</p>
        </div>
    )
}